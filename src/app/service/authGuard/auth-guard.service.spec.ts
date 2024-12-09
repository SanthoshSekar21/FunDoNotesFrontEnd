import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService]
    });

    authGuardService = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
  });
  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should allow access if token exists', () => {
   
    (localStorage.getItem as jasmine.Spy).and.returnValue('mockToken');

    const canActivate = authGuardService.canActivate();
    expect(canActivate).toBeTrue(); 
  });

  it('should deny access and redirect if token does not exist', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = authGuardService.canActivate();
    expect(canActivate).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
