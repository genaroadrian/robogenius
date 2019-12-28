import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {globalVar} from '../services/global.service'


@Injectable({
  providedIn: 'root'
})
export class GraficasService {
  API_ENDPOINT = globalVar.url

  constructor(private _http:HttpClient) { 

  }

  egresos(){
    const Url = this.API_ENDPOINT +'/sumaegresos';
    var y =  this._http.get(Url)
    return y ;
  }

  ingresos(){
    const Url = this.API_ENDPOINT +'/sumaingresos';
    // return this._http.get(Url)
    var x = this._http.get(Url)
    return x;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  Semana(){
    const Url = this.API_ENDPOINT +'/semana';
    // return this._http.get(Url)
    var semana = this._http.get(Url)
    return semana;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  SemanaEgresos(){
    const Url = this.API_ENDPOINT +'/semanaegresos';
    // return this._http.get(Url)
    var semanaegresos = this._http.get(Url)
    return semanaegresos;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  mesingreso(){
    const Url = this.API_ENDPOINT +'/mesingreso';
    // return this._http.get(Url)
    var mesingreso = this._http.get(Url)
    return mesingreso;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  mesegreso(){
    const Url = this.API_ENDPOINT +'/mesegreso';
    // return this._http.get(Url)
    var mesegresos = this._http.get(Url)
    return mesegresos;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  utilidad(){
    const Url = this.API_ENDPOINT +'/utilidad';
    // return this._http.get(Url)
    var utilidad = this._http.get(Url)
    return utilidad;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  utilidadrestan(){
    const Url = this.API_ENDPOINT +'/restapendiente';
    // return this._http.get(Url)
    var restapendiente = this._http.get(Url)
    return restapendiente;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  

}
