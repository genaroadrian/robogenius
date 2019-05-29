import { Component, OnInit } from '@angular/core';
import { Padres } from 'src/app/interfaces/padres';

@Component({
  selector: 'app-padhome',
  templateUrl: './padhome.component.html',
  styleUrls: ['./padhome.component.css']
})
export class PadhomeComponent implements OnInit {

  // Columnas que se van a mostrar en la tabla
  displayedColumns: string[]= [
    'idpadres',
    'nombrepad',
    'apellidospad',
    'domiciliopad',
    'telefonopad',
    'correopad',
    'ocupacionpad',
    'nombrepmad',
    'apellidospmad',
    'domiciliopmad',
    'telefonopmad',
    'correopmad',
    'ocupacionpmad',
    'usuario',
    'contra'
  ];

  // Declaracion de la interfaz de padres
  padres: Padres[];

  // Declaracion de el servicio de padres
  

  constructor() { }

  ngOnInit() {
  }

}
