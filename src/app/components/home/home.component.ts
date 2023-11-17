import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Note } from 'src/app/models/note.model';
import { NoteService } from '../../services/note.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @Input() homeTodoColor: string = '';
  @Input() homeNoteColor: string = '';
  @Input() homeShoppingColor: string = '';
  todos: Todo[] = [];
  notes: Note[] = [];
  focusedTodosLength: number = 0;
  inProgressTodosLength: number = 0;
  constructor(private router: Router, private todoService: TodoService, private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadNotes();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.focusedTodosLength = todos.filter(todo => todo.focused).length;
      this.inProgressTodosLength = todos.filter(todo => !todo.focused && !todo.completed).length;
    });
  }

  private loadNotes(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;

    });
  }

  Todo() {
    this.router.navigate(['/Todo']);
  }

  Note() {
    this.router.navigate(['/Note']);
  }

  Shopping() {
    this.router.navigate(['/Shopping']);
  }
}
