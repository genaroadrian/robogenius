import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  // URL de laravel con xampp
  API_ENDPOINT = 'http://localhost:8000/api';
  dialogData: any;
  
  ngrupo: any;

  datos: any;
  membresia: any;
  horarios: any;

  constructor(private httpClient: HttpClient) { }

  prueba(row)
  {
    this.datos = row;
  }

  ret()
  {
    return this.datos;
  }

  getmem(datos)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    this.membresia = this.httpClient.post(this.API_ENDPOINT + '/malu',datos, {headers: headers});
    return this.membresia;
  }
  
  gethorario(datos)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    this.horarios = this.httpClient.put(this.API_ENDPOINT+ '/malu/'+ datos.idalu, datos, {headers: headers})
    return this.horarios;
  }

  putAlumno(data)
  {
    this.dialogData = data;
  }

  putPerfilHora(ngrupo)
  {
    this.ngrupo = ngrupo
  }

  getDialogData()
  {
    console.log(this.dialogData)
    return this.dialogData;
  }

  getDialogHoraData()
  {
    return this.ngrupo
  }


}
