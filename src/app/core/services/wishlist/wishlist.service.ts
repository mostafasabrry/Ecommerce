import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WhislistService {

  constructor(private httpClient:HttpClient) { }

  wishlist:BehaviorSubject<string[]>=new BehaviorSubject(['']);

  Addproducttowishlist(id:string):Observable<any>{
   return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      "productId": id
  
   })
  }

  Removeproductfromwishlist(id:string):Observable<any>{
   return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }

  Getloggeduserwishlist():Observable<any>{
   return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }


  
}
