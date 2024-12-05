import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {
  labels: string[] = [];
  newLabel: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { labels: string[] }
  ) {
    this.labels = data.labels;
  }

  createLabel() {
    const trimmedLabel = this.newLabel.trim();
    if (trimmedLabel && !this.labels.includes(trimmedLabel)) {
      this.labels.push(trimmedLabel);
    }
    this.newLabel = '';
  }

  renameLabel(index: number) {
    const newLabel = this.labels[index];

    if (newLabel && !this.labels.includes(newLabel)) {
      this.labels[index] = newLabel;
    }
  }

  deleteLabel(index: number) {
    this.labels.splice(index, 1);
  }
  cancelCreation(){
    this.dialogRef.close();
  }
}
