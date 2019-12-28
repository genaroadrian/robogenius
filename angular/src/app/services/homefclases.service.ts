import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class HomefclasesService {
  data: any
  
  API_ENDPOINT = globalVar.url

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
