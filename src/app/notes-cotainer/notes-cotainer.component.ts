import { Component, Input } from '@angular/core';
import { HttpService } from '../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notes-cotainer',
  templateUrl: './notes-cotainer.component.html',
  styleUrls: ['./notes-cotainer.component.scss']
})
export class NotesCotainerComponent {

  public notesList:any[]=[];

 constructor(private httpService:HttpService){}

  ngOnInit() {
    this.notesList = []; 
    this.fetchNotes();
  }
 
 fetchNotes() {
  const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  this.httpService.getAllNotesApiCall('/api/v1/notes/', { headers: header }).subscribe({
    next: (res: any) => {
      this.notesList=res.data;
    },
    error: (err: any) => {
      console.error('Error fetching notes:', err); 
    }
  });
  
}
handleUpdateList($event: any) {
  const { data, action } = $event;
  if (action === 'add' && data) {
   
    if (data.title && data.description) {
      this.notesList.push(data); 
    }
  }
  else if (action === 'archive') {
    
    this.notesList = this.notesList.filter(
      element => element._id !== data._id 
    );
  }
}

}