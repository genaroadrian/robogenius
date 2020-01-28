import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  API_ENDPOINT = globalVar.url

  constructor(private httpClient: HttpClient) { }

  asistencia(data)
  {
   return this.httpClient.post(this.API_ENDPOINT+'/asistencias', data)
  }

  historial(data)
  {
    return this.httpClient.post(this.API_ENDPOINT+'/historyasis',data)
  }

  prueba(data)
  {
    return this.httpClient.post(this.API_ENDPOINT+'/pruebaAsistencias', data)
  }
}
