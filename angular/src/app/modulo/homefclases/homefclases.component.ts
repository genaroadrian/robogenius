import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { NivelService } from 'src/app/services/nivel.service';
import { GradoService } from 'src/app/services/grado.service';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DcdeleteComponent } from 'src/app/detalleclases/dcdelete/dcdelete.component';
import { isArray } from 'util';


@Component({
  selector: 'app-homefclases',
  templateUrl: './homefclases.component.html',
  styleUrls: ['./homefclases.component.css']
})
export class HomefclasesComponent implements OnInit {

  filtered: any
  result: any
  areacs: any;
  persona: any;
  grado: any;
  datos: any;
  areadelconocimiento: any;
  subareas: any;
  herramientas: any;
  res: any;
  folios = []
  folioCtrl = new FormControl()
  filteredFolios: Observable<any>
  value: string


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
    private areaService: AreadelconocimientoService, public dialog: MatDialog, private moduloService: ModuloService) {
      this.filteredFolios = this.folioCtrl.valueChanges.pipe(
        startWith(''),
        map(folio => folio ? this._filterFolio(folio): this.folios.slice())
      )
  }

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

  filter() {
    this.filtered = this.filterString()
  }

  filterString() {

    let n = this.struct.nivel.toLowerCase().slice(0, 3)
    let g = this.struct.grado.toLowerCase().slice(0, 3)
    let arr = this.result

    /* Filtro de area del conocimiento */
    this.struct.ac.forEach(e => {
      // console.log
      arr = arr.filter(element => element.folio.toLowerCase().slice(6).includes(e.toLowerCase().slice(0, 3)))
    });

    /* Filtro del subarea del conocimiento */
    let i = 6 + this.struct.ac.length * 3
    this.struct.sac.forEach(e => {
      arr = arr.filter(element => element.folio.toLowerCase().slice(i).includes(e.toLowerCase().slice(0, 3)))
    })

    /* Filtro de las herramientas */
    let j = 9 + this.struct.sac.length * 3
    this.struct.herra.forEach(e => {
      arr = arr.filter(element => element.folio.toLowerCase().slice(j).includes(e.toLowerCase().slice(0, 3)))
    })
    return arr.filter(element => element.folio.toLowerCase().slice(0, 3).includes(n)
      && element.folio.toLowerCase().slice(2, 6).includes(g))
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

  getFilter() {
    this.homefclasesService.getFilt().subscribe((data) => {
      this.result = data
      this.folios = this.result
      this.filtered = data
    }, (error) => {
      console.log(error)
    })
  }

  gettema(AREA) {
    let datos = ""
    AREA.forEach(function (element, index) {
      datos = datos + element.slice(0, 3)
    });

    this.areacs = datos
    this.res = this.result
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

  edit(res)
  {
    this.homefclasesService.getData(res)
  }

  folioKey(value) {
    
    // let arr = this.result 
    // this.result = arr.filter(element => element.folio.toLowerCase().slice(0, value.length).includes(value.toLowerCase()))
    this.filtered = this._filterFolio(value)
  }

  private _filterFolio(value: string){
    const filterValue = value.toLowerCase()
    return this.folios.filter(folio => folio.folio.toLowerCase().indexOf(filterValue) === 0)
  }

  restart()
  {
    this.filtered = this.result
    this.value = ''
    this.struct = {
      nivel: '',
      grado: '',
      ac: [''],
      sac: [''],
      herra: ['']

    }
  }

}
