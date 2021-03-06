import { Injectable } from '@angular/core';
import { Padres } from '../interfaces/padres';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Dias } from '../interfaces/dias';
import { Horas } from '../interfaces/horas';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class PadresService {

  // URL de laravel
  API_ENDPOINT = globalVar.url

  constructor(private httpClient: HttpClient) { }

  // Obtener los datos de la base 
  getHora(dia): Observable<Horas[]>
  {
    return this.httpClient.post<Horas[]>(this.API_ENDPOINT + '/horas',dia);
    
  }

}
