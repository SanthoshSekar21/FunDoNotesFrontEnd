import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notes-cotainer',
  templateUrl: './notes-cotainer.component.html',
  styleUrls: ['./notes-cotainer.component.scss']
})
export class NotesCotainerComponent {
  @Input() noteDetails: { _id: string; title: string; description: string } = {
    _id: '',
    title: '',
    description: '',
  };


  public notesList: { _id: string; title: string; description: string }[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.notesList = [];
    this.fetchNotes();
  }

  fetchNotes() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.getAllNotesApiCall('/api/v1/notes/', { headers: header }).subscribe({
      next: (res: any) => {
        this.notesList = res.data.filter((note: any) => note.isArchive === false && note.isTrash===false);
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
    } else if (action === 'archive' && data) {
      this.notesList = this.notesList.filter(note => note._id !== data._id);
    }
     else if(action==='trash'&& data){
      this.notesList=this.notesList.filter(note=>note._id!==data._id);
     }
  }
}
