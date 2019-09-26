import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  { userAdmin } from '../interfaces/userAdmin';
import { UserAdminService } from '../services/user-admin.service';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SucursalService } from '../services/sucursal.service';
import { Sucursal } from '../interfaces/sucursal';


declare var jQuery:any;
declare var $:any;





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  ingresos:Sucursal[];


  public  emai = localStorage.getItem("email");
  public  subname = localStorage.getItem("subname");
  
  private _allHoras: Observable<userAdmin[]>;
  SelCountryId:string="0"; 

  // validamos la interfaz con el localStorage
  dia: userAdmin = {
    email: localStorage.getItem("email"),
  }

  foto=localStorage.getItem("foto");
  prueba:any;

  sucur:any;
 
  //  Declaracion de la interfaz de personal
 

  constructor(private router:Router,public httpClient: HttpClient
  , public dialog: MatDialog,public useradminService :UserAdminService,
  public sucursalService: SucursalService
    ) {
      
      // this.sucur=localStorage.getItem('sucursal');
      // console.log(this.sucur);
   
    this.sucursalService.getfsucursal()
  .subscribe(data=>{
    this.ingresos=data;
    this.sucur=localStorage.getItem('sucursal');

    // this.sucur = ;
  })



      // enviamos la funcion con el valor de la interfaz
      this.dias(this.dia);
      // setTimeout(this.print,9000);
      // setTimeout(this.codigo,9000);
   }
   tipoChange(value:string) {
    
    // console.log(this.archivo);
    localStorage.removeItem('sucursal');
    localStorage.setItem('sucursal' , value);
    console.log(value)

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
    localStorage.removeItem('foto');

    this.router.navigateByUrl('/login');
  }

// Funcion para la barra desplegable
  click(){
    $(".submenu").click(function(){
    $(this).children("ul").slideToggle();
})
  }




}
