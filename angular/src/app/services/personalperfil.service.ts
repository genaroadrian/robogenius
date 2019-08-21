import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalperfilService {


  /* Datos recibidos por el personal home */
  datos: any

  constructor() { }

  perfil(row)
  {
    this.datos = row
  }

  returnPerfil()
  {
    return this.datos
  }
}
