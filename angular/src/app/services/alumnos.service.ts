import { Injectable } from '@angular/core';
import { Alumnos, InactiveStudents } from '../interfaces/alumnos';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Alumnosview } from '../interfaces/alumnosview';
import {globalVar} from '../services/global.service'

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // URL de laravel con xampp
  // API_ENDPOINT = 'http://localhost:8000/api';
  API_ENDPOINT = globalVar.url

  datos :any;
  sucursal:any;
  dataChange: BehaviorSubject<Alumnos[]> = new BehaviorSubject<Alumnos[]>([]);
  dataChangeI: BehaviorSubject<InactiveStudents[]> = new BehaviorSubject<InactiveStudents[]>([])
  // Temporarily stores data from dialogs
  dialogData: any;
  length: number

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')

  }


  // Obtener datos de la base de datos
  getAlumnos(): void{
    this.httpClient.get<Alumnos[]>(this.API_ENDPOINT+'/alumnos').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      this.length = this.datos.length
      this.dataChange.next(this.datos);     },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  lengthData()
  {
    return this.length
  }

  // Obtener datos cuando cambien
  get data(): any[] {
    return this.dataChange.value;
  }

  // get dataI(): InactiveStudents[]
  // {
  //   return this.dataChangeI.value
  // }

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
