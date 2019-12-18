import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Codigos } from '../interfaces/codigos';
import {globalVar} from './global.service'


@Injectable({
  providedIn: 'root'
})
export class CodigosService {

  

  API_ENDPOINT = globalVar.url
  dataChange: BehaviorSubject<Codigos[]> = new BehaviorSubject<Codigos[]>([]);

  dialogData: any;

  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }


  getcodigoss(): void{
    this.httpClient.get<Codigos[]>(this.API_ENDPOINT + '/codigos').subscribe(data => {
 this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
  ado (cod: Codigos): void {
    this.dialogData = cod;
  }
  ade(cod: Codigos)
  {
    console.log(cod);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/codigos/',cod, {headers: headers});
  }
  updatecodigos (codigos: Codigos): void {
    this.dialogData = codigos;
  }
  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/codigos/'+data.id,data,{headers: headers});
  }
  get data(): Codigos[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  deletecod (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/codigos/'+id);
  }
 
}
