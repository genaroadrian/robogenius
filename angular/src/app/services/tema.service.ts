import { Injectable } from '@angular/core';
import { tema } from '../interfaces/tema';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<tema[]> = new BehaviorSubject<tema[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  id: number 


  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }
  //AGREGAR EN MODAL
  addd(tema)
  {
    console.log(tema);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/tema/',tema, {headers: headers});
  }


  // Obtener datos de la base de datos
  gettema(): void{
    this.httpClient.get<tema[]>(this.API_ENDPOINT+'/tema').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  // Obtener datos cuando cambien
  get data(): tema[] {
    return this.dataChange.value;
  }

  // Obtener datos de la modal de editar
  getDialogData() {
    return this.dialogData;
  }

  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/tema');
 }
  // Guardar datos
  save(tema:tema) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/tema', tema, {headers: headers});
    // console.log(tema)
  }

  /* Metodo que recibe los datos del formulario y los guarda en la variable dialogData */
  addTema (tema) {
    console.log(tema)
    this.dialogData = tema
  }

  add(tema: tema)
  {
    console.log(tema);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/tema',tema, {headers: headers});
  }


  // Actualizar los datos
  put(tema: tema){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.dialogData = tema;
    return this.httpClient.put(this.API_ENDPOINT+'/tema/'+tema.idt, tema, {headers: headers});
    
  }

  putPersonal(tema: tema)
  {
    this.dialogData = tema;
  }

  /* Obtiene el id del registro que se va a eliminar y lo guarda en la variable id */
  getId(id: number )
  {
    this.id = id
  }


  // Borrar los datos
  delete(id:number){
    return this.httpClient.delete(this.API_ENDPOINT + '/tema/'+id);
  }
}
