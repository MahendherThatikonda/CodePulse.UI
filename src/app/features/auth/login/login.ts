import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginFormGroup=new FormGroup({
    email:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    password:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  })

  get emailFormControl(){
   return  this.loginFormGroup.controls.email
  }

  get passwordFormControl(){
   return  this.loginFormGroup.controls.password
  }

  onSubmit(){
    const formRawValue=this.loginFormGroup.getRawValue();
    

  }

}
