import { Injectable } from '@angular/core';
import { Escuelas } from '../interfaces/escuelas';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class EscuelasService {

  /* Ruta de laravel */
  // API_ENDPOINT = this.globalService.varGlobal.
    API_ENDPOINT = globalVar.url


  /* Detector de cambios en los datos */
  dataChange: BehaviorSubject<Escuelas[]> = new BehaviorSubject<Escuelas[]>([]);
  // dataChange: BehaviorSubject<Escuelas[]> = new BehaviorSubject<Escuelas[]>([]);

  // Datos termporales que se recibiran desde los modales 
  dialogData: any;
  dialogMembresia: any

  sucursal:any;
  datos:any;
  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
   }

 
  /* Obtiene la información de la tabla  */
  getEscuelas(): void{
    this.httpClient.get<Escuelas[]>(this.API_ENDPOINT + '/escuelas').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idscu==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);
      },
    (error) => {
    console.log (error.name );
    });
  }

  addMem(data)
  {
    this.dialogMembresia = data
  }

  get()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/escuelas')
  }

  /* Actualiza a la base de datos  */
  put(data){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/escuelas/'+data.idesc,data,{headers: headers});
  }

  /* Obtinene la variable y detecta cambios */
  get data(): Escuelas[] {
    return this.dataChange.value;
  }

  /* Retorna la variable con los datos ya obtenidos de los modales */
  getDialogData() {
    return this.dialogData;
  }

  getMembresiaData()
  {
    return this.dialogMembresia
  }


  /* Metodo que recibe los datos del formulario y los guarda en la variable dialogData */
  addEscuela (escuelas: Escuelas): void {
    this.dialogData = escuelas
  }

  /* Guarda los datos en la base */
  add(escuelas: Escuelas)
  {
    console.log(escuelas);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/escuelas/',escuelas, {headers: headers});
  }

  /* Obtiene los datos de el modal de editar y los gurada en la variable  */
  putEscuela(data)
  {
    this.dialogData = data;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/escuelas/'+id);
  }
}
