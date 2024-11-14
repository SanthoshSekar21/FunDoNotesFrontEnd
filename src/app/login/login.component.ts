import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
      registerForm!: FormGroup;
      submitted = false;
      showPass="text";
  
      constructor(private formBuilder: FormBuilder ) { }
  
      ngOnInit() {
          this.registerForm = this.formBuilder.group({
              email: ['', [Validators.required, Validators.email]],
              password: ['', [Validators.required, Validators.minLength(8)]],
          });
      }
  
      // convenience getter for easy access to form fields
      get regFormControls() { return this.registerForm.controls; }
      handleLogin(){
       console.log(this.regFormControls["email"]["errors"]?.["required"])
      }
      onSubmit() {
        this.submitted = true;
        console.log('Form submitted successfully');
      }   
}
