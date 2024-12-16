import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial value for incomingData as an empty string', (done: DoneFn) => {
    service.incomingData.subscribe((value) => {
      expect(value).toBe(''); 
      done();
    });
  });

  it('should update incomingData when outgoingData is called', (done: DoneFn) => {
    const testMessage = 'Test Message';
    service.outgoingData(testMessage); 

    service.incomingData.subscribe((value) => {
      expect(value).toBe(testMessage); 
      done();
    });
  });
});
