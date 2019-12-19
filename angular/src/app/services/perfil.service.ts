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

  nHorario: any

  constructor(private httpClient: HttpClient) { }

  prueba(row)
  {
    this.datos = row;
  }

  ret()
  {
    return this.datos;
  }

  getAllHorarios()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/horarioperfilalumnos')
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

  putMem(data)
  {
    this.dialogData = data;
  }

  putPerfilHora(ngrupo)
  {
    this.ngrupo = ngrupo
  }

  nuevoPerfilHora(ngrupo)
  {
    this.nHorario = ngrupo
  }

  regresarNuevoHorario()
  {
    return this.nHorario
  }

  putHorario(id, data)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.put(this.API_ENDPOINT+"/perfilalumnoshorario/"+id, data, {headers:headers} )
  }

  getDialogData()
  {
    return this.dialogData;
  }

  getDialogHoraData()
  {
    return this.ngrupo
  }

  putMembresias(data)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/memalumno/'+data.idmalu,data, {headers:headers})
  }

  deleteHorarioPerfil(id)
  {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.delete(this.API_ENDPOINT+"/perfilalumnoshorario/"+id,{headers:headers} )
  }

  saveNuevoHorario(data)
  {
    this.dialogData = data
  }

  saveNHorario(data)
  {
    console.log(data)
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/horarioperfilalumnos', data, {headers: headers})
  }

}
