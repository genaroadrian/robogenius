import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Tipopersonal} from '../interfaces/tipopersonal';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipopersonalService {
  API_ENDPOIINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Tipopersonal[]> = new BehaviorSubject<Tipopersonal[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  sucursal:any;
  datos :any;


  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')

   }

  /* Obtener los tipos de personal para el select de agregar y editar personal */
  get()
  {
    return this.httpClient.get(this.API_ENDPOIINT+'/tipopersonal')
  }

  getTipopersonal(): void{
    this.httpClient.get<Tipopersonal[]>(this.API_ENDPOIINT+'/tipopersonal').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      this.dataChange.next(this.datos);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
    /* Guarda los datos en la base */
    add(tipopersonal: Tipopersonal)
    {
      console.log(tipopersonal);
      const headers = new HttpHeaders( {'Content-Type': 'application/json'});
      return this.httpClient.post(this.API_ENDPOIINT + '/tipopersonal/',tipopersonal, {headers: headers});
    }


  put(data){
    console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOIINT+'/tipopersonal/'+data.idtper,data,{headers: headers});
  }

  get data(): Tipopersonal[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (tipoPersonal: Tipopersonal): void {
    this.dialogData = tipoPersonal;
  }

  updateTipopersonal (tipoPersonal: Tipopersonal): void {
    this.dialogData = tipoPersonal;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOIINT + '/tipopersonal/'+id);
  }
}

