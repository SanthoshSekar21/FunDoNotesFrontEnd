import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ArchiveContainerComponent } from './archive-container.component';
import { HttpService } from '../../service/http-service/http.service';
import { DataService } from 'src/app/service/dataservices/data.service';
import { filter, of, throwError } from 'rxjs';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

describe('ArchiveContainerComponent', () => {
  let component: ArchiveContainerComponent;
  let fixture: ComponentFixture<ArchiveContainerComponent>;
  let httpService: HttpService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule],
      declarations: [ArchiveContainerComponent, MatSpinner],
      providers: [HttpService, DataService,FilterPipe],
    });

    fixture = TestBed.createComponent(ArchiveContainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    dataService = TestBed.inject(DataService);
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No notes to display" if no archived notes are found', fakeAsync(() => {
    component.isLoading = true;
    spyOn(httpService, 'getAllNotesApiCall').and.returnValue(of({ data: [] }));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const noNotesMessage = fixture.debugElement.query(By.css('.no-notes-wrapper'));
    expect(noNotesMessage).toBeTruthy(); // "No notes to display" message should appear
  }));

  it('should update archive list when a note is archived', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', isArchive: true, isTrash: false };
    component.archiveList = [mockNote];

    component.handleArchiveList({ action: 'archive', data: mockNote });
    fixture.detectChanges();

    expect(component.archiveList.length).toBe(0); // Note should be removed from the archive list
  }));

  it('should update archive list when a note is trashed', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', isArchive: true, isTrash: false };
    component.archiveList = [mockNote];

    component.handleArchiveList({ action: 'trash', data: '1' });
    fixture.detectChanges();

    expect(component.archiveList.length).toBe(0); // Note should be removed from the archive list
  }));

  it('should update note color when color-change action is triggered', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', color: '#FFFFFF', isArchive: true, isTrash: false };
    component.archiveList = [mockNote];

    const newColor = '#000000';
    component.handleArchiveList({ action: 'color-change', data: { noteId: '1', color: newColor } });
    fixture.detectChanges();

    expect(component.archiveList[0].color).toBe(newColor); // Note color should be updated
  }));

  it('should subscribe to incomingData from DataService', fakeAsync(() => {
    const incomingDataSpy = spyOn(dataService.incomingData, 'subscribe').and.callThrough();
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(incomingDataSpy).toHaveBeenCalled(); // Ensure the subscription is triggered
  }));

 
});
