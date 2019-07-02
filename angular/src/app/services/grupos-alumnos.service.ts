import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GruposAlumnos } from '../interfaces/gruposalumnos';

@Injectable({
  providedIn: 'root'
})
export class GruposAlumnosService {

  // URL de laravel con xampp
  API_ENDPOINT = 'http://localhost:8000/api';

  constructor( private httpClient: HttpClient) { }

  save(gruposAlumnos : GruposAlumnos)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.post(this.API_ENDPOINT + '/galumnos', gruposAlumnos, {headers: headers});
  }

}
