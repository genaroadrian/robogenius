import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ENDPOINT = globalVar.url

  dialogData: any;

  constructor(private http:HttpClient){}

  Url =  globalVar.url+'/login';

  // Funcion para recuperar el json de la base de datos
  getPersonas(){
    return this.http.get<Login[]>(this.Url);
  
  }

  saveCorreo(datos)
  {
    this.dialogData = datos
  }

  getDialogData()
  {
    return this.dialogData
  }

  enviarCorreo(datos)
  {
    // console.log(datos)
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT+"/email",datos,{headers:headers})
  }
  validation(datos){
    // console.log(datos)
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT+"/validation",datos,{headers:headers})

  }
}
