import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit {
  @Input() noteDetails: { _id: string; title: string; description: string } = {
    _id: '',
    title: '',
    description: ''
  };
  archiveList: any[] = []; 
  
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);

    console.log('Authorization header:', headers);

    this.httpService.getAllNotesApiCall('/api/v1/notes', { headers }).subscribe({
      next: (res: any) => {
        this.archiveList = res.data.filter((note: any) => note.isArchive === true && note.isTrash===false);
      },
      error: (err) => {
        console.error('Error fetching archived notes:', err);
      }
    });
  }
  handleArchiveList(event:any){
    const {data,action}=event;
    if (action === 'archive' && data) {
      this.archiveList = this.archiveList.filter(note => note._id !== data._id);
  }
  else if(action==='trash'&& data){
    this.archiveList=this.archiveList.filter(note => note._id!==data._id);
  }
  else if(action==='color-change'&& data){
    this.archiveList=this.archiveList.map((note) => {
      if (note._id ===data.noteId) {
        return { ...note, color: data.color };
      }
      return note; 
    });
  }
}
}
