import { Component, OnInit } from "@angular/core";
import { AsistenciasService } from "src/app/services/asistencias.service";
import { EscuelasService } from 'src/app/services/escuelas.service';
import { contabilidad } from 'src/app/interfaces/contabilidad';
import { LoginService } from 'src/app/services/login.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';

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

  cont:contabilidad = {
  
    Concepto: null,
    fecha: null,
    tipo: 1,
    monto: null,
    idcate:null,
    iduser:null,
    nombre: null,
    activo: 1,
    status:null,
    adelanto:null,
    restante:null,
    suma:null,
    idscu:null,
    idsuc:null
  };
  sucursal:any
  logs:any

  constructor(public service: AsistenciasService, public escuelasService: EscuelasService,private services:LoginService,public categoriaservice: CategoriaService
    ,private router: Router) {}
  public  emai = localStorage.getItem("email");

  ngOnInit() {
    this.sucursal=localStorage.getItem('sucursal')
    this.data = this.escuelasService.getDialogData()
    console.log(this.data)
    this.fetchAll()

    this.services.getPersonas()
    .subscribe(data=>{
      this.logs=data;
      this.logs = this.logs.filter(x => x.email == this.emai)
      this.cont.iduser = this.logs[0].id
      this.cont.nombre= this.logs[0].subname
    })
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
  enviarpago(x){
    this.cont.Concepto="Membrecia de la escuela "+this.data.nombre;
    // this.cont.adelanto=
    // this.cont.idsuc=this.ge
    this.cont.idscu=this.sucursal
    this.cont.iduser
    this.cont.monto=x
    this.cont.restante=x
    this.cont.suma=0
    this.cont.tipo=1
    this.cont.activo=1;
    this.cont.idcate=28;
    this.cont.status=3;

    // console.log(this.cont)
    this.categoriaservice.saves(this.cont)
    .subscribe((data) =>{
      console.log(data);
      this.router.navigateByUrl('/estadisticas'); 
      // this.personalService.tput(this.data);
    },(error)=>{
      console.log(error);
      
    });

   
  }



}