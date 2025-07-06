import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  GetAllBrands():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  
}
