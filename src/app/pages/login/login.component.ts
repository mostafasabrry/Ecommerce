import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  isLoading:WritableSignal<boolean>=signal(false);
  isSuccess:WritableSignal<string>=signal('');
  msgErorr:WritableSignal<string>=signal('');

   Login:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]],
  } )

  submitLoginForm(){
   
 if(this.Login.valid){
    this.isLoading.update((para)=> para=true);
    this.authService.sendLoginData(this.Login.value).subscribe({
      next:(res)=> {
       if(res.message === 'success') {
           //save user token in local storage
           localStorage.setItem('userToken',res.token);
           //decode user token to get user data
           this.authService.saveUserTokenData();
              setTimeout(() => {
              this.router.navigate(['/home'])
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
  this.Login.markAllAsTouched();
 }
}

}
