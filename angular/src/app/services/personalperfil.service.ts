import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalperfilService {

  API_ENDPOINT = 'http://localhost:8000/api'


  /* Datos recibidos por el personal home */
  datos: any

  constructor(private httpClient: HttpClient) { }

  perfil(row)
  {
    this.datos = row
  }

  returnPerfil()
  {
    return this.datos
  }

  getGrupos(data)
  {
    console.log(data)
    return this.httpClient.post(this.API_ENDPOINT+'/perfilpersonalgrupos',data)
  }
}
