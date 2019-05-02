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

  // Guardar Escuelas
  save(escuela: Escuelas) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/escuelas', escuela, {headers: headers});
  }

  put(escuela){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/escuelas/'+escuela.idesc, escuela, {headers: headers});
  }

  delete(idesc){
    return this.httpClient.delete(this.API_ENDPOINT + '/escuelas/'+idesc);
  }
}
