import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http-service/http.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
      registerForm!: FormGroup;
      submitted = false;
      backendError: string | null = null; 
      subscription: Subscription | null = null; 
      constructor(private formBuilder: FormBuilder,public httpService:HttpService, public router:Router ) { }
  
      ngOnInit() {
          this.registerForm = this.formBuilder.group({
              Email: ['', [Validators.required, Validators.email]],
              Password: ['', [Validators.required, Validators.minLength(8)]],
          });
      }
  
      
      get regFormControls() { return this.registerForm.controls; }
      handleLogin() {
        this.submitted = true; 
        this.backendError = null; 
        if (this.registerForm.valid) {
          const { Email, Password } = this.registerForm.value;
          this.httpService.loginApiCall('/api/v1/users', { Email, Password }).subscribe({
            next: (res:any) => {
              console.log(res);
              localStorage.setItem("token",res.token);
             this.router.navigate(['/dashboard/notes'])
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