import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLabelComponent } from './edit-label.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import {  MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditLabelComponent', () => {
  let component: EditLabelComponent;
  let fixture: ComponentFixture<EditLabelComponent>;

  // Mock the functions passed through MAT_DIALOG_DATA
  const onLabelCreated = jasmine.createSpy('onLabelCreated');
  const onLabelUpdated = jasmine.createSpy('onLabelUpdated');

  const matDialogData = {
    labels: ['Label 1', 'Label 2'],
    onLabelCreated: onLabelCreated,
    onLabelUpdated: onLabelUpdated
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLabelComponent],
      imports:[MatIconModule, MatFormFieldModule, FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
        MatInputModule,],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: matDialogData },
        { provide: MatDialogRef, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize labels from MAT_DIALOG_DATA', () => {
    expect(component.labels.length).toBe(2);
    expect(component.labels[0].name).toBe('Label 1');
  });

  it('should create a new label when createLabel is called', () => {
    component.newLabel = 'New Label';
    component.createLabel();

    expect(onLabelCreated).toHaveBeenCalledWith({ name: 'New Label', isEditing: false });
    expect(component.labels.length).toBe(3); 
    expect(component.newLabel).toBe('');
  });

  it('should toggle edit mode for a label when toggleEdit is called', () => {
    const labelIndex = 0;
    expect(component.labels[labelIndex].isEditing).toBe(false);

    component.toggleEdit(labelIndex);

    expect(component.labels[labelIndex].isEditing).toBe(true);
  });

  it('should delete a label when deleteLabel is called', () => {
    const initialLabelCount = component.labels.length;
    component.deleteLabel(0);

    expect(component.labels.length).toBe(initialLabelCount - 1);
    expect(onLabelUpdated).toHaveBeenCalledWith(component.labels);
  });

  it('should update labels after renaming', () => {
    const labelIndex = 0;
    component.labels[labelIndex].name = 'Updated Label';
    component.renameLabel(labelIndex);

    expect(component.labels[labelIndex].name).toBe('Updated Label');
    expect(onLabelUpdated).toHaveBeenCalledWith(component.labels);
  });
});
