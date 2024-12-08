import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotesCotainerComponent } from './notes-cotainer.component';
import { HttpService } from '../../service/http-service/http.service';
import { DataService } from 'src/app/service/dataservices/data.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddNoteComponent } from '../add-note/add-note.component';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { NoteCardComponent } from '../note-card/note-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IconComponent } from '../icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('NotesCotainerComponent', () => {
  let component: NotesCotainerComponent;
  let fixture: ComponentFixture<NotesCotainerComponent>;
  let httpService: HttpService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule,MatProgressSpinnerModule,MatDialogModule,MatMenuModule,MatIconModule],
      declarations: [NotesCotainerComponent, AddNoteComponent,FilterPipe, NoteCardComponent,IconComponent],
      providers: [HttpService, DataService],
    });

    fixture = TestBed.createComponent(NotesCotainerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    dataService = TestBed.inject(DataService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when notes are being fetched', fakeAsync(() => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingSpinner = fixture.debugElement.query(By.css('.loading-container'));
    expect(loadingSpinner).toBeTruthy();
  }));

  it('should fetch notes successfully and update notesList', fakeAsync(() => {
    const mockNotes = [
      { _id: '1', title: 'Note 1', description: 'Test Note 1', isArchive: false, isTrash: false, color: '#ffffff' },
      { _id: '2', title: 'Note 2', description: 'Test Note 2', isArchive: false, isTrash: false, color: '#f0f0f0' },
    ];
    spyOn(httpService, 'getAllNotesApiCall').and.returnValue(of({ data: mockNotes }));

    component.fetchNotes();
    tick();
    fixture.detectChanges();

    expect(component.notesList.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  }));

  it('should update notes list when a new note is added', fakeAsync(() => {
    const newNote = { _id: '3', title: 'New Note', description: 'This is a new note', isArchive: false, isTrash: false, color: '#ffffff' };
    component.handleUpdateList({ action: 'add', data: newNote });
    fixture.detectChanges();

    expect(component.notesList.length).toBe(1);
    expect(component.notesList[0].title).toBe('New Note');
  }));

  it('should remove a note from the list when it is archived', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', isArchive: false, isTrash: false, color: '#ffffff' };
    component.notesList = [mockNote];
    component.handleUpdateList({ action: 'archive', data: mockNote });

    fixture.detectChanges();
    expect(component.notesList.length).toBe(0);
  }));

  it('should remove a note from the list when it is trashed', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', isArchive: false, isTrash: false, color: '#ffffff' };
    component.notesList = [mockNote];
    component.handleUpdateList({ action: 'trash', data: '1' });

    fixture.detectChanges();
    expect(component.notesList.length).toBe(0);
  }));

  it('should update the note color when a color-change action is triggered', fakeAsync(() => {
    const mockNote = { _id: '1', title: 'Test Note', description: 'Test', color: '#ffffff', isArchive: false, isTrash: false };
    component.notesList = [mockNote];

    const newColor = '#ff0000';
    component.handleUpdateList({ action: 'color-change', data: { noteId: '1', color: newColor } });
    fixture.detectChanges();

    expect(component.notesList[0].color).toBe(newColor);
  }));

  
});
