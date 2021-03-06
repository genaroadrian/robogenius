import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Subareac } from '../interfaces/subareac';
import {globalVar} from '../services/global.service'

@Injectable({
  providedIn: 'root'
})
export class SubareacService {

  API_ENDPOINT = globalVar.url

  dataChange: BehaviorSubject<Subareac[]> = new BehaviorSubject<Subareac[]>([])

  dialogData: any

  datos :any;
  sucursal:any;

  constructor(private httpClient: HttpClient) {
    this.sucursal=localStorage.getItem('sucursal')
  }

  getSubareas(): void{
    this.httpClient.get<Subareac[]>(this.API_ENDPOINT+'/subareac').subscribe(data=>{
      this.datos=data
      this.datos=this.datos.filter(data=>data.idsuc==this.sucursal);
      // // console.log(this.datos)
      this.dataChange.next(this.datos);    },(error: HttpErrorResponse)=>{
      // console.log(error.name + '' + error.message)
    })
  }

  get data(): Subareac[]
  {
    return this.dataChange.value
  }

  getDialogData()
  {
    return this.dialogData
  }

  addSubac (data): void {
    this.dialogData = data
  }

  putSubac (data)
  {
    this.dialogData = data
  }

  deleteSubac (id): void
  {

  }

  add(data)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/subareac', data, {headers: headers})
  }

  put(data)
  {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/subareac/'+data.idsac,data, {headers:headers})
  }

  detele(id: number)
  {
    return this.httpClient.delete(this.API_ENDPOINT+'/subareac/'+id)
  }
}
