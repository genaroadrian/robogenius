import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient){}

  Url =  'http://127.0.0.1:8000/api/login';

  // Funcion para recuperar el json de la base de datos
  getPersonas(){
    return this.http.get<Login[]>(this.Url);
  
  }
}
