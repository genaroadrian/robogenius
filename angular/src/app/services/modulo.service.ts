import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  API_ENDPOINT = 'http://localhost:8000/api';

  dialogData: any

  constructor(private httpClient: HttpClient) { }

  geta() {
    return this.httpClient.get(this.API_ENDPOINT + '/areadelconocimiento');
  }
  gett() {
    return this.httpClient.get(this.API_ENDPOINT + '/tema');
  }
  gets() {
    return this.httpClient.get(this.API_ENDPOINT + '/subtema');
  }

  getSAC()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/subareac')
  }

  getHerra()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/herramientas')
    return this.httpClient.get(this.API_ENDPOINT+'/herramientas')
  }

  saveDClases(data)
  {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/detalleclases',data,{headers: headers})
  }

  savePlan(data)
  {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/planeaciones',data,{headers: headers})

  }

  editDC(data)
  {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/detalleclases/'+1,data)
  }

  edit(data)
  {
    this.dialogData = data
  }

  getDialogData()
  {
    return this.dialogData
  }

}
