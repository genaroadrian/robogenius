import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tipopersonal} from '../interfaces/tipopersonal';

@Injectable({
  providedIn: 'root'
})
export class TipopersonalService {
  API_ENDPOIINT = 'http://localhost:8000/api';
  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.API_ENDPOIINT+'/tipopersonal');
  }
}

