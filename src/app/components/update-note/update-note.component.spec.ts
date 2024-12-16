import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNoteComponent } from './update-note.component';
import { HttpService } from '../../service/http-service/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<UpdateNoteComponent>>;

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpService', ['updateNoteApiCall']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UpdateNoteComponent,IconComponent],
      imports:[MatIconModule,MatMenuModule,FormsModule,BrowserModule,BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { _id: '1', title: 'Test Note', description: 'Test Description', color: { code: '#ffffff' } } },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: HttpService, useValue: httpServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call updateNoteApiCall and emit updateList with correct data when onClose is called', () => {
    const mockResponse = { data: { _id: '1', title: 'Test Note', description: 'Test Description', color: '#ffffff' } };
    httpServiceMock.updateNoteApiCall.and.returnValue(of(mockResponse));

    spyOn(component.updateList, 'emit');

    component.onClose();
    expect(httpServiceMock.updateNoteApiCall).toHaveBeenCalledWith(
      '/api/v1/notes/1', 
      { title: 'Test Note', description: 'Test Description' }, 
      { headers: jasmine.any(HttpHeaders) }
    );
    expect(component.updateList.emit).toHaveBeenCalledWith({
      data: mockResponse.data,
      action: 'update',
      color: '#ffffff',
    });
  });

  it('should handle error when updateNoteApiCall fails', () => {
    httpServiceMock.updateNoteApiCall.and.returnValue(throwError('Error occurred'));

    spyOn(console, 'error');

    component.onClose();

    expect(console.error).toHaveBeenCalledWith('Error updating note:', 'Error occurred');
  });

  it('should handle color-change action in handleIconOperation', () => {
    const event = { data: { color: '#ff0000' }, action: 'color-change' };
    component.handleIconOperation(event);

    expect(component.selectedColor).toBe('#ff0000');
    expect(component.noteDetails.color).toBe('#ff0000');
  });

  it('should emit iconOperation for archive action', () => {
    const event = { data: { _id: '1' }, action: 'archive' };
    spyOn(component.iconOperation, 'emit');

    component.handleIconOperation(event);

    expect(component.iconOperation.emit).toHaveBeenCalledWith({ data: event.data, action: 'archive' });
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should emit iconOperation for trash action', () => {
    const event = { data: { _id: '1' }, action: 'trash' };
    spyOn(component.iconOperation, 'emit');

    component.handleIconOperation(event);

    expect(component.iconOperation.emit).toHaveBeenCalledWith({ data: event.data, action: 'trash' });
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
