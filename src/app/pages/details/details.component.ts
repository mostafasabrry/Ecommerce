import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
 private readonly activatedRoute=inject(ActivatedRoute);
 private readonly productsService=inject(ProductsService);
 private readonly cartService=inject(CartService);
 private readonly toastrService=inject(ToastrService);

 idProduct:string|null='';
 detailsProduct:Iproduct={}as Iproduct;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(para)=>{
        this.idProduct=para.get('id');
      }
    });
    this.getProduct(this.idProduct!);
  }

  getProduct(id:string){
     this.productsService.getSpecificProducts(id).subscribe({
      next:(res)=>{
       this.detailsProduct=res.data;
      },
      error:(err)=>{
        console.error('Error fetching product details:', err);
      }
     })
  }

  addTocart(id:string){
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          
            console.log(res);
             if(res.status==="success"){
          this.toastrService.success(res.message,"FreshCart")
        }
         
            localStorage.setItem('userId',res.data.cartOwner);
          
        },
        error:(err)=>{
              console.log(err)
        }
      })
  }

 
}
