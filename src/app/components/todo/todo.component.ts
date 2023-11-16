import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  @Input() todoColor: string = 'dodgerblue';
  todos: Todo[] = [];
  newTodoTitle: string = '';
  editingTodoId: string | null | undefined = null;
  addTodoError = false;
  editTodoError: { [key: string]: boolean } = {};
  constructor(private todoService: TodoService) {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);

    this.todoService.updateTodosOrder(this.todos).then(() => {
      console.log('Order updated successfully in Firebase');
    }).catch(error => {
      console.error('Error updating order in Firebase', error);
    });
  }

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
      focused: false,
      createdAt: `${formattedDate} ${formattedTime}`,
    };

    this.todoService.updateTodosOrder(this.todos).then(() => {
      this.todoService.addTodo(newTodo).then(() => {
      });
    })
  }

  focusTodoStatus(todo: Todo): void {
    todo.focused = !todo.focused;
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).then(() => {
        
      });
    }
  }

  updateTodoStatus(todo: Todo): void {
    todo.completed = !todo.completed;
    if (todo.id) {
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