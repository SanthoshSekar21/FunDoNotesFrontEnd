import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ARCHIVE_ICON, NOTE_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isHalfOpen = true; // Start in the half-open state
  isExpanded = false; // Start in the half-open state, not fully expanded

 
  constructor(
    public iconRegistry:MatIconRegistry,
    public sanitizer:DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('notes-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
  }

  toggleDrawer() {
    if (this.isHalfOpen) {
      // If half-open, expand it fully
      this.isHalfOpen = false;
      this.isExpanded = true;
    } else if (this.isExpanded) {
      // If fully expanded, close it halfway
      this.isExpanded = false;
      this.isHalfOpen = true;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  navigateToArchive() {
    this.router.navigate(['dashboard/archive']);
  }

  navigateToTrash() {
    this.router.navigate(['dashboard/trash']);
  }

  navigateToNotes() {
    this.router.navigate(['dashboard/notes']);
  }
}
