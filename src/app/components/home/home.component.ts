import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo.model';

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
  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
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
