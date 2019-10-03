import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Subareac } from '../interfaces/subareac';

@Injectable({
  providedIn: 'root'
})
export class SubareacService {

  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Subareac[]> = new BehaviorSubject<Subareac[]>([])

  dialogData: any

  constructor(private httpClient: HttpClient) { }

  getSubareas(): void{
    this.httpClient.get<Subareac[]>(this.API_ENDPOINT+'/subareac').subscribe(data=>{
     this.dataChange.next(data)
    },(error: HttpErrorResponse)=>{
      console.log(error.name + '' + error.message)
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
