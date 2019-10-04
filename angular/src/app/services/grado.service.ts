import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Grados } from '../interfaces/grados';


@Injectable({
  providedIn: 'root'
})
export class GradoService {
  API_ENDPOINT = 'http://localhost:8000/api';

  /* Detector de cambios en los datos */
  dataChange: BehaviorSubject<Grados[]> = new BehaviorSubject<Grados[]>([]);

  // Datos termporales que se recibiran desde los modales 
  dialogData: any;

  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }
  
  
  getgrados(): void{
    this.httpClient.get<Grados[]>(this.API_ENDPOINT + '/grados').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
   /* Actualiza a la base de datos  */
   put(data){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/grados/'+data.idg,data,{headers: headers});
  }
   /* Obtiene los datos de el modal de editar y los gurada en la variable  */
   putGrados(data)
   {
     this.dialogData = data;
   }
  get data(): Grados[] {
    return this.dataChange.value;
  }

  /* Retorna la variable con los datos ya obtenidos de los modales */
  getDialogData() {
    return this.dialogData;
  }
  deleteg(id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/grados/'+id);
  }
}
