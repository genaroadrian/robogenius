import { Injectable } from '@angular/core';
import { Tipomensualidad } from '../interfaces/tipomensualidad';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class TipomensualidadService {

  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Tipomensualidad[]> = new BehaviorSubject<Tipomensualidad[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getTipomensualidad(): void{
    this.httpClient.get<Tipomensualidad[]>(this.API_ENDPOINT + '/tipomensualidad').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/tipomensualidad/'+data.idtmen,data,{headers: headers});
  }

  get data(): Tipomensualidad[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (tipomensualidad: Tipomensualidad): void {
    this.dialogData = tipomensualidad;
  }

  add(tipomensualidad: Tipomensualidad)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/tipomensualidad',tipomensualidad, {headers: headers});
  }

  updateTipomensualidad (tipomensualidad: Tipomensualidad): void {
    this.dialogData = tipomensualidad;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/tipomensualidad/'+id);
  }
}
