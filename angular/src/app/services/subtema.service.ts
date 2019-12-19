import { Injectable } from '@angular/core';
import { subtema } from '../interfaces/subtema';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtemaService {

  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<subtema[]> = new BehaviorSubject<subtema[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  id: number 

  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }
  // Obtener datos de la base de datos
  getsubtema(): void{
    this.httpClient.get<subtema[]>(this.API_ENDPOINT+'/subtema').subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  // Obtener datos cuando cambien
  get data(): subtema[] {
    return this.dataChange.value;
  }

  // Obtener datos de la modal de editar
  getDialogData() {
    return this.dialogData;
  }

  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/subtema');
 }
  // Guardar datos
  save(subtemas: subtema) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/subtema', subtemas, {headers: headers});
  }

    /* Metodo que recibe los datos del formulario y los guarda en la variable dialogData */
    addTema (subtema: subtema): void {
      this.dialogData = subtema
    }
  add(subtema: subtema)
  {
    console.log(subtema);
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/subtema',subtema, {headers: headers});
  }

  // Actualizar los datos
  put(subtemas: subtema){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.dialogData = subtemas;
    return this.httpClient.put(this.API_ENDPOINT+'/subtema/'+subtemas.ids, subtemas, {headers: headers});
    
  }

  putsubtema(subtemas: subtema)
  {
    this.dialogData = subtemas;
  }

  /* Obtiene el id del registro que se va a eliminar y lo guarda en la variable id */
  getId(id: number )
  {
    this.id = id
  }


  // Borrar los datos
  delete(id:number){
    return this.httpClient.delete(this.API_ENDPOINT + '/subtema/'+id);
  }
}
