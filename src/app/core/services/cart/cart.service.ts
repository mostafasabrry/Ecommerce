import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   
  constructor(private httpClient:HttpClient) { }

  myToken=localStorage.getItem('userToken');

  cartNumber:WritableSignal<number> = signal(0);

  addProductToCart(id:string):Observable<any> {
   return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      "productId":id
},
    
  )
  }


  getLoggedUserCart():Observable<any> {
   return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:{
        token:this.myToken!,
      }
    }
  )
  }
  RemovespecificcartItem(id:string):Observable<any> {
   return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers:{
        token:this.myToken!,
      }
    }
  )
  }
  Updatecartproductquantity(id:string,count:number):Observable<any> {
   return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
    "count": count
  } ,
  
  )
  }


  Clearusercart():Observable<any> {
   return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
   
  )
  }


  
}
