import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/authservice';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true
})
export class Register {
  formData : FormGroup ;
  constructor(
    private fb :FormBuilder ,
    private authService : AuthService ,
    private router : Router
  ) {
    this.formData = this.fb.group({
      firstName : ['',Validators.required] ,
      lastName : ['',Validators.required] ,
      email : ['',Validators.required] ,
      password : ['',Validators.required] ,
      phoneNumber : ['',Validators.pattern('^[0-9]{10}$')] ,
      cin : ['',Validators.pattern('^[0-9]{10}$')]
    })
  }

  onSubmit(){
    if(this.formData.invalid){
      console.error('Form is invalid');
      return ;
    }

    this.authService.register(this.formData.value).subscribe({
      next : (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error : (error) => {
        console.error('Error registering user', error);
      }
    })
  }
}
