import { Component, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent  {
  @Output() updateList = new EventEmitter<{ data: { title: string; description: string; _id: string }; action: string; color: string }>();
  @Output() iconOperation = new EventEmitter<{ data: { _id: string }; action: string }>();

  selectedColor: string = '';
  subscription!:Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public noteDetails: { _id: string; title: string; description: string; color: any },
    private dialogRef: MatDialogRef<UpdateNoteComponent>,
    public httpService: HttpService
  ) {}

  onClose() {
    this.dialogRef.close({ updated: true, note: this.noteDetails });
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);
    this.httpService
      .updateNoteApiCall(
        `/api/v1/notes/${this.noteDetails._id}`,
        { title: this.noteDetails.title, description: this.noteDetails.description },
        { headers }
      )
      .subscribe({
        next: (res: any) => {
          console.log('Note updated:', res);
          this.updateList.emit({
            data: res.data,
            action: 'update',
            color: this.noteDetails.color ? this.noteDetails.color.code : '#ffffff',
          });
        },
        error: (err: any) => {
          console.error('Error updating note:', err);
        },
      });
  }

  handleIconOperation(event: any) {
    const { data, action } = event;

    switch (action) {
      case 'color-change':
        this.selectedColor = data.color;
        this.noteDetails.color = data.color;
        break;

      case 'archive':
      case 'trash':
        this.iconOperation.emit({ data:data, action });
        this.dialogRef.close();
        break;

      default:
        console.warn(`Unhandled action: ${action}`);
    }
  }
  
}
