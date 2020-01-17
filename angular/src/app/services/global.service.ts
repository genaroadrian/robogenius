import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
 
}

export const globalVar = {
  url:'http://ec2-3-15-179-25.us-east-2.compute.amazonaws.com:8080/api'
}

// ruta sin api para imagenes de perfil
export const globalVarimg = {
  url:'http://localhost:8000'
}

export const spinner = 'loader.gif'

export const noResults = 'no_results.png'