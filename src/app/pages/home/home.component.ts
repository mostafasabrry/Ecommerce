import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhislistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,FormsModule,UpperCasePipe,CurrencyPipe,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 private readonly productsService=inject(ProductsService);
 private readonly categoriesService=inject(CategoriesService);
 private readonly cartService=inject(CartService);
 private readonly toastrService=inject(ToastrService);
 private readonly whislistService=inject(WhislistService);


 products:Iproduct[]=[];
 categories:Icategory[]=[];
 searchTerm:string='';

 ngOnInit(): void {
   this.getProductsData();
   this.getCategoriesData();

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

 customSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    items: 1,
    nav:false
   
  }

 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-circle-left"></i>', '<i class="fa-solid fa-circle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }



 getProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
        this.products=res.data;
       
    },
    error:(err)=>{
       console.log(err)
    }
  })
 }

 getCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
       
        this.categories=res.data;
    },
    error:(err)=>{
       console.log(err)
    }
  })
 }

 addToCart(id:string){
   this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
        if(res.status==="success"){
          this.toastrService.success(res.message,"FreshCart")
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
    },
    error:(err)=>{
       console.log(err);
    }
   })
 }




 //wishList toggle

 wishlistView: string[] = []; 

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
