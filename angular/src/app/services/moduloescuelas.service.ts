import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class ModuloescuelasService {

  API_ENDPOINT = globalVar.url

  constructor( private httpClient: HttpClient) { }

  getData(id)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/moduloescuelas/'+id, {headers: headers})
  }

}
