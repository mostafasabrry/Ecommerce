import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import e from 'express';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ordersService=inject(OrdersService);
  private readonly router=inject(Router);

   checkOutForm!:FormGroup;

   cartId:string='';

   ngOnInit(): void {
     this.checkOutForm=new FormGroup({
      details:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city:new FormControl(null,[Validators.required])
     })

      this.getCartId();
   }

   getCartId(){
       this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
         this.cartId=p.get('id')!;
          localStorage.setItem('cartId',this.cartId);
      },
      error:(err)=>{
        console.log(err)
      }
     })
   }

   submitForm(){
   
   if(this.checkOutForm.valid){

     this.ordersService.checkOuyPayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
           console.log(res);
          
       if(res.status === 'success'){
        open(res.session.url, '_self');
        console.log(res.session.url);
        console.log(res.session.success_url);
       
       }
          
      },
      error:(err)=>{
          console.log(err)
      }
    })


   }
    else{
      this.checkOutForm.markAllAsTouched();
    }
   }
}
