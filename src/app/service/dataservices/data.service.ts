import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() { }
  private messageSource = new BehaviorSubject<string>(''); 
  incomingData = this.messageSource.asObservable();

  outgoingData(message: string) {
    this.messageSource.next(message); 
  }
}
