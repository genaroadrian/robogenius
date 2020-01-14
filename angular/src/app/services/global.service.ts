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

// ruta sin api para imagenes de perfil
export const globalVarimg = {
  url:'http://localhost:8000'
}

export const spinner = 'loader.gif'

export const noResults = 'no_results.png'