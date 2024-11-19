import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
drawerState:boolean=false
handleDrawerClick(){
  this.drawerState=!this.drawerState;
}
}
