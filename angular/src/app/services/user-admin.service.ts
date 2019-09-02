import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  { userAdmin } from '../interfaces/userAdmin';
import { Horas } from '../interfaces/horas';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  API_ENDPOINT = 'http://localhost:8000/api';
  constructor(private httpClient: HttpClient) { 
  }
  
  getHora(dia): Observable<userAdmin[]>
  {
    return this.httpClient.post<userAdmin[]>(this.API_ENDPOINT + '/useradmin',dia);
  }

  
  

// validacion() {
//   let emails = localStorage.getItem("email");
//   const headers = new HttpHeaders({"Content-Type":"application/json"});
//   return this.httpClient.post(this.API_ENDPOINT+'/useradmin',emails, {headers: headers});
//   console.log(emails);
// }



  

// get() {
//   return this.httpClient.get(this.API_ENDPOINT + '/useradmin');

// }

validEmail(datos)
{
  const headers = new HttpHeaders( {'Content-Type': 'application/json'});
return this.httpClient.post(this.API_ENDPOINT+"/email",datos,{headers: headers})
}




}
