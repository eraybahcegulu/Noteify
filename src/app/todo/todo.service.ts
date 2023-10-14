import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: AngularFireList<Todo>;

  constructor(private db: AngularFireDatabase) {
    this.todoList = db.list('/todos');
  }

  getTodos(): Observable<Todo[]> {
    return this.todoList.snapshotChanges().pipe(
      map(changes => changes.map(c => this.mapTodoFromSnapshot(c)))
    );
  }
  
  private mapTodoFromSnapshot(change: SnapshotAction<Todo>): Todo {
    const data = change.payload.val() as Todo;
    return {
      id: change.payload.key as string,
      title: data.title,
      completed: data.completed,
      createdAt: data.createdAt,
    };
  }

  async addTodo(todo: Todo): Promise<any> {
  const ref = await this.todoList.push(todo);
  
  return ref;
}

  updateTodo(id: string, todo: Todo): Promise<void> {
    return this.todoList.update(id, todo);
  }

  deleteTodo(id: string): Promise<void> {
    return this.todoList.remove(id);
  }
}