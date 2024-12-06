import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterNote: string): any[] {
    if (!filterNote) {
      return value; 
    }
    const lowerCaseFilter = filterNote.toLowerCase(); 
    return value.filter(note => 
      note.title.toLowerCase().includes(lowerCaseFilter)||note.description.toLowerCase().includes(lowerCaseFilter)
    );
  }
}
