import { Injectable } from '@angular/core';
import { Personal } from '../interfaces/personal';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Personal[]> = new BehaviorSubject<Personal[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  

  getPersonal(): void{
    this.httpClient.get<Personal[]>(this.API_ENDPOINT+'/personal').subscribe(data => {
      this.dataChange.next(data);
      console.log(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

  get data(): Personal[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }




  // Obtener los datos de Laravel
  get() {
    return this.httpClient.get(this.API_ENDPOINT + '/personal');
 }
  // Guardar personal
  save(persona: Personal) {
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post(this.API_ENDPOINT+'/personal', persona, {headers: headers});
  }

  put(persona){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.put(this.API_ENDPOINT+'/personal/'+persona.idper, persona, {headers: headers});
  }

  delete(idper){
    return this.httpClient.delete(this.API_ENDPOINT + '/personal/'+idper);
  } 
}
