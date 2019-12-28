import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Detallegrupos } from '../interfaces/detallegrupos';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class DetallegruposService {
  // Ruta de laravel
  API_ENDPOINT = globalVar.url

  constructor(private httpClient: HttpClient) { }

  save(detallegrupos: Detallegrupos) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/dgrupos', detallegrupos, {headers: headers});
  }
}
