import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'
import {globalVarimg} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  API_ENDPOINT = globalVarimg.url

  API_ENDPOINTS = globalVar.url+'/fotosalumnos/';

  API_ENDPOINTSADMIN = globalVar.url+'/fotosadmin/';

  API_ENDPOINTSPERSONAL = globalVar.url+'/fotospersonal/';


  constructor(private http:HttpClient) { }


  uploadFile(archivo) {
    
    return this.http.post(`${this.API_ENDPOINT}/prueba.php`, JSON.stringify(archivo));
  }


  subirimagen(alumnofoto)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.put(this.API_ENDPOINTS+ alumnofoto.idalu, alumnofoto, {headers: headers})
  }

  uploadFileAdmin(archivo) {
    return this.http.post(`${this.API_ENDPOINT}/usuario.php`, JSON.stringify(archivo));
  }


  subirimagenAdmin(adminfoto)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.put(this.API_ENDPOINTSADMIN+ adminfoto.id, adminfoto, {headers: headers})
  }

  uploadFilePersonal(archivo) {
    return this.http.post(`${this.API_ENDPOINT}/personal.php`, JSON.stringify(archivo));
  }


  subirimagenPersonal(personal)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.put(this.API_ENDPOINTSPERSONAL+ personal.idper, personal, {headers: headers})
    // console.log(personal)
  }
}
