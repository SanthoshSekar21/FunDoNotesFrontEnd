import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Mocking the UpdateNoteComponent to avoid complexity in the test
@Component({selector: 'app-update-note', template: ''})
class MockUpdateNoteComponent {}

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteCardComponent, MockUpdateNoteComponent],
      imports: [MatDialogModule,HttpClientModule],
      providers: [MatDialog],
      schemas: [NO_ERRORS_SCHEMA], 
    });
    
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open update dialog when note card is clicked', () => {
    const note = { _id: '1', title: 'Test Note', description: 'Test Description', color: 'red', isTrash: false, isArchive: false };

    component.noteDetails = note;
    fixture.detectChanges();
    
    spyOn(matDialog, 'open');  

    const noteCard = fixture.debugElement.query(By.css('.note-card'));
    noteCard.triggerEventHandler('click', null);

    expect(matDialog.open).toHaveBeenCalledWith(UpdateNoteComponent, jasmine.objectContaining({ data: note }));
  });

  it('should emit updateList event when iconOperation is triggered', () => {
    spyOn(component.updateList, 'emit');
    
    const iconEvent = { action: 'archive', data: { _id: '1', title: 'Test Note', description: 'Test Description', color: 'red' } };
    component.handleNoteIconsClick(iconEvent);

    expect(component.updateList.emit).toHaveBeenCalledWith({ data: iconEvent.data, action: iconEvent.action });
  });
});
