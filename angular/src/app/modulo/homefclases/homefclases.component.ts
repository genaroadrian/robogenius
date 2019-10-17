import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { NivelService } from 'src/app/services/nivel.service';
import { GradoService } from 'src/app/services/grado.service';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { ModuloService } from 'src/app/services/modulo.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-homefclases',
  templateUrl: './homefclases.component.html',
  styleUrls: ['./homefclases.component.css']
})
export class HomefclasesComponent implements OnInit {
  myControl = new FormControl();
  options=[];
  filteredOptions: Observable<string[]>;

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



  constructor(public homefclasesService: HomefclasesService,
    private nivelService: NivelService, private gradoService: GradoService,
     private areaService: AreadelconocimientoService,private moduloService: ModuloService) { }

  ngOnInit() {
    // this.options=this.result;
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
      this.nuevofiltro=data
      let valor=[]

      this.nuevofiltro.forEach(function(value,index,array){
        valor.push(value.folio)
      })
      this.options=valor

    },(error)=>{
      console.log(error)
    })
  }

  // applyFilter()
  // {
  //   console.log(this.result)
  //   this.result  = this.result.filter(element => element.folio == this.filtro)
  //   console.log(this.filtro)
  // }
  nivelChange(NIVEL) {
    this.nivels=NIVEL.slice(0,3);
    this.folio=this.nivels;
    this.letras=this.result
    this.letras  = this.letras.filter(element => element.folio.slice(0,3) == this.folio)
  }
  gradoChange(GRADO) {
    this.grads=GRADO.slice(0,3)
    if(this.folio==null){
      this.nivels="000";
    }
    this.folio=this.nivels+this.grads;
    this.letras=this.result
    this.letras  = this.letras.filter(element => element.folio.slice(3,6) == this.folio.slice(3,6))
  }

  gettema(AREA) {
    let datos = ""
    AREA.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
    });

    this.areacs=datos
    console.log(this.areacs.length)
    this.res=this.result
    if(this.areacs.length==3){
      this.res=this.res.filter(element=>element.folio.slice(6,9)==this.areacs)
    }else if(this.areacs.length==6){
      this.res=this.res.filter(element=>element.folio.slice(6,12)==this.areacs)
    }else{
    this.res=this.res.filter(element=>element.folio.slice(6,15)==this.areacs)
    }
    console.log(this.areacs.slice(0,10))
    console.log(this.res)

    this.letras=this.res;
    // this.nivels+this.grads+this.areacs+this.subareacs;
  }

  subareaChange(subarea) {
    let datos = ""
    subarea.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
       
    });

    this.subareacs=datos
    this.resa=this.result
    if(this.subareacs==3 && this.areacs.length==3){
       this.resa=this.resa.filter(element=>element.folio.slice(9,12)==this.subareacs)
    }else if(this.subareacs==6 && this.areacs.length==6){
      this.resa=this.resa.filter(element=>element.folio.slice(12,18)==this.subareacs)
    }else{
      this.resa=this.resa.filter(element=>element.folio.slice(15,24)==this.subareacs)
    }
    console.log(this.resa)
    this.letras=this.resa;

    // this.folio=this.nivels+this.grads+this.areacs+this.subareacs;

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
  onKey(event) { 
    this.fil=this.result
    if(event.length==3){
      this.fil=this.fil.filter(element=>element.folio.slice(1,3)==event.slice(1,3))
   }else if(event.length==6){
    this.fil=this.fil.filter(element=>element.folio.slice(3,6)==event.slice(3,6))
  }else if(event.length==9){
    this.fil=this.fil.filter(element=>element.folio.slice(6,9)==event.slice(6,9))
  } else if(event.length==12){
    this.fil=this.fil.filter(element=>element.folio.slice(9,12)==event.slice(9,12))
  }else if(event.length==15){
    this.fil=this.fil.filter(element=>element.folio.slice(12,15)==event.slice(12,15))
  }else if(event.length==18){
    this.fil=this.fil.filter(element=>element.folio.slice(15,18)==event.slice(15,18))
  }
    this.letras=this.fil;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
}
