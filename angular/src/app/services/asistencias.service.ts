import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  asistencia(data)
  {
   return this.httpClient.post(this.API_ENDPOINT+'/asistencias', data)
  }

  historial(data)
  {
    return this.httpClient.post(this.API_ENDPOINT+'/historyasis',data)
  }

  prueba()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/pruebaAsistencias')
  }
}
