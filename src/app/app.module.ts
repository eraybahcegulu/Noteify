import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteComponent } from './components/note/note.component';
import { NzModule } from './nz.module';
@NgModule({
  declarations: [AppComponent, TodoComponent, HomeComponent, ShoppingComponent, NoteComponent],
  imports: [
    NgbModule,
    RouterModule,
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, NgbModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
