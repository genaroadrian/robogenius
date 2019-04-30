import { Injectable } from '@angular/core';
import { Escuelas } from '../interfaces/escuelas';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscuelasService {
API_ENDPOINT = 'http://localhost:8000/api'
  constructor(private httpClient: HttpClient) { }

  get(){
   return this.httpClient.get(this.API_ENDPOINT + '/escuelas');
  }
}
