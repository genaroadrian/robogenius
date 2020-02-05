import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  { userAdmin } from '../interfaces/userAdmin';
import { Horas } from '../interfaces/horas';
import {globalVar} from '../services/global.service'

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  API_ENDPOINT = globalVar.url
  dialogData: any;
  constructor(private httpClient: HttpClient) { 
  }
  
  getHora(dia): Observable<userAdmin[]>
  {
    return this.httpClient.post<userAdmin[]>(this.API_ENDPOINT + '/useradmin',dia);
  }

  
  /* Obtiene los datos de el modal de editar y los gurada en la variable  */
  putPerfil(data)
  {
    this.dialogData = data;
  }
 /* Retorna la variable con los datos ya obtenidos de los modales */
 getDialogData() {
  return this.dialogData;
}
put(data){
  // console.log(data)
  const headers = new HttpHeaders( {'Content-Type': 'application/json'});
  return this.httpClient.put(this.API_ENDPOINT +'/useradmin/'+data.id,data,{headers: headers});
}
  
  

// validacion() {
//   let emails = localStorage.getItem("email");
//   const headers = new HttpHeaders({"Content-Type":"application/json"});
//   return this.httpClient.post(this.API_ENDPOINT+'/useradmin',emails, {headers: headers});
//   // console.log(emails);
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
