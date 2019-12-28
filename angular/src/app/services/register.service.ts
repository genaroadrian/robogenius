import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }


  API_ENDPOINT = globalVar.url

  save(login: Login) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/login', login, {headers: headers});
  }
}
