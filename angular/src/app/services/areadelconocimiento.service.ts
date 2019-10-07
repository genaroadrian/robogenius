import { Injectable } from '@angular/core';
import { areadelconocimiento } from '../interfaces/areadelconocimiento';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreadelconocimientoService {

   // URL de laravel
   API_ENDPOINT = 'http://localhost:8000/api';

   dataChange: BehaviorSubject<areadelconocimiento[]> = new BehaviorSubject<areadelconocimiento[]>([]);
 
   // Temporarily stores data from dialogs
   dialogData: any;
 
   id: number 
 
 
   datos :any;
   sucursal:any;
 
   constructor(private httpClient: HttpClient) {
     this.sucursal=localStorage.getItem('sucursal')
   }
 
   // Obtener datos de la base de datos
   getareadelconocimiento(): void{
     this.httpClient.get<areadelconocimiento[]>(this.API_ENDPOINT+'/areadelconocimiento').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);     },
     (error: HttpErrorResponse) => {
     console.log (error.name + ' ' + error.message);
     });
   }
 
   // Obtener datos cuando cambien
   get data(): areadelconocimiento[] {
     return this.dataChange.value;
   }

  // DEMO ONLY, you can find working methods below
  addIssue (areadelconocimiento: areadelconocimiento): void {
    this.dialogData = areadelconocimiento;
  }

   // Obtener datos de la modal de editar
   getDialogData() {
     return this.dialogData;
   }
 
   // Obtener los datos de Laravel
   get() {
     return this.httpClient.get(this.API_ENDPOINT + '/areadelconocimiento');
  }
   // Guardar datos
   save(areadelconocimiento: areadelconocimiento) {
     const headers = new HttpHeaders({"Content-Type":"application/json"});
     return this.httpClient.post(this.API_ENDPOINT+'/areadelconocimiento', areadelconocimiento, {headers: headers});
   }
 
   // Actualizar los datos
   put(areadelconocimiento: areadelconocimiento){
     const headers = new HttpHeaders({"Content-Type":"application/json"});
     this.dialogData = areadelconocimiento;
     return this.httpClient.put(this.API_ENDPOINT+'/areadelconocimiento/'+areadelconocimiento.idac, areadelconocimiento, {headers: headers});
     
   }
 
   putPersonal(areadelconocimiento: areadelconocimiento)
   {
     this.dialogData = areadelconocimiento;
   }
 
   /* Obtiene el id del registro que se va a eliminar y lo guarda en la variable id */
   getId(id: number )
   {
     this.id = id
   }
   getall(){
    return this.httpClient.get(this.API_ENDPOINT + '/clases/');
   }
 
 
   // Borrar los datos
   delete(id:number){
     return this.httpClient.delete(this.API_ENDPOINT + '/areadelconocimiento/'+id);
   }
   addd(area: AreadelconocimientoService)
   {
     console.log(area);
     const headers = new HttpHeaders( {'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + '/areadelconocimiento/',area, {headers: headers});
   }
}
