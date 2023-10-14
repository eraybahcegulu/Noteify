import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  editingTodoId: string | null | undefined = null;
  addTodoError = false;
  editTodoError: { [key: string]: boolean } = {};
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  startEditing(todo: Todo): void {
    this.editingTodoId = todo.id;
  }

  finishEditing(todo: Todo): void {
    if (todo.id && todo.title.trim().length > 0) {
      this.todoService.updateTodo(todo.id, todo).then(() => {
        this.editingTodoId = null;
      });
    } else {
      this.editTodoError[todo.id!] = true;
      setTimeout(() => {
        this.editTodoError[todo.id!] = false;
      }, 3000);
    }
  }


  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  
  addTodo(title: string): void {

    if (this.newTodoTitle.trim().length === 0) {
      this.addTodoError = true;

      setTimeout(() => {
        this.addTodoError = false;
      }, 3000);

      return;
    }

    this.addTodoError = false;
    this.newTodoTitle = '';
    const currentDate = new Date();
    const formattedDate = `${this.formatNumber(currentDate.getDate())}-${this.formatNumber(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`;
    const formattedTime = `${this.formatNumber(currentDate.getHours())}:${this.formatNumber(currentDate.getMinutes())}:${this.formatNumber(currentDate.getSeconds())}`;

    const newTodo: Todo = {
      title,
      completed: false,
      createdAt: `${formattedDate} ${formattedTime}`,
    };

    this.todoService.addTodo(newTodo).then(() => {

    });
  }

  updateTodoStatus(todo: Todo): void {
    if (todo.id) {
      todo.completed = !todo.completed;
      this.todoService.updateTodo(todo.id, todo).then(() => {

      });
    }
  }

  deleteTodo(id: string | undefined): void {
    if (id !== undefined) {
      this.todoService.deleteTodo(id).then(() => {

      });
    }
  }
}