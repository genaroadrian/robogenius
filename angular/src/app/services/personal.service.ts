import { Injectable } from '@angular/core';
import { Personal } from '../interfaces/personal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  // Ruta de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}
  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/personal');
 }
  // Guardar personal
  save(persona: Personal) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/personal', persona, {headers: headers});
  }

  put(persona){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/personal/'+persona.idper, persona, {headers: headers});
  }

  delete(idper){
    return this.httpClient.delete(this.API_ENDPOINT + '/personal/'+idper);
  }
}
