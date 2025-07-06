import { Component, computed, HostListener, inject, input, OnInit, PLATFORM_ID, Signal, signal, WritableSignal,  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme/theme.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) {}
  
    
   

   private readonly pLATFORM_ID=inject(PLATFORM_ID)

  private readonly themeService=inject(ThemeService);
  private readonly authService=inject(AuthService);
  private readonly cartService=inject(CartService);

  counter:Signal<number>=computed( ()=> this.cartService.cartNumber()) 

  ngOnInit(): void {
   //flowbite config
     this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });

    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
     this.cartService.cartNumber.set(res.numOfCartItems);
      }
    })
   

    

    // darkMode.........
    if(isPlatformBrowser(this.pLATFORM_ID)){
       if(localStorage.getItem('theme')==='dark'){
          document.getElementById('mode')?.classList.replace('fa-moon','fa-sun');
    }
    }
    // end localStorage darkmode


  }
  
   
  //dark mode 
  toggleTheme(){
    const cuurentTheme=this.themeService.toggleTheme();
     
    console.log(cuurentTheme)
    if(cuurentTheme==='dark'){
    document.getElementById('mode')?.classList.replace('fa-moon','fa-sun');
    }else{
       document.getElementById('mode')?.classList.replace('fa-sun','fa-moon');
    }
  }


  //add p-4 if exist scroll
scroll:WritableSignal<boolean>=signal(false)

@HostListener('window:scroll')
onscroll() {
  if(scrollY>0){
   this.scroll.update((para)=> para=true)
  }else{
     this.scroll.update((para)=> para=false)
  }
}

//if is login or no
isLogin=input<boolean>(true);


//Signoiut


signOut(){
  this.authService.SignOut()
}

  

}
