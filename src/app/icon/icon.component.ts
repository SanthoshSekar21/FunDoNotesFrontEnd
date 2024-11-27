import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() noteDetails!: { _id: string; title: string; description: string };
  @Output() iconOperation: EventEmitter<any> = new EventEmitter();

  constructor(private httpService: HttpService,    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,) {
     iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
  
  }

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
