import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesCotainerComponent } from './components/notes-cotainer/notes-cotainer.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'register',
    component:RegisterComponent
  },
  {
    path:"dashboard", component:DashboardComponent,
    children:[
      {path:"notes",component:NotesCotainerComponent},
      {path:"archive",component:ArchiveContainerComponent},
      {path:"trash", component:TrashContainerComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
