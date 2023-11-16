import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { NoteComponent } from './components/note/note.component';
import { ShoppingComponent } from './components/shopping/shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Todo', component: TodoComponent },
  { path: 'Note', component: NoteComponent },
  { path: 'Shopping', component: ShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
