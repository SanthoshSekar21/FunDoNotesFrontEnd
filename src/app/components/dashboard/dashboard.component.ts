import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/service/dataservices/data.service';
import { ARCHIVE_ICON, EDIT_ICON, LIST_VIEW_ICON, NOTE_ICON, REFRESH_ICON, REMINDER_ICON, SETTING_ICON, TRASH_ICON } from 'src/assets/svg-icons';
import { EditLabelComponent } from '../edit-label/edit-label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  labels: string[] = [];
  isExpanded = false; 
  selectedItem: string = 'notes';
  isDrawerOpen = false;
  constructor(
    public iconRegistry:MatIconRegistry,
    public sanitizer:DomSanitizer,
    private router: Router,
    private data: DataService,private dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral('remainder-icon',sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('notes-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon',sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon',sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon',sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
  }
   
  ngOnInit(): void {
    const initialRoute = this.router.url.split('/').pop(); 
    this.selectedItem = initialRoute || 'notes';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = this.router.url.split('/').pop(); 
        this.selectedItem = route || 'notes';
      }
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  hoverDrawer(isHover: boolean): void {
    this.isDrawerOpen = isHover;
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  navigateTo(route:string){
    this.router.navigate(['/dashboard', route])
  }

  search(event: any) {
    console.log(event.target.value)
    this.data.outgoingData(event.target.value);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  openEditLabelDialog() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '400px',
      data: { labels: this.labels }
    });
}

}


