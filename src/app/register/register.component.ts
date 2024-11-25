import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http-service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm!: FormGroup;
    submitted = false;
    showPass = 'password';
    backendError: string | null = null; // Variable to hold the backend error message

    constructor(private formBuilder: FormBuilder, public httpService: HttpService, private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            Firstname: ['', Validators.required],
            Lastname: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // convenience getter for easy access to form fields
    get signUpFormControls() { return this.registerForm.controls; }

    handleSignup() {
        this.submitted = true;
        this.backendError = null; // Clear any previous error

        if (this.registerForm.valid) {
            const { Firstname, Lastname, Email, Password } = this.registerForm.value;

            this.httpService.registerApiCall('/api/v1/users/register', { Firstname, Lastname, Email, Password }).subscribe({
                next: (res) => {
                    this.router.navigate(['']);
                    console.log(res);
                },
                error: (err) => {
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
}
