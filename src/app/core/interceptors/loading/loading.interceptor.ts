import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { url } from 'node:inspector';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
   const ngxSpinnerService=inject(NgxSpinnerService);
  if(req.url.includes('home') || req.url.includes('products') || req.url.includes('categories') || req.url.includes('cart') || req.url.includes('details'),req.url.includes('brands') || req.url.includes('wishlist') || req.url.includes('checkout') ) {
   ngxSpinnerService.show();
  }

 

  
  return next(req).pipe( finalize(()=>{
    ngxSpinnerService.hide();
  }) )
};
