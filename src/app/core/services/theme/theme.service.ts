import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  private themeKey = 'theme';

 
  

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): string {
   
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
    let anothertheme='';
    if(currentTheme=='dark'){
      anothertheme='light';



    }else{
      anothertheme='dark';
    }
    htmlElement.classList.remove(anothertheme)
    htmlElement.classList.add(currentTheme);
    if(isPlatformBrowser(this.pLATFORM_ID)){
       localStorage.setItem(this.themeKey, currentTheme);
    }
   
    return currentTheme;
  }

  private loadTheme(): void {
     if(isPlatformBrowser(this.pLATFORM_ID)){
        const savedTheme = localStorage.getItem(this.themeKey) || 'light';
       document.documentElement.classList.add(savedTheme);
  }
}

}
