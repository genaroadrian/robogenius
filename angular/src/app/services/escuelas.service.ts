import { Injectable } from '@angular/core';
import { Escuelas } from '../interfaces/escuelas';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscuelasService {

  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Escuelas[]> = new BehaviorSubject<Escuelas[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getEscuelas(): void{
    this.httpClient.get<Escuelas[]>(this.API_ENDPOINT + '/escuelas').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/escuelas/'+data.idesc,data,{headers: headers});
  }

  get data(): Escuelas[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (escuelas: Escuelas): void {
    this.dialogData = escuelas;
  }

  add(escuelas: Escuelas)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/escuelas/'+escuelas, {headers: headers});
  }

  updateEscuelas (escuelas: Escuelas): void {
    this.dialogData = escuelas;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/escuelas/'+id);
  }
}
