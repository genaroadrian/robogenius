import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from '../services/global.service'

@Injectable({
  providedIn: 'root'
})
export class PmembresiaService {

  API_ENDPOINT = globalVar.url
  datos:any
  constructor(private httpClient: HttpClient) { }
  

  getHorarios(){
  return this.httpClient.get(this.API_ENDPOINT + '/pmem');
  }

}
