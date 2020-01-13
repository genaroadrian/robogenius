import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { NivelService } from 'src/app/services/nivel.service';
import { GradoService } from 'src/app/services/grado.service';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { ModuloService } from 'src/app/services/modulo.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DcdeleteComponent } from 'src/app/detalleclases/dcdelete/dcdelete.component';
import { isArray } from 'util';


@Component({
  selector: 'app-homefclases',
  templateUrl: './homefclases.component.html',
  styleUrls: ['./homefclases.component.css']
})
export class HomefclasesComponent implements OnInit {
  myControl = new FormControl();
  options=[];
  filteredOptions: Observable<string[]>;
  filtered: any
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
  letrass:any;
  res:any;
  resa:any;
  fil:any;
  nuevofiltro:any;
  numero:any;
  x:any;
  herr:any;
  finish:any;

  struct = 
  {
    nivel: '',
    grado: '',
    ac: [''],
    sac: [''],
    herra: ['']

  }



  constructor(public homefclasesService: HomefclasesService,
    private nivelService: NivelService, private gradoService: GradoService,
     private areaService: AreadelconocimientoService, public dialog: MatDialog ,private moduloService: ModuloService) { }

  ngOnInit() {
    this.getFilter()
    this.nivelService.get().subscribe((data) => {
      this.persona = data
    }, (error) => {
    })
    this.gradoService.get().subscribe((data) => {
      this.grado = data
    }, (error) => {
    })
    this.get()
    this.getSubAC()
    this.getHerramientas()
  }

  filter(crit)
  {
      // console.log(crit)
      this.filtered = this.filterString(crit)
      console.log(this.result)  
  }

  filterString(crit)
  {
    
    let n = this.struct.nivel.toLowerCase().slice(0,3)
    let g = this.struct.grado.toLowerCase().slice(0,3)
    let arr = this.result
    console.log(this.struct.ac)
    console.log(this.result[0].folio.slice(6))
    if(this.struct.ac[0] != '')
    {
      this.struct.ac.forEach(e => {
        // console.log
        arr = arr.filter(element=> element.folio.toLowerCase().slice(6).includes(e.toLowerCase().slice(0,3)))
      });
    }
    return arr.filter(element => element.folio.toLowerCase().slice(0,3).includes(n)
    && element.folio.toLowerCase().slice(2,6).includes(g) )
  }

  

  get() {
    this.areaService.getall().subscribe((data) => {
      this.datos = data;
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
      console.log(this.result)
    },(error)=>{
      console.log(error)
    })
  }
  
  gettema(AREA) {
    let datos = ""
    AREA.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
    });

    this.areacs=datos
    this.res=this.result
  }

  getSubAC() {
    this.moduloService.getSAC().subscribe((data) => {
      this.subareas = data
    }, (error) => {

    })
  }
  getHerramientas() {
    this.moduloService.getHerra().subscribe((data) => {
      this.herramientas = data
    }, (error) => {

    })
  }
}
