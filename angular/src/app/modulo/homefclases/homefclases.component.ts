import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { NivelService } from 'src/app/services/nivel.service';
import { GradoService } from 'src/app/services/grado.service';

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


  constructor(public homefclasesService: HomefclasesService,private nivelService: NivelService, private gradoService: GradoService) { }

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
    this.result  = this.result.filter(element => element.folio == '111511161307')
    console.log(this.result.filter(element => element.folio == '111511161307'))
  }
  nivelChange(NIVEL) {
    this.nivels=NIVEL.slice(0,2);
    this.folio=this.nivels;
  }
  gradoChange(GRADO) {
    this.grads=GRADO.slice(0,2)
    this.folio=this.nivels+this.grads;
  }

  gettema(AREA) {
    let datos = ""
    AREA.forEach(function(element,index) {
        datos=datos+element.slice(0,2)
    });

    this.areacs=datos
    this.folio=this.nivels+this.grads+this.areacs;  
  }

  subareaChange(subarea) {
    let datos = ""
    subarea.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
       
    });

    this.subareacs=datos
    this.folio=this.nivels+this.grads+this.areacs+this.subareacs;
  }
}
