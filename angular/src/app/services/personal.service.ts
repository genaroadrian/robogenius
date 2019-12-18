import { Injectable } from '@angular/core';
import { Personal } from '../interfaces/personal';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Subscriber} from 'rxjs';
import {globalVar} from './global.service'

@Injectable({
  providedIn: 'root'
})
export class PersonalService {


    
  // URL de laravel
  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Personal[]> = new BehaviorSubject<Personal[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  id: number 

  datos :any;
  sucursal:any;
  noResult: string

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }

    
  // Obtener datos de la base de datos
  getPersonal(): void{
    this.httpClient.get<Personal[]>(this.API_ENDPOINT+'/personal').subscribe(data => {
      this.datos=data
      if(this.datos.length > 0)
      {
        let value = 'none'
        this.noResult = value
      }
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos); 
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  noR()
  {
    return this.noResult
  }

  getMaestros()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/getMaestros')
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

  /* Recupera todos los horarios para la alta de personal */
  getHorarios()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/horarios')
  }

  getDias()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/dias')
  }

  getHorario()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/getdias_horas')
  }


  
}

