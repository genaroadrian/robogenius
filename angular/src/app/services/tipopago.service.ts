import { Injectable } from '@angular/core';
import { Tipopago } from '../interfaces/tipopago';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  /* Ruta de laravel */
  API_ENDPOINT = globalVar.url

  /* Detector de cambios */
  dataChange: BehaviorSubject<Tipopago[]> = new BehaviorSubject<Tipopago[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getTipopago(): void{
    this.httpClient.get<Tipopago[]>(this.API_ENDPOINT + '/tipopago').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    });
  }

  

  get data(): Tipopago[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addTpago (tipopago: Tipopago): void {
    this.dialogData = tipopago
  }

  add(tipopago: Tipopago)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/tipopago/',tipopago, {headers: headers});
  }

  updateTpago (tipopago: Tipopago): void {
    this.dialogData = tipopago;
  }

  put(data){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/tipopago/'+data.idtipopago,data,{headers: headers});
  }

  deleteIssue (id: number): void {
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/tipopago/'+id);
  }
}
