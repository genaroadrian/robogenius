import { Injectable } from '@angular/core';
import { Padres } from '../interfaces/padres';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PadresService {

  // URL de laravel
  API_ENDPOINT = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Padres[]> = new BehaviorSubject<Padres[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  // Obtener los datos de la base 
  getPadres(): void
  {
    this.httpClient.get<Padres[]>(this.API_ENDPOINT+'/padres').subscribe(data=> {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) =>{
      console.log (error.name+''+error.message);
    });
  }

  get data(): Padres[]
  {
    return this.dataChange.value;
  }

  get()
  {
    return this.httpClient.get(this.API_ENDPOINT+'/personal');
  }

}
