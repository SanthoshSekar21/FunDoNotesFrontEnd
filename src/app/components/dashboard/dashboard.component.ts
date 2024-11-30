import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ARCHIVE_ICON, LIST_VIEW_ICON, NOTE_ICON, REFRESH_ICON, SETTING_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isHalfOpen = true; // Start in the half-open state
  isExpanded = false; // Start in the half-open state, not fully expanded
  selectedItem: string = 'notes';
 
  constructor(
    public iconRegistry:MatIconRegistry,
    public sanitizer:DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('notes-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon',sanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    iconRegistry.addSvgIconLiteral('list-view-icon',sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
  }

  toggleDrawer() {
  this.isExpanded=!this.isExpanded;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  navigateToArchive() {
    this.selectedItem = 'archive';
    this.router.navigate(['dashboard/archive']);
  }

  navigateToTrash() {
    this.selectedItem = 'trash';
    this.router.navigate(['dashboard/trash']);
  }

  navigateToNotes() {
    this.selectedItem = 'notes';
    this.router.navigate(['dashboard/notes']);
  }
}
