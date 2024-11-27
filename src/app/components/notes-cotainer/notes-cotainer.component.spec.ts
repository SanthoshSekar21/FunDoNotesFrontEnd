import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCotainerComponent } from './notes-cotainer.component';

describe('NotesCotainerComponent', () => {
  let component: NotesCotainerComponent;
  let fixture: ComponentFixture<NotesCotainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesCotainerComponent]
    });
    fixture = TestBed.createComponent(NotesCotainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
