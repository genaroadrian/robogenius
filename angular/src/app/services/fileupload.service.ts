import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  API_ENDPOINT = 'http://localhost/PruebasAngular/';


  constructor(private http:HttpClient) { }


  uploadFile(archivo) {
    return this.http.post(`${this.API_ENDPOINT}subirArchivo.php`, JSON.stringify(archivo));
  }
}
