import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { HttpService } from '../../service/http-service/http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let httpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    // Create a spy for HttpService
    httpService = jasmine.createSpyObj('HttpService', ['updateNoteApiCall', 'archiveNoteApiCall', 'deleteNoteApiCall']);

    TestBed.configureTestingModule({
      declarations: [IconComponent],
      imports: [MatIconModule, MatMenuModule, MatTooltipModule,BrowserAnimationsModule],
      providers: [
        { provide: HttpService, useValue: httpService }
      ]
    });

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show buttons correctly when noteDetails is provided', () => {
    component.noteDetails = {
      _id: '1',
      title: 'Test Note',
      description: 'Test Description',
      isTrash: false,
      isArchive: false
    };
    fixture.detectChanges();

    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(6); 

    
    const archiveButton = buttons[4];
    expect(archiveButton).toBeTruthy();
    expect(archiveButton.getAttribute('matTooltip')).toBe('Archive');
  });

  it('should show restore and delete buttons when note is in trash', () => {
    component.noteDetails = {
      _id: '1',
      title: 'Test Note',
      description: 'Test Description',
      isTrash: true,
      isArchive: false
    };
    fixture.detectChanges();

    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    const restoreButton = buttons[0];
    expect(restoreButton).toBeTruthy();
    expect(restoreButton.getAttribute('matTooltip')).toBe('Restore');

    const deleteButton = buttons[1];
    expect(deleteButton).toBeTruthy();
    expect(deleteButton.getAttribute('matTooltip')).toBe('Delete');
  });

  it('should call archiveNoteOperation when archive button is clicked', () => {
    const archiveSpy = spyOn(component, 'archiveNoteOperation').and.callThrough();
    component.noteDetails = {
      _id: '1',
      title: 'Test Note',
      description: 'Test Description',
      isTrash: false,
      isArchive: false
    };
    fixture.detectChanges();

    const archiveButton = fixture.debugElement.nativeElement.querySelector('[aria-label="archive button"]');
    archiveButton.click();

    expect(archiveSpy).toHaveBeenCalled();
  });

  it('should call trashNoteOperation when restore button is clicked', () => {
    const trashSpy = spyOn(component, 'trashNoteOperation').and.callThrough();
    component.noteDetails = {
      _id: '1',
      title: 'Test Note',
      description: 'Test Description',
      isTrash: true,
      isArchive: false
    };
    fixture.detectChanges();

    const restoreButton = fixture.debugElement.nativeElement.querySelector('[aria-label="restore"]');
    restoreButton.click();

    expect(trashSpy).toHaveBeenCalled();
  });

  it('should call deleteNoteOperation when delete button is clicked', () => {
    const deleteSpy = spyOn(component, 'deleteNoteOperation').and.callThrough();
    component.noteDetails = {
      _id: '1',
      title: 'Test Note',
      description: 'Test Description',
      isTrash: true,
      isArchive: false
    };
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.nativeElement.querySelector('[aria-label="delete"]');
    deleteButton.click();

    expect(deleteSpy).toHaveBeenCalled();
  });
});
