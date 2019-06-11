import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horas } from '../interfaces/horas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GethorariosService {

  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  // Obtener los datos de la base 
  getHora(dia)
  {
    return this.httpClient.post(this.API_ENDPOINT + '/horas',dia);
  }
}
