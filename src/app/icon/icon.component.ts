import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() noteDetails!: { _id: string; title: string; description: string };
  @Output() iconOperation: EventEmitter<any> = new EventEmitter();

  constructor(private httpService: HttpService) {}

  // Archive note operation
  archiveNoteOperation() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.archiveNoteApiCall(`/api/v1/notes/${this.noteDetails._id}/archive`, { headers: header }).subscribe({
      next: (res: any) => {
        console.log('Note archived successfully');
        this.iconOperation.emit({ action: 'archive', data: this.noteDetails });
      },
      error: (err: any) => {
        console.error('Error archiving note:', err);
      }
    });
  }

  trashNoteOperation() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpService.archiveNoteApiCall(`/api/v1/notes/${this.noteDetails._id}/trash`, { headers: header }).subscribe({
      next: (res: any) => {
        console.log('Note trashed successfully');
        this.iconOperation.emit({ action: 'trash', data: this.noteDetails });

      },
      error: (err: any) => {
        console.error('Error trashing note:', err);
      }
    });
  }
}
