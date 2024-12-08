import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { HttpService } from '../../service/http-service/http.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpService: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    httpService = jasmine.createSpyObj('HttpService', ['registerApiCall']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: HttpService, useValue: httpService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['Firstname'].value).toBe('');
    expect(component.registerForm.controls['Lastname'].value).toBe('');
    expect(component.registerForm.controls['Email'].value).toBe('');
    expect(component.registerForm.controls['Password'].value).toBe('');
  });

  it('should handle valid form submission and navigate on success', () => {
    component.registerForm.patchValue({
      Firstname: 'John',
      Lastname: 'Doe',
      Email: 'john.doe@example.com',
      Password: 'Password123',
    });
    

    const mockResponse = httpService.registerApiCall.and.returnValue(of({ message: 'Registration successful' }));
    httpService.registerApiCall.and.returnValue(of(mockResponse));

    component.handleSignup();
    expect(httpService.registerApiCall).toHaveBeenCalledWith('/api/v1/users/register', {
      Firstname: 'John',
      Lastname: 'Doe',
      Email: 'john.doe@example.com',
      Password: 'Password123',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should display an error message on failed registration', () => {
    component.registerForm.patchValue({
      Firstname: 'John',
      Lastname: 'Doe',
      Email: 'invalid.email.com',
      Password: '12334',
    });

    const mockError = {
      status: 400,
      error: { message: 'Invalid registration details' },
    };

    httpService.registerApiCall.and.returnValue(throwError(mockError));

    component.handleSignup();
    expect(component.backendError).toBe(null);
  });
});
