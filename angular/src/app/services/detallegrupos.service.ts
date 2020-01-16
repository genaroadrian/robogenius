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
  dialogData: any
  headers = new HttpHeaders({"Content-Type":"application/json"});

  constructor(private httpClient: HttpClient) { }

  save(detallegrupos) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/dgrupos', detallegrupos, {headers: headers});
  }

  update(detalle)
  {
    return this.httpClient.put(this.API_ENDPOINT+'/dgrupos/'+detalle.iddgru, detalle, {headers: this.headers})
  }

  add(data)
  {
    this.dialogData = data
  }

  getDialogData()
  {
    return this.dialogData
  }

  delete(id)
  {
    return this.httpClient.delete(this.API_ENDPOINT+'/dgrupos/'+id, {headers: this.headers})
  }

}
