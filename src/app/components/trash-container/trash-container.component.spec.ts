import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/service/http-service/http.service';
import { DataService } from 'src/app/service/dataservices/data.service';
import { TrashContainerComponent } from './trash-container.component';
import { of, Subject, Subscription } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

describe('TrashContainerComponent', () => {
  let component: TrashContainerComponent;
  let fixture: ComponentFixture<TrashContainerComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    
    httpServiceMock = jasmine.createSpyObj('HttpService', ['getAllNotesApiCall']);
    dataServiceMock = jasmine.createSpyObj('DataService', ['incomingData']);
    const incomingDataSubject = new Subject<any>();
    dataServiceMock.incomingData = incomingDataSubject.asObservable();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule], 
      declarations: [TrashContainerComponent,FilterPipe],
      providers: [
        { provide: HttpService, useValue: httpServiceMock },
        { provide: DataService, useValue: dataServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    });

    fixture = TestBed.createComponent(TrashContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trash list on init', () => {
    const mockTrashNotes = [
      { _id: '1', title: 'Test Note 1', description: 'Test Description 1', isTrash: true },
      { _id: '2', title: 'Test Note 2', description: 'Test Description 2', isTrash: true },
    ];
    httpServiceMock.getAllNotesApiCall.and.returnValue(of({ data: mockTrashNotes }));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.trashList.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });


  it('should update trash list on handleTrashList action', () => {
    const note = { _id: '1', title: 'Test Note', description: 'Test Description' };
    component.trashList = [note];
    component.handleTrashList({ action: 'delete', data: note });
  
    expect(component.trashList.length).toBe(0);
  });
  
  it('should filter notes based on incoming data', () => {
    component.filterNote = 'Test';
    component.trashList = [
      { _id: '1', title: 'Test Note', description: 'Test Description' },
      { _id: '2', title: 'Another Note', description: 'Description' }
    ];
  
    const filteredNotes = component.trashList.filter(note =>
      note.title.toLowerCase().includes(component.filterNote)
    );
  
    expect(filteredNotes.length).toBe(0);
  });
  
});
