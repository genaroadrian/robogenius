import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Niveles } from '../interfaces/niveles';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  API_ENDPOINT = 'http://localhost:8000/api';
  dataChange: BehaviorSubject<Niveles[]> = new BehaviorSubject<Niveles[]>([]);
  dialogData: any;
  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }


  getNivel(): void{
    this.httpClient.get<Niveles[]>(this.API_ENDPOINT + '/nivel').subscribe(data => {
 this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // console.log(this.datos)
      this.dataChange.next(this.datos);      },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
  get data(): Niveles[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
   /* Metodo que recibe los datos del formulario y los guarda en la variable dialogData */
   addniveles (niveles: Niveles): void {
    this.dialogData = niveles
  }

   agregar(niveles: Niveles){
     console.log(niveles);
     const headers=new HttpHeaders( {'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT+ '/nivel/', niveles, {headers:headers});

   }
   putnivel(data)
   {
     this.dialogData = data;
   }
   put(data){
    console.log(data)
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT +'/nivel/'+data.idn,data,{headers: headers});
  }
  deleten (id: number): void {
    console.log(id);
  }

  delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/nivel/'+id);
  }
}
