import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {
  labels: { name: string, isEditing: boolean }[] = [];
  newLabel: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: {
      labels: string[], 
      onLabelCreated: Function, 
      onLabelUpdated: Function
    }
  ) {
    this.labels = data.labels.map(label => ({ name: label, isEditing: false }));
  }
  toggleEdit(index: number) {
    this.labels[index].isEditing = !this.labels[index].isEditing;
    this.updateParent();
        }
  updateParent() {
    this.data.onLabelUpdated(this.labels.map(label => label.name));
  }
  createLabel() {
    const trimmedLabel = this.newLabel.trim();
    if (trimmedLabel && !this.labels.some(label => label.name === trimmedLabel)) {
      const newLabel = { name: trimmedLabel, isEditing: false };
      this.labels.push(newLabel);
      this.data.onLabelCreated(newLabel); 
      this.newLabel = ''; 
    }
  }
  
  renameLabel(index: number) {
    const trimmedName = this.labels[index].name.trim();
    if (trimmedName !== '') {
      this.labels[index].name = trimmedName;
      this.labels[index].isEditing = false;
      this.data.onLabelUpdated(this.labels); 
      this.updateParent();
    }
  }
  
  deleteLabel(index: number) {
    this.labels.splice(index, 1);
    this.data.onLabelUpdated(this.labels); 
    this.updateParent();
  }
  

  cancelCreation() {
    this.dialogRef.close(this.labels.map(label => label.name)); 
  }
}
