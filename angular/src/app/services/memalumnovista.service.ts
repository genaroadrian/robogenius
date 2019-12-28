import { Injectable } from '@angular/core';
import { Memalumno } from '../interfaces/memalumno';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from '../services/global.service'



@Injectable({
  providedIn: 'root'
})
export class MemalumnovistaService {

  // URL de laravel
  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Memalumno[]> = new BehaviorSubject<Memalumno[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  
  // Obtener datos de la base de datos
  getMemalumno(): void{
    this.httpClient.get<Memalumno[]>(this.API_ENDPOINT+'/memalumnovista').subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  // Obtener datos cuando cambien
  get data(): Memalumno[] {
    return this.dataChange.value;
  }

  // Obtener datos de la modal de editar
  getDialogData() {
    return this.dialogData;
  }

  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/memalumnovista');
 }
 
}
