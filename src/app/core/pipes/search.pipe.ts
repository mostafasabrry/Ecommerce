import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any,text:string): any[] {
    return products.filter( (product:any)=>product.title.toLowerCase().includes(text.toLowerCase()) )
  }

}
