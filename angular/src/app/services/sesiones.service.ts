import { Injectable } from '@angular/core';
import { Sesiones } from '../interfaces/sesiones';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {globalVar} from '../services/global.service'

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Sesiones[]> = new BehaviorSubject<Sesiones[]>([])
  dialogData: any

  constructor(private httpClient: HttpClient) { }

  getSesiones(): void {
    this.httpClient.get<Sesiones[]>(this.API_ENDPOINT+'/sesiones').subscribe((data)=>{
      this.dataChange.next(data)
      console.log(data)
    },(error: HttpErrorResponse)=>{
      console.log(error.name + '' + error.message)
    })
  }

  get data(): Sesiones[]
    {
      return this.dataChange.value
    }

  getDialogData()
    {
      return this.dialogData
    }

  addSesion(data):void{
    this.dialogData = data
  }

  putSesion(data)
  {
    this.dialogData = data
  }

  add(data)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.httpClient.post(this.API_ENDPOINT+'/sesiones',data, {headers: headers})
  }

  put(data)
  {
    
  const headers = new HttpHeaders({'Content-Type':'application/json'})
  return this.httpClient.put(this.API_ENDPOINT+'/sesiones/'+data.idsesion, data,{headers:headers})
  }
  
  delete(id:number)
  {
    return this.httpClient.delete(this.API_ENDPOINT+'/sesiones/'+id)
  }

}
