import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipomembresiaService {

  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  getMemalu()
  {
    return this.httpClient.get(this.API_ENDPOINT+ '/tmembresia');
  }

}
