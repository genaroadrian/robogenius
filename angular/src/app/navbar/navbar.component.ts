import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  { userAdmin } from '../interfaces/userAdmin';
import { UserAdminService } from '../services/user-admin.service';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';


declare var jQuery:any;
declare var $:any;





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  public  emai = localStorage.getItem("email");
  public  subname = localStorage.getItem("subname");
  
  private _allHoras: Observable<userAdmin[]>;
  SelCountryId:string="0"; 

  // validamos la interfaz con el localStorage
  dia: userAdmin = {
    email: localStorage.getItem("email"),
  }
 
  //  Declaracion de la interfaz de personal
 

  constructor(private router:Router,public httpClient: HttpClient
  , public dialog: MatDialog,public useradminService :UserAdminService
    ) {
   

      // enviamos la funcion con el valor de la interfaz
      this.dias(this.dia);
      // setTimeout(this.print,9000);
      // setTimeout(this.codigo,9000);
   }
   
   dias(dia)
  {
  
    this._allHoras=this.useradminService.getHora(dia);  
   

// localStorage.autor = this._allHoras;
// alert(localStorage.autor); 
   
    
  }

  // funcion para salir
    logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('subname');

    this.router.navigateByUrl('/login');
  }

// Funcion para la barra desplegable
  click(){
    $(".submenu").click(function(){
    $(this).children("ul").slideToggle();
})
  }

//  print(obj){   
 
//   localStorage.setItem('subname',obj);
//  }


//  codigo(obj){
  
//   $("#action-button").click();
  
//   alert("Fuck");
//   console.log(obj);
//   localStorage.setItem('subname',obj);
//  }
 

 
  // Recupera el dato de el localStorage
  // datoLocalStorage(){
//     let email =localStorage.getItem("email");
// }
// URL de laravel
// API_ENDPOINT = 'http://localhost:8000/api';

// validacion() {
//   let emails = localStorage.getItem("email");
//   const headers = new HttpHeaders({"Content-Type":"application/json"});
//   return this.httpClient.post(this.API_ENDPOINT+'/useradmin',emails, {headers: headers});
//   console.log(emails);
// }


// validacion(): Observable<userAdmin[]>
// {
//   let emails = localStorage.getItem("email");
//   return this.httpClient.post<userAdmin[]>(this.API_ENDPOINT + '/useradmin',emails);
// }

// get() {
//   return this.httpClient.get(this.API_ENDPOINT + '/useradmin');

// }

  
}