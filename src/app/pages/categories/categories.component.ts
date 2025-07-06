import { Component, inject, OnInit } from '@angular/core';

import { Icategory } from '../../shared/interfaces/icategory';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [NgxSpinnerComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  private readonly categoriesService=inject(CategoriesService);

  
  dataOfCategories:Icategory[]=[] ;
  ngOnInit(): void {

    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.dataOfCategories=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  reload(){
    setTimeout(() => {
      this.ngxSpinnerService.hide('load2')
    },500 );
    this.ngxSpinnerService.show('load2')
  }

}
