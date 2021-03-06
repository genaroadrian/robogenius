import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horas } from '../interfaces/horas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class GethorariosService {

  // URL de laravel
  API_ENDPOINT = globalVar.url

  constructor(private httpClient: HttpClient) { }

  // Obtener los datos de la base 
  getHora(dia)
  {
    return this.httpClient.post(this.API_ENDPOINT + '/horas',dia);
  }

  getPersonal(detallegrupos)
  {
    // console.log(detallegrupos)
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT + '/horas/'+detallegrupos.idh,detallegrupos, {headers: headers});
  }
}
