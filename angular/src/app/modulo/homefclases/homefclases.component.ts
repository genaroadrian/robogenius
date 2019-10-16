import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { NivelService } from 'src/app/services/nivel.service';
import { GradoService } from 'src/app/services/grado.service';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-homefclases',
  templateUrl: './homefclases.component.html',
  styleUrls: ['./homefclases.component.css']
})
export class HomefclasesComponent implements OnInit {

  result: any
  // vNivel:any;
  nivels:any;
  grads:any;
  folio:any;
  areacs:any;
  subareacs:any;
  persona:any;
  grado:any;
  areas:any
  temas:any;
  subtemas:any
  datos:any;
  areadelconocimiento: any;
  subareas:any;
  herramientas:any;
  filtro:any;
  letras:any;
  gradito:any;



  constructor(public homefclasesService: HomefclasesService,
    private nivelService: NivelService, private gradoService: GradoService,
     private areaService: AreadelconocimientoService,private moduloService: ModuloService) { }

  ngOnInit() {
    this.getFilter()
    this.nivelService.get().subscribe((data) => {
      // console.log(data)
      this.persona = data
    }, (error) => {
    })
    this.gradoService.get().subscribe((data) => {
      // console.log(data)
      this.grado = data
    }, (error) => {
    })
    this.get()
    this.getSubAC()
    this.getHerramientas()

    

  }
  get() {
    this.areaService.getall().subscribe((data) => {
      this.datos = data;
      // console.log(datos)
      var hash = {};
      this.areadelconocimiento = this.datos.filter(function (area) {
        var exists = !hash[area.nomarea] || false;
        hash[area.nomarea] = true;
        return exists;
      });
    })


  }

  getFilter()
  {
    this.homefclasesService.getFilt().subscribe((data)=>{
      this.result = data
      console.log(data)
    },(error)=>{
      console.log(error)
    })
  }

  applyFilter()
  {
    console.log(this.result)
    this.result  = this.result.filter(element => element.folio == this.filtro)
    console.log(this.filtro)
  }
  nivelChange(NIVEL) {
    this.nivels=NIVEL.slice(0,3);
    this.folio=this.nivels;
    this.letras=this.result
    this.letras  = this.letras.filter(element => element.folio.slice(0,3) == this.folio)
  }
  gradoChange(GRADO) {
    this.grads=GRADO.slice(0,3)
    this.folio=this.nivels+this.grads;
    this.letras=this.result
    console.log(this.letras)
    this.letras  = this.letras.filter(element => element.folio.slice(3,6) == this.folio)
    console.log(this.folio.slice(3,6))
    console.log(this.folio)
    console.log(this.letras)
    // this.folio=this.nivels+this.grads+this.areacs+this.subareacs;
  }

  gettema(AREA) {
    let datos = ""
    AREA.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
    });

    this.areacs=datos
    this.folio=this.nivels+this.grads+this.areacs+this.subareacs;
  }

  subareaChange(subarea) {
    let datos = ""
    subarea.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
       
    });

    this.subareacs=datos
    this.folio=this.nivels+this.grads+this.areacs+this.subareacs;

  }
  getSubAC() {
    this.moduloService.getSAC().subscribe((data) => {
      // console.log(data)
      this.subareas = data
    }, (error) => {

    })
  }
  getHerramientas() {
    this.moduloService.getHerra().subscribe((data) => {
      // console.log(data)
      this.herramientas = data
    }, (error) => {

    })
  }
}
