import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Tipomembresia } from '../interfaces/Tipomembresia';
import { BehaviorSubject } from 'rxjs';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class TipomembresiaService {

  // URL de laravel
  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Tipomembresia[]> = new BehaviorSubject<Tipomembresia[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getMemalu()
  {
    return this.httpClient.get(this.API_ENDPOINT+ '/tmembresia');
  }

  getMembresias(): void
  {
    this.httpClient.get<Tipomembresia[]>(this.API_ENDPOINT+'/tmembresia').subscribe((data)=>{
      this.dataChange.next(data)
    }, (error: HttpErrorResponse)=>{
      console.log(error.name + ' '+ error.message)
    })

    
  }

  get data(): Tipomembresia[]{
    return this.dataChange.value
  }

  addTmem(data)
  {
    this.dialogData = data
  }

  getDialogData()
  {
    return this.dialogData
  }

  add(data)
  {
    console.log(data)
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/tmembresia', data, {headers:headers})
  }

  putTmem(data)
  {
    this.dialogData = data
  }

  put(data)
  {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/tmembresia/'+data.idtmem, data ,{headers: headers})
  }

  delete(id)
  {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.delete(this.API_ENDPOINT+'/tmembresia/'+id, {headers: headers})
  }



}
