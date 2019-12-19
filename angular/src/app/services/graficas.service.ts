import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(private _http:HttpClient) { 

  }

  egresos(){
    const Url = 'http://localhost:8000/api/sumaegresos';
    var y =  this._http.get(Url)
    return y ;
  }

  ingresos(){
    const Url = 'http://localhost:8000/api/sumaingresos';
    // return this._http.get(Url)
    var x = this._http.get(Url)
    return x;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  Semana(){
    const Url = 'http://localhost:8000/api/semana';
    // return this._http.get(Url)
    var semana = this._http.get(Url)
    return semana;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  SemanaEgresos(){
    const Url = 'http://localhost:8000/api/semanaegresos';
    // return this._http.get(Url)
    var semanaegresos = this._http.get(Url)
    return semanaegresos;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  mesingreso(){
    const Url = 'http://localhost:8000/api/mesingreso';
    // return this._http.get(Url)
    var mesingreso = this._http.get(Url)
    return mesingreso;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  mesegreso(){
    const Url = 'http://localhost:8000/api/mesegreso';
    // return this._http.get(Url)
    var mesegresos = this._http.get(Url)
    return mesegresos;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  utilidad(){
    const Url = 'http://localhost:8000/api/utilidad';
    // return this._http.get(Url)
    var utilidad = this._http.get(Url)
    return utilidad;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  utilidadrestan(){
    const Url = 'http://localhost:8000/api/restapendiente';
    // return this._http.get(Url)
    var restapendiente = this._http.get(Url)
    return restapendiente;
  // var numbers = [13,11,10];
  // return numbers;
    
  }
  

}
