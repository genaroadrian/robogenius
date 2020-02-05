import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class PersonalperfilService {

  API_ENDPOINT = globalVar.url


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
    // console.log(data)
    return this.httpClient.post(this.API_ENDPOINT+'/perfilpersonalgrupos',data)
  }

  getListaalumnos(data)
  {
    // console.log(data)
    return this.httpClient.put(this.API_ENDPOINT+'/perfilpersonalgrupos/'+data.iddgru,data)
  }
}
