import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Herramientas } from '../interfaces/herramientas';
import {BehaviorSubject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HerramientasService {
  
  /* Ruta de laravel */
  API_ENDPOINT = 'http://localhost:8000/api';

  /* Detector de cambios en los datos */
  dataChange: BehaviorSubject<Herramientas[]> = new BehaviorSubject<Herramientas[]>([]);
  // dataChange: BehaviorSubject<Escuelas[]> = new BehaviorSubject<Escuelas[]>([]);

  // Datos termporales que se recibiran desde los modales 
  dialogData: any;


  constructor(private httpClient: HttpClient) { }

  getHerramientas(): void{
    this.httpClient.get<Herramientas[]>(this.API_ENDPOINT + '/herramientas').subscribe(data => {
      this.dataChange.next(data);
      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
  get data(): Herramientas[] {
    return this.dataChange.value;
  }
  herramientas (herramientas: Herramientas): void {
    this.dialogData = herramientas;
  }
  herramienta(herramientas: Herramientas)
  {
    console.log(herramientas);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/herramientas/',herramientas, {headers: headers});
  }
  getDialogData() {
    return this.dialogData;
  }
  put(data){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/herramientas/'+data.idherra,data,{headers: headers});
  }

}
