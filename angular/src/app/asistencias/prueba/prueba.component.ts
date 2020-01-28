import { Component, OnInit } from "@angular/core";
import { AsistenciasService } from "src/app/services/asistencias.service";
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: "app-prueba",
  templateUrl: "./prueba.component.html",
  styleUrls: ["./prueba.component.css"]
})
export class PruebaComponent implements OnInit {
  allRows: any;
  alumnos: any;
  fechas: any;
  tabla = [];
  pagos: any;
  total: number 
  month: any
  data: any

  constructor(public service: AsistenciasService, public escuelasService: EscuelasService) {}

  ngOnInit() {
    this.data = this.escuelasService.getDialogData()
    this.fetchAll()
  }

  async fetchAll()
  {

    this.month = new Date()
      let d = await this.service.prueba(this.data).toPromise()
      this.allRows = d[0];
      this.pagos = d[1];
      let m = d[2]
      console.log(this.pagos)

      var hash = {};
      this.alumnos = this.allRows.filter(function(tem) {
        var exists = !hash[tem.idalu] || false;
        hash[tem.idalu] = true;
        return exists;
      });

      this.fechas = this.allRows.filter(function(tem) {
        var exists = !hash[tem.fecha] || false;
        hash[tem.fecha] = true;
        return exists;
      });

      let totalClases = this.fechas.length
      let total = 0
      this.alumnos.forEach((a, b, c) => {
        this.pagos.forEach(element => {
          if (element.idalu == a.idalu) {
            a.pm = element.pm;
           if(element.pm >=  Math.trunc(totalClases/2))
           {
             if(element.pm == 0 )
             {
               element.pm = 1
             }
            a.t =  Number(m.costo)
            total = total +  Number(m.costo)
           } else{
             a.t = 0
           }
          }
        });
      });
      this.total = total
  }

  refresh() {
    this.ngOnInit();
  }
}
