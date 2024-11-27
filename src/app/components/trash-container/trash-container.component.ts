import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent {
  @Input() noteDetails: { _id: string; title: string; description: string } = {
    _id: '',
    title: '',
    description: ''
  };
  trashList: any[] = []; 
  
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);

    console.log('Authorization header:', headers);

    this.httpService.getAllNotesApiCall('/api/v1/notes', { headers }).subscribe({
      next: (res: any) => {
        // Filter archived notes
        this.trashList = res.data.filter((note: any) => note.isTrash === true);
      },
      error: (err) => {
        console.error('Error fetching archived notes:', err);
      }
    });
  }
  handleTrashList(event:any){
    const {data,action}=event;
    if (action === 'archive' && data) {
      this.trashList = this.trashList.filter(note => note._id !== data._id);
  }
}
}