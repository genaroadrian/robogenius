import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  geta() {
    return this.httpClient.get(this.API_ENDPOINT + '/areadelconocimiento');
  }
  gett() {
    return this.httpClient.get(this.API_ENDPOINT + '/tema');
  }
  gets() {
    return this.httpClient.get(this.API_ENDPOINT + '/subtema');
  }

  getSAC()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/subareac')
  }

  getHerra()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/herramientas')
    return this.httpClient.get(this.API_ENDPOINT+'/herramientas')
  }

}
