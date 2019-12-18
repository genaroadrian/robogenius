import { Injectable } from '@angular/core';
import { categorias } from '../interfaces/categorias';
import { contabilidad } from '../interfaces/contabilidad';
import { total } from '../interfaces/total';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {globalVar} from './global.service'


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  dialogData: any;


  constructor(private http:HttpClient){}
  

  Url =  globalVar.url+'/categorias';

  Urls =  globalVar.url+'/ingresos';

  Urle =  globalVar.url+'/egresos';

  Urlaa =  globalVar.url+'/sumaingresos';

  Urlbb =  globalVar.url+'/sumaegresos';

  Urlpendiente =  globalVar.url+'/api/pendiente';

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

  API_ENDPOINT = globalVar.url

  save(total: categorias) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/categorias', total, {headers: headers});
  }


  saves(contabilidad: contabilidad) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/contabilidad', contabilidad, {headers: headers});
  }

put(cont: contabilidad){
  const headers = new HttpHeaders({"Content-Type":"application/json"});
  this.dialogData = cont;
  return this.http.put(this.API_ENDPOINT+'/contabilidad/'+cont.idCon, cont, {headers: headers});
  
}
}