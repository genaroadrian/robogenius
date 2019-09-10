import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  API_ENDPOINT = "http://localhost:8000/api"

  constructor(private httpClient:HttpClient) { }

  confirmToken(token)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+"/confirmtoken",token,{headers:headers})
  }

  confirmPassword(password)
  {
    console.log(password)
    console.log(password.token)
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+"/confirmtoken/"+password.token,password, {headers:headers})
  }

}
