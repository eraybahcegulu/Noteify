import { Component, Input, OnInit } from '@angular/core';
import { NestedData, Title } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() noteColor: string = 'dodgerblue';
  newTitle: string = '';
  newNote: string = '';
  titleSelect: string = '';

  titleSelectErrorEmpty = false;
  newNoteErrorEmpty = false;
  newNoteSaved = false;

  newTitleErrorEmpty = false;
  newTitleErrorExists = false;
  titles: Title[] = [];
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getTitles().subscribe((titles) => {
      this.titles = titles;
    });
  }

  deleteTitle(id: string | undefined): void {
    this.newTitle = '';
    this.titleSelect = '';
    if (id !== undefined) {
      this.noteService.deleteTitle(id).then(() => {
        this.loadNotes();
      });
    }
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  addTitle(title: string): void {
    if (this.newTitle.trim().length === 0) {
      this.newTitleErrorEmpty = true;

      setTimeout(() => {
        this.newTitleErrorEmpty = false;
      }, 3000);

      return;
    }

    const titleExists = this.titles.some(title => title.title.trim() === this.newTitle.trim());
    if (titleExists) {
      this.newTitleErrorExists = true;
      this.newTitle = '';
      setTimeout(() => {
        this.newTitleErrorExists = false;
      }, 3000);
      return;
    }

    this.newTitleErrorEmpty = false;
    this.newTitleErrorExists = false;
    this.newTitle = '';

    const newTitle: Title = {
      title,
    };
    this.noteService.addTitle(newTitle)
  }

  addNote(newNote: string, title: string): void {
    if (this.titleSelect.trim().length === 0) {
      this.titleSelectErrorEmpty = true;

      setTimeout(() => {
        this.titleSelectErrorEmpty = false;
      }, 3000);
      return;
    }

    if (this.newNote.trim().length === 0) {
      this.newNoteErrorEmpty = true;

      setTimeout(() => {
        this.newNoteErrorEmpty = false;
      }, 3000);
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${this.formatNumber(currentDate.getDate())}.${this.formatNumber(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}`;
    const formattedTime = `${this.formatNumber(currentDate.getHours())}:${this.formatNumber(currentDate.getMinutes())}:${this.formatNumber(currentDate.getSeconds())}`;

    const newNoteObject: NestedData = {
      note: newNote,
      createdAt: `${formattedDate} ${formattedTime}`,
    };

    const filteredItem = this.titles.find(item => item.title === title);

    if (filteredItem) {
      console.log(filteredItem.id);

      const titleSelect: Title = {
        title,
        id: filteredItem.id
      };
      this.noteService.addNoteToTitle(newNoteObject, titleSelect).then(() => {
        this.newNote = '';
        this.newNoteSaved = true
        setTimeout(() => {
          this.newNoteSaved = false
        }, 3000);
      });
    }
  }

  isNoteObject(value: any): value is { note: string } {
    return typeof value === 'object' && value !== null && 'note' in value;
  } //***********value bir nesne olmalı, note özelliği içerdiğinin kontrolü ve true döndürülmesi***********

  isCreatedAtObject(value: any): value is { createdAt: string } {
    return typeof value === 'object' && value !== null && 'createdAt' in value;
  } //***********value bir nesne olmalı, createdAt özelliği içerdiğinin kontrolü ve true döndürülmesi***********

}
