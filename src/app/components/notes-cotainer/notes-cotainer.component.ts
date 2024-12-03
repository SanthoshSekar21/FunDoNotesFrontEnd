import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/service/dataservices/data.service';

@Component({
  selector: 'app-notes-cotainer',
  templateUrl: './notes-cotainer.component.html',
  styleUrls: ['./notes-cotainer.component.scss']
})
export class NotesCotainerComponent {
  @Input() noteDetails: { _id: string; title: string; description: string;color:string;isTrash:boolean;isArchive:boolean } = {
    _id: '',
    title: '',
    description: '',
    color:'',
    isArchive:false,
    isTrash:false
  };


  public notesList: { _id: string; title: string; description: string;color:string; isTrash:boolean; isArchive:boolean}[] = [];
  selectedColor!: string;
  filterNote: any;

  constructor(private httpService: HttpService, private data: DataService) {}

  ngOnInit() {
    this.notesList = [];
    this.fetchNotes();
    this.data.incomingData.subscribe((response) => {
      console.log("Search in process", response);
      this.filterNote = response;
    })
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
        this.fetchNotes();
      }
    } else if (action === 'archive' && data) {
      this.notesList = this.notesList.filter(note => note._id !== data._id);
    }
     else if(action==='trash'&& data){
      
      this.notesList=this.notesList.filter(note=>note._id!==data);
     }
     else if(action==='color-change'&& data){

      if (action === 'color-change') {
        this.selectedColor = data.color;
        this.noteDetails.color = data.color; 
        this.notesList = this.notesList.map((note) => {
          if (note._id ===data.noteId) {
           
            return { ...note, color: data.color };
          }
          return note; 
        });
      }
      else if (action === 'update' && data) {
        console.log('---------')
        this.notesList = this.notesList.map(note =>
          note._id === data._id ? { ...note, ...data } : note
        );
      }
     }
  }
}
