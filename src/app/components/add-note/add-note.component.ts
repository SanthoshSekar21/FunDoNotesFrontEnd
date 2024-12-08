import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../service/http-service/http.service';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BRUSH_ICON, IMG_ICON, REDO_ICON, TICK_ICON, UNDO_ICON } from 'src/assets/svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  @Input() noteDetails!: { _id?: string; title?: string; description?: string; color?: { code: string, name: string }, isTrash?: boolean, isArchive?: boolean };
  @Output() updateList = new EventEmitter<{ data: { title: string; description: string }; action: string }>();
  isExpanded = false;
  title = '';
  description = '';
  selectedColor: any;
  subscription: Subscription | null = null;
   
  constructor(
     private httpService: HttpService, public iconRegistry:MatIconRegistry,
    private sanitizer:DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral('bursh-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('tick-icon',sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('img-icon',sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon',sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon',sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
  }

  addNoteToggle(action: string) {
    if (action === 'toggle') {
      this.isExpanded = !this.isExpanded;
    } else if (action === 'save') {
      if (this.title || this.description) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);
        this.httpService.createNoteApiCall('/api/v1/notes', { title: this.title, description: this.description,color:this.selectedColor }, { headers }).subscribe({
          next: (res:any) => {
            console.log(res);
            this.updateList.emit({
              data: res.data,  
              action: 'add'
            });
          },
          error: (err:any) => {
            console.error('Error creating note:', err);
          }
        });
      }
    }
    this.title = '';
    this.description = '';
    this.isExpanded = action !== 'save';  
    this.selectedColor='#ffffff';
  }
  handleIconOperation(event: any): void {
    const { action, data } = event;  
    this.updateList.emit({ data, action }); 
    this.selectedColor = data.color;
  }
  ngOnDestroy() {
 
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null; 
    }
  }
}
