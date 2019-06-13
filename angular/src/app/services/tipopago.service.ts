import { Injectable } from '@angular/core';
import { Tipopago } from '../interfaces/tipopago';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Tipopago[]> = new BehaviorSubject<Tipopago[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getTipopago(): void{
    this.httpClient.get<Tipopago[]>(this.API_ENDPOINT + '/tipopago').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/tipopago/'+data.idtipopago,data,{headers: headers});
  }

  get data(): Tipopago[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (tipopago: Tipopago): void {
    this.dialogData = tipopago;
  }

  add(tipopago: Tipopago)
  {
    console.log(tipopago);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/tipopago/',tipopago, {headers: headers});
  }

  updateTipopago (tipopago: Tipopago): void {
    this.dialogData = tipopago;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/tipopago/'+id);
  }
}
