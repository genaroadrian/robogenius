import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GruposAlumnos } from '../interfaces/gruposalumnos';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class GruposAlumnosService {

  // URL de laravel con xampp
  API_ENDPOINT = globalVar.url

  constructor( private httpClient: HttpClient) { }

  save(gruposAlumnos)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.post(this.API_ENDPOINT + '/horarioperfilalumnos', gruposAlumnos, {headers: headers});
  }

}
