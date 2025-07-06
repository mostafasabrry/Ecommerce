import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  isLoading:WritableSignal<boolean>=signal(false);
  step:number=1;
   isSuccess:WritableSignal<string>=signal('');
  msgErorr:WritableSignal<string>=signal('');


  verifyEmailForm:FormGroup=this.formBuilder.group({
     email:[null,[Validators.required,Validators.email]]
  });


  verifyCodeForm:FormGroup=this.formBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
 });


 rePassForm:FormGroup=this.formBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]]
});


submitVarifyEmail(){
  let emailValue= this.verifyEmailForm.get('email')?.value;
  this.rePassForm.get('email')?.patchValue(emailValue); // Sync email with rePassForm

  
   if(this.verifyEmailForm.valid){
      this.isLoading.update((para)=> para=true);

      this.authService.setVerifyEmail(this.verifyEmailForm.value).subscribe({
        next:(res)=>{
            if(res.statusMsg === 'success') {
             
              
              this.isSuccess.update((para)=> para=res.statusMsg);
              setTimeout(() => {
                this.step = 2; // Move to the next step
                 this.isSuccess.update((para)=> para='');
              }, 500);
               this.isLoading.update((para)=> para=false);

            }
        },error:(err)=> {
         
           this.isLoading.update((para)=> para=false);
           this.msgErorr.update((para)=> para=err.error.message);
          setTimeout(() => {
                
                 this.msgErorr.update((para)=> para='');
              }, 1000);
        },
      })
   }else{
    this.verifyEmailForm.markAllAsTouched();
   }
   
}






submitVarifyCode(){
   if(this.verifyCodeForm.valid){
     this.isLoading.update((para)=> para=true);
      this.authService.setVerifyCode(this.verifyCodeForm.value).subscribe({
        next:(res)=>{
            if(res.status === 'Success') {
             
              
              this.isSuccess.update((para)=> para=res.statusMsg);
              setTimeout(() => {
                this.step = 3; // Move to the next step
                 this.isSuccess.update((para)=> para='');
              }, 500);
               this.isLoading.update((para)=> para=false);

            }
        },error:(err)=> {
          this.isLoading.update((para)=> para=false);
           this.msgErorr.update((para)=> para=err.error.message);
          setTimeout(() => {
                
                 this.msgErorr.update((para)=> para='');
              }, 1000);
        
        },
      })
   }else{
    this.verifyCodeForm.markAllAsTouched();
   }
}



submitVarifyPass(){
   if(this.rePassForm.valid){
     this.isLoading.update((para)=> para=true);
      this.authService.setVerifyPassword(this.rePassForm.value).subscribe({
        next:(res)=>{
            if(res.token !== null) {
               this.isSuccess.update((para)=> para=res.statusMsg);
               localStorage.setItem('userToken',res.token);
               this.authService.saveUserTokenData();
              setTimeout(() => {
               this.router.navigate(['/login']); // Redirect to login page after successful password reset
                 this.isSuccess.update((para)=> para='');
              }, 500);
               this.isLoading.update((para)=> para=false);
             
            

            }
        },error:(err)=> {
           this.isLoading.update((para)=> para=false);
           this.msgErorr.update((para)=> para=err.error.message);
          setTimeout(() => {
                
                 this.msgErorr.update((para)=> para='');
              }, 1000);
        
        },
      })
   }else{
    this.rePassForm.markAllAsTouched();
   }
}

}
