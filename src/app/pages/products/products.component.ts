
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/interfaces/icart';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { WhislistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports:  [CarouselModule,RouterLink,CurrencyPipe,FormsModule,SearchPipe,UpperCasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
 private readonly whislistService=inject(WhislistService);
  private readonly toastrService=inject(ToastrService);
 
  searchTerm:string='';
  
 


  

 

  
   products:Product[]=[];
  getAllproducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
      
         this.products=res.data;
         
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
 

  



  addTocart(id:string){
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          if(res.status==="success"){
          this.toastrService.success(res.message,"FreshCart")
             this.cartService.cartNumber.set(res.numOfCartItems);
        }
         
            localStorage.setItem('userId',res.data.cartOwner);
          
        },
        error:(err)=>{
              console.log(err)
        }
      })
  }

 
  


wishlistView: string[] = []; 

ngOnInit(): void {
  this.getAllproducts();
  
this.whislistService.Getloggeduserwishlist().subscribe({
    next: (res) => {
      this.wishlistView = res.data.map((item: any) => item._id);
      this.whislistService.wishlist.next(this.wishlistView);
    },
    error: (err) => {
      console.log('Error fetching wishlist:', err);
    }
  });
 
}





 toggleWishlist(id: string) {
  
  if (this.wishlistView.includes(id)) {

    this.whislistService.Removeproductfromwishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistView = res.data;
      },
      error: (err) => {
        console.log('Error removing from wishlist:', err);
      }
    });
  } else {
  
    this.whislistService.Addproducttowishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistView = res.data;
      },
      error: (err) => {
        console.log('Error adding to wishlist:', err);
      }
    });
  }
}






  
}

