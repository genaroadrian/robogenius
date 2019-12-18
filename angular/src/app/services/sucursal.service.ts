import { Injectable } from '@angular/core';
import { Sucursal } from '../interfaces/sucursal';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Sucursal[]> = new BehaviorSubject<Sucursal[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  getSucursal(): void{
    this.httpClient.get<Sucursal[]>(this.API_ENDPOINT + '/sucursal').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/sucursal/'+data.idsuc,data,{headers: headers});
  }

  get data(): Sucursal[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addSucurusal (sucursal: Sucursal): void {
    this.dialogData = sucursal;
  }

  add(sucursal: Sucursal)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/sucursal/',sucursal, {headers: headers});
  }

  updateSucursal (sucursal: Sucursal): void {
    this.dialogData = sucursal;
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/sucursal/'+id);
  }

  getfsucursal(){
    return this.httpClient.get<Sucursal[]>(this.API_ENDPOINT + '/sucursal');

  }
}
