import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesCotainerComponent } from './components/notes-cotainer/notes-cotainer.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { IconComponent } from './components/icon/icon.component';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NotesCotainerComponent,
    AddNoteComponent,
    NoteCardComponent,
    TrashContainerComponent,
    ArchiveContainerComponent,
    UpdateNoteComponent,
    IconComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,  
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDialogModule,
    MatMenuModule,
   MatTooltipModule,
   MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
