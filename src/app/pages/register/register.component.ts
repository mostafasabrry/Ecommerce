import { Component, inject, signal, WritableSignal } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

import { AuthService } from '../../core/services/auth/auth.service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  isLoading:WritableSignal<boolean>=signal(false);
  isSuccess:WritableSignal<string>=signal('');
  msgErorr:WritableSignal<string>=signal('');
  
   register:FormGroup=this.formBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]],
    rePassword:[null,[Validators.required]],
  },{validators:[this.confirmPassword]} )

confirmPassword(group:AbstractControl){
  const pass= group.get('password')?.value;
  const rePass= group.get('rePassword')?.value;
  return pass===rePass?null:{mismatch:true};
}

submitRegisterForm(){
   
 if(this.register.valid){
    this.isLoading.update((para)=> para=true);
    this.authService.sendRegisterData(this.register.value).subscribe({
      next:(res)=> {
       if(res.message === 'success') {
        
              setTimeout(() => {
              this.router.navigate(['/login'])
                }, 500);
       }
        

       this.isLoading.update((para)=> para=false);
        this.isSuccess.update((para)=> para=res.message);
     
     
      },
      error:(err)=> {
        console.log(err);
        this.isLoading.update((para)=> para=false);
        this.msgErorr.update((para)=> para=err.error.message);
      },
      
      
    })

 }else{
  this.register.markAllAsTouched(); // to show validation errors
 }
}
  
}




