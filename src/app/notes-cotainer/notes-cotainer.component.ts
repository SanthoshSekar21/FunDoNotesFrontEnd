import { Component } from '@angular/core';

@Component({
  selector: 'app-notes-cotainer',
  templateUrl: './notes-cotainer.component.html',
  styleUrls: ['./notes-cotainer.component.scss']
})
export class NotesCotainerComponent {
 notesList:any[]=[];
 ngOnInit() {
  this.notesList=["hello","world","hi","hee","ka","jfgh","hsg","jfhk"]
 }
}
