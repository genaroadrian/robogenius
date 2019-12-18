import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
 
}

export const globalVar = {
  url:'http://localhost:8000/api'
}