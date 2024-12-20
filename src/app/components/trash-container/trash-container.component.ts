import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/dataservices/data.service';
import { HttpService } from 'src/app/service/http-service/http.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent {
  subscription: Subscription | null = null; 
  @Input() noteDetails: { _id: string; title: string; description: string } = {
    _id: '',
    title: '',
    description: ''
  };
  trashList: any[] = []; 
  filterNote:any
  isLoading = true;  
  
  constructor(private httpService: HttpService,private data:DataService) {}

  ngOnInit() {
    this.fetchTrashList();
    this.data.incomingData.subscribe((response:string)=>{
      this.filterNote=response.toLowerCase();
    })

  }
  fetchTrashList() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`); 
    this.httpService.getAllNotesApiCall('/api/v1/notes/',{headers}).subscribe({
      next: (res: any) => {
        this.trashList = res.data.filter((note: any) => note.isTrash === true);
        this.isLoading=false;
      },
      error: (err) => {
        console.error('Error fetching trash notes:', err);
      }
    });
  }
  handleTrashList(event:any){
    const {data,action}=event;
    if (action === 'archive' && data) {
      this.trashList = this.trashList.filter(note => note._id !== data._id);
  }
   else if(action==='trash' && data){
    this.trashList=this.trashList.filter(note=>note._id!==data)
   }
   else if(action==='delete'&& data){
    this.trashList=this.trashList.filter(note=>note._id!==data._id );
   }
}
ngOnDestroy() {
 
  if (this.subscription) {
    this.subscription.unsubscribe();
    this.subscription = null; 
  }
}
}
