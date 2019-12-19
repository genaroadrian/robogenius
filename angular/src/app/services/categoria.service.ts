import { Injectable } from '@angular/core';
import { categorias } from '../interfaces/categorias';
import { contabilidad } from '../interfaces/contabilidad';
import { total } from '../interfaces/total';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  dialogData: any;


  constructor(private http:HttpClient){}

  Url =  'http://localhost:8000/api/categorias';

  Urls =  'http://localhost:8000/api/ingresos';

  Urle =  'http://localhost:8000/api/egresos';

  Urlaa =  'http://localhost:8000/api/sumaingresos';

  Urlbb =  'http://localhost:8000/api/sumaegresos';

  Urlpendiente =  'http://localhost:8000/api/pendiente';

  // Funcion para recuperar el json de la base de datos
  pendiente(){
    return this.http.get<contabilidad[]>(this.Urlpendiente);
  
  } 
  getPersonas(){
    return this.http.get<categorias[]>(this.Url);
  
  } 
  
  getingresos(){
    return this.http.get<contabilidad[]>(this.Urls);
  
  }
  getegresos(){
    return this.http.get<contabilidad[]>(this.Urle);
  
  }


  getsumingresos(){
    return this.http.get<contabilidad[]>(this.Urle);
  
  }
  getsumegresos(){
    return this.http.get<contabilidad[]>(this.Urle);
  
  }

  sumaingreeso(){
    return this.http.get<total[]>(this.Urlaa);
  
  }

  sumaegreso(){
    return this.http.get<total[]>(this.Urlbb);
  
  }

  API_ENDPOINT = 'http://localhost:8000/api';

  save(total: categorias) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/categorias', total, {headers: headers});
  }


  saves(contabilidad: contabilidad) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/contabilidad', contabilidad, {headers: headers});
  }
//   API_ENDPOINT = 'http://localhost:8000/api';

//   dataChange: BehaviorSubject<categorias[]> = new BehaviorSubject<categorias[]>([]);

//   dialogData: any;
//   constructor(private httpClient: HttpClient) { }

//  // Obtener datos de la base de datos
//  getAlumnos(): void{
//   this.httpClient.get<categorias[]>(this.API_ENDPOINT+'/alumnos').subscribe(data => {
//     this.dataChange.next(data);
//   },
//   (error: HttpErrorResponse) => {
//   console.log (error.name + ' ' + error.message);
//   });
// }

//   // Obtener datos cuando cambien
//   get data(): categorias[] {
//     return this.dataChange.value;
//   }

//   get() {
//     return this.httpClient.get(this.API_ENDPOINT + '/categorias');
//  }
//   // Guardar datos
//   save(categoria: categorias) {
//     const headers = new HttpHeaders({"Content-Type":"application/json"});
//     return this.httpClient.post(this.API_ENDPOINT+'/categorias', categoria, {headers: headers});
//   }

//    // Actualizar los datos
//    put(categoria: categorias){
//     const headers = new HttpHeaders({"Content-Type":"application/json"});
//     this.dialogData = categoria;
//     return this.httpClient.put(this.API_ENDPOINT+'/categorias/'+categoria.idCategoria,categoria, {headers: headers});
    
//   }

//   // Borrar los datos
//   delete(id:number){
//     return this.httpClient.delete(this.API_ENDPOINT + '/categorias/'+id);
//   }


put(cont: contabilidad){
  const headers = new HttpHeaders({"Content-Type":"application/json"});
  this.dialogData = cont;
  return this.http.put(this.API_ENDPOINT+'/contabilidad/'+cont.idCon, cont, {headers: headers});
  
}
}