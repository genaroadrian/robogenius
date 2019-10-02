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

}
