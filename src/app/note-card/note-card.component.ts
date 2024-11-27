import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, DELETE_FOREVER_ICON, IMG_ICON, MORE_ICON, OTHER_MENU_ICON, REMINDER_ICON, RESTORE_ICON, TRASH_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';



@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  private dialogRef: MatDialogRef<UpdateNoteComponent> | null = null; 
  @Input() noteDetails: { _id: string; title: string; description: string } = {
    _id: '',
    title: '',
    description: ''
  };
  
  @Output() updateList = new EventEmitter<{ data: { _id: string; title: string; description: string }; action: string }>();


 constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private dialog: MatDialog) {
  // iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
  // iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
  // iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
  // iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
  // iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
  // iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
  // iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
  // iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
  // iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
  // iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
}
handleNoteIconsClick(action: string, event: MouseEvent): void {
  event.stopPropagation();
    this.updateList.emit({ data: this.noteDetails, action });
  
}


openUpdateDialog(note: { _id: string; title: string; description: string }) {
  this.dialog.open(UpdateNoteComponent, {
    width: '640px',
    data: note, 
    
  });

}
closeUpdateDialog() {
  if (this.dialogRef) {
    this.dialogRef.close(); 
  }
}

}