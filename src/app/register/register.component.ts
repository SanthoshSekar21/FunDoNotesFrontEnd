import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http-service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm!: FormGroup;
    submitted = false;
    showPass='password'

    constructor(private formBuilder: FormBuilder,public httpService:HttpService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            Firstname: ['', Validators.required],
            Lastname: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    // convenience getter for easy access to form fields
    get signUpFormControls() { return this.registerForm.controls; }
    handleSignup(){
        this.submitted = true; 
        if (this.registerForm.valid) {
          const { Firstname,Lastname,Email, Password } = this.registerForm.value;
          console.log( Firstname,Lastname,Email, Password);
          this.httpService.registerApiCall('/api/v1/users/register', {Firstname,Lastname, Email, Password }).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
          
        } 
      }
    }

