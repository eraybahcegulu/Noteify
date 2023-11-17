import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() noteColor: string = 'dodgerblue';
  newNote: string = '';
  newNoteError = false;
  notes: Note[] = [];
  constructor(private noteService: NoteService) { }
  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }


  ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  addNote(note: string): void {
    if (this.newNote.trim().length === 0) {
      this.newNoteError = true;

      setTimeout(() => {
        this.newNoteError = false;
      }, 3000);

      return;
    }

    this.newNoteError = false;
    this.newNote = '';
    const currentDate = new Date();
    const formattedDate = `${this.formatNumber(currentDate.getDate())}.${this.formatNumber(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}`;
    const formattedTime = `${this.formatNumber(currentDate.getHours())}:${this.formatNumber(currentDate.getMinutes())}:${this.formatNumber(currentDate.getSeconds())}`;

    const newNote: Note = {
      note,
      createdAt: `${formattedDate} ${formattedTime}`,
    };
    this.noteService.addNote(newNote)
  }

  deleteNote(id: string | undefined): void {
    if (id !== undefined) {
      this.noteService.deleteNote(id).then(() => {
        this.loadNotes();
      });
    }
  }

}
