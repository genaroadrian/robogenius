import { Component, OnInit } from '@angular/core';
import { AsistenciasService } from 'src/app/services/asistencias.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  allRows: any 
  alumnos: any
  fechas: any
  tabla = []
  pagos: any

  constructor(public service: AsistenciasService) { }

  ngOnInit() {
    this.service.prueba().subscribe((data)=>{
      let d = data
      this.allRows = d[0]
      this.pagos = d[1]
    var hash = {};
    this.alumnos = this.allRows.filter(function (tem) {
      var exists = !hash[tem.idalu] || false;
      hash[tem.idalu] = true;
      return exists;
    })

    this.fechas = this.allRows.filter(function (tem) {
      var exists = !hash[tem.fecha] || false;
      hash[tem.fecha] = true;
      return exists;
    })

    // console.log(this.alumnos)

    })
  }

  refresh()
  {
    this.ngOnInit()
  }

}