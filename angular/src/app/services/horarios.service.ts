import { Injectable } from '@angular/core';
import { Horario } from '../interfaces/horario';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class HorariosService {



  sucursal:any;
  datos:any;
  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Horario[]> = new BehaviorSubject<Horario[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')

   }

   getHora()
   {
     return this.httpClient.get(this.API_ENDPOINT+'/horarios')
   }

  getHorarios(): void{
    this.httpClient.get<Horario[]>(this.API_ENDPOINT + '/horarios').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // // console.log(this.datos)
      this.dataChange.next(this.datos);       },
    (error: HttpErrorResponse) => {
    // // console.log (error.name + ' ' + error.message);
    });
  }

  put(data){
    // // console.log(data);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/horarios/'+data.idh,data,{headers: headers});
  }

  get data(): Horario[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  // DEMO ONLY, you can find working methods below
  addIssue (horario: Horario): void {
    this.dialogData = horario;
  }

  add(horario: Horario)
  {
    // console.log(horario);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/horarios',horario, {headers: headers});
  }

  updateHorarios (horario: Horario): void {
    this.dialogData = horario;
  }

  /* Obtiene los datos de el modal de editar y los gurada en la variable  */
  putEscuela(data)
  {
    this.dialogData = data;
  }

  deleteIssue (id: number): void {
    // // console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/horarios/'+id);
  }
}