import { Injectable } from '@angular/core';
import { Horarios } from '../interfaces/horarios';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Horarios[]> = new BehaviorSubject<Horarios[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getEscuelas(): void{
    this.httpClient.get<Horarios[]>(this.API_ENDPOINT + '/horarios').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/horarios/'+data.idh,data,{headers: headers});
  }

  get data(): Horarios[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (horarios: Horarios): void {
    this.dialogData = horarios;
  }

  add(horarios: Horarios)
  {
    console.log(horarios);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/horarios/',horarios, {headers: headers});
  }

  updateEscuelas (horarios: Horarios): void {
    this.dialogData = horario;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/horarios/'+id);
  }
}