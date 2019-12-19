import { Injectable } from '@angular/core';
import { Memalumnos } from '../interfaces/memalumno';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemalumnoService {
  // URL de laravel con xampp
  API_ENDPOINT = 'http://localhost:8000/api';
  constructor(private httpClient: HttpClient) {

  }

  save(malu: Memalumnos) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post(this.API_ENDPOINT + '/memalumno', malu, { headers: headers });
  }
}
