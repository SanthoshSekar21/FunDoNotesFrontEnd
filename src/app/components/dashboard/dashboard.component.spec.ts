import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { DataService } from 'src/app/service/dataservices/data.service';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  // Mocking MatDialogRef with all the required properties
  const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', [
    'afterClosed', 
    '_ref', 
    '_containerInstance', 
    'componentInstance', 
    'componentRef'
  ]);

  // Set afterClosed to return the desired observable value
  matDialogRefMock.afterClosed.and.returnValue(of({ name: 'New Label' }));

  beforeEach(async () => {
    // Create a spy for MatDialog to mock the open method
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    // Set the open method to return the mock MatDialogRef
    dialogMock.open.and.returnValue(matDialogRefMock);

    // Mock DataService
    dataServiceMock = jasmine.createSpyObj('DataService', ['outgoingData']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the DashboardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the drawer open and closed', () => {
    expect(component.isDrawerOpen).toBeFalse();
    component.toggleDrawer();
    expect(component.isDrawerOpen).toBeTrue();
    component.toggleDrawer();
    expect(component.isDrawerOpen).toBeFalse();
  });

  it('should navigate to the correct route when a drawer item is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.navigateTo('archive');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard', 'archive']);
  });

  it('should call outgoingData on search', () => {
    const searchValue = 'Test search';
    component.search({ target: { value: searchValue } });
    expect(dataServiceMock.outgoingData).toHaveBeenCalledWith(searchValue);
  });

 
  
});
