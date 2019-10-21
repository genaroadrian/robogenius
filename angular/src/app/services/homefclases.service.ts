import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomefclasesService {
  data: any
  
  API_ENDPOINT = 'http://localhost:8000/api'

  constructor(public httpClient: HttpClient) { }

  getFilt()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/vistamodulo')
  }

  getData(res)
  {
    this.data = res
  }

  returnData()
  {
    return this.data
  }

  getDataSesion(data)
  {
    return this.httpClient.post(this.API_ENDPOINT+'/vistamodulo',data)
  }
  
}
