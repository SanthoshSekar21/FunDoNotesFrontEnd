import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../../service/http-service/http.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

// Mock component for app-icon
@Component({
  selector: 'app-icon',
  template: '<div></div>',
})
class MockAppIconComponent {}

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let httpService: HttpService;

  beforeEach(async () => {
    const mockElementRef = { nativeElement: { value: '' } };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
      ],
      declarations: [AddNoteComponent, MockAppIconComponent],
      providers: [
        HttpService,
        MatIconRegistry,
        { provide: ElementRef, useValue: mockElementRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });  
  it('should log an error when note creation fails', () => {
    const errorResponse = { message: 'Error creating note' };
    spyOn(httpService, 'createNoteApiCall').and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');

    component.title = 'Test Title';
    component.description = 'Test Description';
    component.selectedColor = '#ffffff'; 
    component.addNoteToggle('save');

    expect(console.error).toHaveBeenCalledWith('Error creating note:', errorResponse);
  });

  it('should update the selected color when handleIconOperation is called', () => {
    const event = { action: 'add', data: { color: '#ff0000' } };
    component.handleIconOperation(event);
    expect(component.selectedColor).toBe('#ff0000');
  });

  it('should display collapsed view when isExpanded is false', () => {
    component.isExpanded = false;
    fixture.detectChanges();
    const collapsedDiv = fixture.debugElement.query(By.css('.note-collapsed'));
    expect(collapsedDiv).toBeTruthy();
  });

  it('should display expanded view when isExpanded is true', () => {
    component.isExpanded = true;
    fixture.detectChanges();
    const expandedDiv = fixture.debugElement.query(By.css('.note-expanded'));
    expect(expandedDiv).toBeTruthy();
  });

  it('should render the "Take a note..." span in collapsed state', () => {
    component.isExpanded = false;
    fixture.detectChanges();
    const takeNoteSpan = fixture.debugElement.query(By.css('.note-collapsed span'));
    expect(takeNoteSpan.nativeElement.textContent).toContain('Take a note...');
  });

  it('should call addNoteToggle with "toggle" when collapsed div is clicked', () => {
    spyOn(component, 'addNoteToggle');
    component.isExpanded = false;
    fixture.detectChanges();

    const collapsedDiv = fixture.debugElement.query(By.css('.note-collapsed'));
    collapsedDiv.triggerEventHandler('click', null);

    expect(component.addNoteToggle).toHaveBeenCalledWith('toggle');
  });
});
