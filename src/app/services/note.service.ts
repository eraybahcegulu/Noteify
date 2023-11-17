import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteList: AngularFireList<Note>;

  constructor(private db: AngularFireDatabase) {
    this.noteList = db.list('Note/notes');
  }

  getNotes(): Observable<Note[]> {
    return this.noteList.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(c => this.mapTodoFromSnapshot(c));
      })
    );
  }
  
  private mapTodoFromSnapshot(change: SnapshotAction<Note>): Note {
    const data = change.payload.val() as Note;
    return {
      id: change.payload.key as string,
      note: data.note,
      createdAt: data.createdAt,
    };
  }


  async addNote(note: Note): Promise<any> {
    const ref = await this.noteList.push(note);
    return ref;
  }

  async deleteNote(id: string): Promise<void> {

      await this.noteList.remove(id);
 
  }

}