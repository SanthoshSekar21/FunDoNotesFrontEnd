import { Component, Sanitizer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
drawerState:boolean=false
constructor( private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer, private router:Router){
  iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
  iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
}
handleDrawerClick(){
  this.drawerState=!this.drawerState;
}
handleOutsideClick(){
  this.drawerState=false;
}
stopPropagation(event: Event) {
  event.stopPropagation();
}
navigateToArchive(){
  this.router.navigate(['dashboard/archive']);
}
navigateToTrash(){
  this.router.navigate(['dashboard/trash'])
}
}
