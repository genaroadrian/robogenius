import { Injectable } from '@angular/core';
import { Alumnos } from '../interfaces/alumnos';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // URL de laravel con xampp
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Alumnos[]> = new BehaviorSubject<Alumnos[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  // Obtener datos de la base de datos
  getAlumnos(): void{
    this.httpClient.get<Alumnos[]>(this.API_ENDPOINT+'/alumnos').subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  // Obtener datos cuando cambien
  get data(): Alumnos[] {
    return this.dataChange.value;
  }

  // Obtener datos de la modal de editar
  getDialogData() {
    return this.dialogData;
  }

  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/alumnos');
 }
  // Guardar datos
  save(alumno: Alumnos) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/alumnos', alumno, {headers: headers});
  }

  // Actualizar los datos
  put(alumno: Alumnos){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.dialogData = alumno;
    return this.httpClient.put(this.API_ENDPOINT+'/alumnos/'+alumno.idalu, alumno, {headers: headers});
    
  }

  // Borrar los datos
  delete(id:number){
    return this.httpClient.delete(this.API_ENDPOINT + '/alumnos/'+id);
  }
  
}
