import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2'
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
   cartData:Icart={}as Icart;
   msgClear:string='';
  ngOnInit(): void {
    
    this.getCartData();
  }

  getCartData():void{
     this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartData=res.data;
      },
      error:(err)=> {
         console.log(err);
      },
     })
  }

  removeCartItem(id:string):void{
    
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
              this.cartService.RemovespecificcartItem(id).subscribe({
      next: (res) => {
          
          console.log(res);
      this.getCartData();
       if(res.status=='success'){

         this.cartService.cartNumber.set(0);
         
              this.cartData={} as Icart;
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              
            }
      },
      error: (err) => {
        console.log(err);
      }
    })
      }});
   
  }

  updateCartProductQuantity(id:string,count:number):void{
    this.cartService.Updatecartproductquantity(id,count).subscribe({
      next: (res) => {
       
        this.cartData=res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  } 

  clearCart():void{
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.Clearusercart().subscribe({
          next:(res)=>{
          
            this.msgClear=res.message;
          
            if(res.message=='success'){
              
              this.cartData={} as Icart;
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

                this.cartService.cartNumber.set(0);
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
        
      }
    });

  }
}
