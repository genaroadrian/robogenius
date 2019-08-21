import { Injectable } from '@angular/core';
import { Personal } from '../interfaces/personal';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Personal[]> = new BehaviorSubject<Personal[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  id: number 

  constructor(private httpClient: HttpClient) {}

  // Obtener datos de la base de datos
  getPersonal(): void{
    this.httpClient.get<Personal[]>(this.API_ENDPOINT+'/personal').subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  // Obtener datos cuando cambien
  get data(): Personal[] {
    return this.dataChange.value;
  }

  // Obtener datos de la modal de editar
  getDialogData() {
    return this.dialogData;
  }

  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/personal');
 }
  // Guardar datos
  save(persona: Personal) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/personal', persona, {headers: headers});
  }

  // Actualizar los datos
  put(persona: Personal){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.dialogData = persona;
    return this.httpClient.put(this.API_ENDPOINT+'/personal/'+persona.idper, persona, {headers: headers});
    
  }

  putPersonal(persona: Personal)
  {
    this.dialogData = persona;
  }

  /* Obtiene el id del registro que se va a eliminar y lo guarda en la variable id */
  getId(id: number )
  {
    this.id = id
  }


  // Borrar los datos
  delete(id:number){
    return this.httpClient.delete(this.API_ENDPOINT + '/personal/'+id);
  }
  
}

