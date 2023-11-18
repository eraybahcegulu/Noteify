import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotesData, Title } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private titleList: AngularFireList<Title>;

  constructor(private db: AngularFireDatabase) {
    this.titleList = db.list('Note/titles');
  }

  getTitles(): Observable<Title[]> {
    return this.titleList.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(c => this.mapNoteTitleFromSnapshot(c));
      })
    );
  }

  private mapNoteTitleFromSnapshot(change: SnapshotAction<Title>): Title {
    const data = change.payload.val() as Title;
    return {
      id: change.payload.key as string,
      title: data.title,
      notes: data.notes || []
    };
  }

  async addTitle(title: Title): Promise<any> {
    const titleNode: Title = {
      title: title.title,
    };

    const titleListPath = `Note/titles/`;
    this.titleList = this.db.list(titleListPath);
    const ref = await this.titleList.push(titleNode);
    return ref;
  }

  async deleteTitle(id: string): Promise<void> {
    await this.titleList.remove(id);
  }

  async addNoteToTitle(newNoteObject: NotesData, title: Title): Promise<any> {
    if (!title.notes) {
      title.notes = [];
    }

    const newNote: NotesData = {
      note: newNoteObject.note,
      createdAt: newNoteObject.createdAt,
    };

    const noteListPath = `Note/titles/${title.id}/notes`;
    const noteListRef = this.db.list(noteListPath);

    const ref = await noteListRef.push(newNote);
    return { id: ref.key as string, ...newNote };
  }


  async deleteNote(titleId: string, noteId: string): Promise<void> {

    const notePath = `Note/titles/${titleId}/notes`;
    const noteListRef = this.db.list(notePath);
    await noteListRef.remove(noteId);
  }
}