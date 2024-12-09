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
      expect(value).toBe(''); // The default value of BehaviorSubject
      done();
    });
  });

  it('should update incomingData when outgoingData is called', (done: DoneFn) => {
    const testMessage = 'Test Message';
    service.outgoingData(testMessage); // Updating the BehaviorSubject value

    service.incomingData.subscribe((value) => {
      expect(value).toBe(testMessage); // Expect updated value
      done();
    });
  });
});
