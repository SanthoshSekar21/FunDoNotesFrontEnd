import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public noteDetails: { title: string; description: string },
    private dialogRef: MatDialogRef<UpdateNoteComponent>
  ) {}

  onSave() {
    this.dialogRef.close({ updated: true, note: this.noteDetails });
  }

  
  onClose() {
    this.dialogRef.close({ updated: false });
  }
}
