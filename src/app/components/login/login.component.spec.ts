import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { HttpService } from "src/app/service/http-service/http.service";
import { LoginComponent } from "./login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component } from "@angular/core";

@Component({ template: '' })
class MockDashboardComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockSuccessResponse = { token: 'mockToken' };
  const mockErrorResponse = { status: 400, error: { message: 'Invalid email or password' } };

  const mockHttpService = {
    loginApiCall: jasmine.createSpy('loginApiCall').and.returnValue(of(mockSuccessResponse)),
  };

  const mockLocalStorage = {
    setItem: jasmine.createSpy('setItem'),
    getItem: jasmine.createSpy('getItem'),
    removeItem: jasmine.createSpy('removeItem'),
    clear: jasmine.createSpy('clear'),
  };
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockDashboardComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/notes', component: MockDashboardComponent },
        ]),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: HttpService, useValue: mockHttpService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.registerForm.value).toEqual({ Email: '', Password: '' });
  });

  it('should validate email and password fields', () => {
    const emailControl = component.registerForm.controls['Email'];
    const passwordControl = component.registerForm.controls['Password'];

    emailControl.setValue('');
    passwordControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();
    expect(passwordControl.hasError('required')).toBeTrue();

    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('valid@example.com');
    passwordControl.setValue('short');
    expect(passwordControl.hasError('minlength')).toBeTrue();

    passwordControl.setValue('ValidPassword123');
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should handle form submission and call HttpService', () => {
    const httpService = TestBed.inject(HttpService);

    component.registerForm.setValue({
      Email: 'valid@example.com',
      Password: 'ValidPassword123',
    });
    component.handleLogin();

    expect(httpService.loginApiCall).toHaveBeenCalledWith(
      '/api/v1/users',
      { Email: 'valid@example.com', Password: 'ValidPassword123' }
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
  });
 
});
