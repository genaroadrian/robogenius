import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomefclasesService } from 'src/app/services/homefclases.service';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent implements OnInit {

  detalleClases: any
  folio: string
  planeaciones: any
  sesiones: any

  // tabs es la variable para pintar las tabs
  tabs = ['Clase 1', 'Clase 2', 'Clase 3'];
    selected = new FormControl(0);


  constructor(public homefclasesService: HomefclasesService) { }

  ngOnInit() {
    this.getData()
  }

  getData()
  {
    this.homefclasesService.getDataSesion(this.homefclasesService.returnData()).subscribe((data)=>{
      // console.log(data)
      let datos: any
      datos = data
      this.detalleClases = datos[0]
      this.folio = this.detalleClases[0].folio
      this.planeaciones = datos[1]
      this.planeaciones = this.planeaciones[0]
      console.log(this.planeaciones)
      this.sesiones = datos[2]
      // console.log(this.detalleClases)
      /* console.log(this.planeaciones)
      console.log(this.sesiones) */

    })
  }

}
