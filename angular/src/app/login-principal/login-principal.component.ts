import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraficasService } from '../services/graficas.service';




@Component({
  selector: 'app-login-principal',
  templateUrl: './login-principal.component.html',
  styleUrls: ['./login-principal.component.css']
})
export class LoginPrincipalComponent implements OnInit  {
utilidadrestan:any;
mesingre:any;
mesegre:any;
utilidad:any;

  constructor( private _graficas:GraficasService) { }



  ngOnInit()
    {
    this._graficas.utilidadrestan()
      .subscribe(data=>{
        this.utilidadrestan=data;
      })
      this._graficas.mesingreso()
      .subscribe(data=>{
        this.mesingre=data;
      })
      this._graficas.mesegreso()
      .subscribe(data=>{
        this.mesegre=data;
      })
    this._graficas.utilidad()
    .subscribe(data=>{
      this.utilidad=data;
    })
   
  }
  

}

