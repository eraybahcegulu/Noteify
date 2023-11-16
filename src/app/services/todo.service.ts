import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: AngularFireList<Todo>;

  constructor(private db: AngularFireDatabase) {
    this.todoList = db.list('Todo/todos');
  }

  getTodos(): Observable<Todo[]> {
    return combineLatest([
      this.todoList.snapshotChanges(),
      this.db.object('Todo/todosOrder').valueChanges(),
    ]).pipe(
      map(([changes, order]) => {
        const todos = changes.map(c => this.mapTodoFromSnapshot(c));

        const typedOrder = order as { [key: string]: number };

        todos.sort((a, b) => {
          const aId = a.id !== undefined ? a.id : '';
          const bId = b.id !== undefined ? b.id : '';


          return (typedOrder[aId] || 0) - (typedOrder[bId] || 0);
        });

        return todos;
      })
    );
  }

  private mapTodoFromSnapshot(change: SnapshotAction<Todo>): Todo {
    const data = change.payload.val() as Todo;
    return {
      id: change.payload.key as string,
      title: data.title,
      completed: data.completed,
      focused: data.focused,
      createdAt: data.createdAt,

    };
  }

  updateTodosOrder(todos: Todo[]): Promise<void> {
    if (todos.length === 0) {
      return Promise.resolve();
    }
    const newOrder: { [key: string]: number } = {};
    todos.forEach((todo, index) => {
      if (todo.id !== undefined) {

        newOrder[todo.id] = index + 1;
      }
    });

    const orderRef = this.db.object('Todo/todosOrder');
    return orderRef.update(newOrder);
  }

  async addTodo(todo: Todo): Promise<any> {
    const ref = await this.todoList.push(todo);

    return ref;
  }

  updateTodo(id: string, todo: Todo): Promise<void> {
    return this.todoList.update(id, todo);
  }

  async deleteTodo(id: string): Promise<void> {
    const todoRef = this.todoList.remove(id);
    const orderRef = this.db.object('Todo/todosOrder/' + id);
    orderRef.remove();

    try {
      await Promise.all([orderRef, todoRef]);
      return console.log('Todo and order removed successfully');
    } catch (error) {
      return console.error('Error removing todo and order', error);
    }
  }
}