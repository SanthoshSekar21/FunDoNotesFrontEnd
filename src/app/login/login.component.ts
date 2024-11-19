import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http-service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
      registerForm!: FormGroup;
      submitted = false;
  
      constructor(private formBuilder: FormBuilder,public httpService:HttpService,private router:Router ) { }
  
      ngOnInit() {
          this.registerForm = this.formBuilder.group({
              Email: ['', [Validators.required, Validators.email]],
              Password: ['', [Validators.required, Validators.minLength(8)]],
          });
      }
  
      
      get regFormControls() { return this.registerForm.controls; }
      handleLogin() {
        this.submitted = true; 
        if (this.registerForm.valid) {
          const { Email, Password } = this.registerForm.value;
          this.httpService.loginApiCall('', { Email, Password }).subscribe({
            next: (res) => {
              console.log(res);
             this.router.navigate(['/dashboard/notes'])
            },
            error: (err) => {
              console.log(err);
            }
          });
          
        } 
      }
    }      