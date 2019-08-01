import { Component } from '@angular/core';
import {HomePersonalComponent} from './home-personal/home-personal.component';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  
  constructor(private router :Router){
  }

  // barra de movimiento superrior
  click(){
    $(".submenu").click(function(){
    $(this).children("ul").slideToggle();
})
  }






  // funcion del localStorage para poner el email y hacer la validacion
     emai = localStorage.getItem("email");
     subname = localStorage.getItem("subname");
  // logout(){
  //   localStorage.removeItem('email');
  //   this.router.navigateByUrl('/login');
  // }


  
  
}
