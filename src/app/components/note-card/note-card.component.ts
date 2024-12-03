import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  private dialogRef: MatDialogRef<UpdateNoteComponent> | null = null;

  @Input() noteDetails: { _id: string; title: string; description: string; color: any; isTrash: boolean; isArchive: boolean } = {
    _id: '',
    title: '',
    description: '',
    color: '',
    isArchive: false,
    isTrash: false,
  };

  @Output() updateList = new EventEmitter<{ data: { _id: string; title: string; description: string }; action: string }>();

  constructor(private dialog: MatDialog) {}

  handleNoteIconsClick($event: any): void {
    const { action, data } = $event;
    this.updateList.emit({ data, action });
  }

  openUpdateDialog(note: { _id: string; title: string; description: string; color: string }): void {
    this.dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '640px',
      data: note,
    });

    // Listen for events from UpdateNoteComponent
    this.dialogRef.componentInstance.iconOperation.subscribe((iconEvent: any) => {
      this.updateList.emit(iconEvent);
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateList.emit({ data: result.note, action: 'update' });
      }
    });
  }
}
