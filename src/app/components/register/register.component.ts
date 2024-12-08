import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http-service/http.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm!: FormGroup;
    submitted = false;
    showPass = 'password';
    backendError: string | null = null; 
    subscription: Subscription | null = null; 

    constructor(private formBuilder: FormBuilder, public httpService: HttpService, public router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            Firstname: ['', Validators.required],
            Lastname: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

  
    get signUpFormControls() { return this.registerForm.controls; }

    handleSignup() {
        this.submitted = true;
        this.backendError = null; 

        if (this.registerForm.valid) {
            const { Firstname, Lastname, Email, Password } = this.registerForm.value;

            this.httpService.registerApiCall('/api/v1/users/register', { Firstname, Lastname, Email, Password }).subscribe({
                next: (res:any) => {
                    this.router.navigate(['']);
                    console.log(res);
                },
                error: (err:any) => {
                  if (err.status === 400 && err.error && err.error.message) {
                    this.backendError = err.error?.message;
                  } else {
                      this.backendError = 'An unexpected error occurred. Please Enter the Valid credentials.';
                  }
                  console.log(err);
              }
              
            });
        }
    }
    ngOnDestroy() {
 
        if (this.subscription) {
          this.subscription.unsubscribe();
          this.subscription = null; 
        }
      }
}
