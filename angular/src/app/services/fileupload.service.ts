import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  API_ENDPOINT = 'http://localhost:8000/';
  // API_ENDPOINT = 'http://localhost/PruebasAngular/';
  API_ENDPOINTS = 'http://localhost:8000/api/fotosalumnos/';

  constructor(private http:HttpClient) { }


  uploadFile(archivo) {
    return this.http.post(`${this.API_ENDPOINT}prueba.php`, JSON.stringify(archivo));
  }


  subirimagen(alumnofoto)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.put(this.API_ENDPOINTS+ alumnofoto.idalu, alumnofoto, {headers: headers})
  }
}
