import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NivelService } from '../services/nivel.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Niveles } from '../interfaces/niveles';
import { AddnivelComponent } from '../niveles/addnivel/addnivel.component';
import { MatDialog } from '@angular/material';
import { NotificationsService } from '../services/notifications.service';
import { Grados } from '../interfaces/grados';
import { GradoService } from '../services/grado.service';
import { AddgradosComponent } from '../grados/addgrados/addgrados.component';
import { FormGroup } from '@angular/forms';
import { AreadelconocimientoService } from '../services/areadelconocimiento.service';
import { ModuloService } from '../services/modulo.service';
import { areadelconocimiento } from '../interfaces/areadelconocimiento';
import { AreaaddComponent } from '../areadelconocimiento/areaadd/areaadd.component';
import { tema } from '../interfaces/tema';
import { TemaaddComponent } from '../tema/temaadd/temaadd.component';
import { TemaService } from '../services/tema.service';
import { DatePipe } from '@angular/common';
import { Herramientas } from '../interfaces/herramientas';
import { AddHerramientasComponent } from '../herramientas/add-herramientas/add-herramientas.component';
import { HerramientasService } from '../services/herramientas.service';
import { Subareac } from '../interfaces/subareac';
import { SubareacService } from '../services/subareac.service';
import { SacaddComponent } from '../subareac/sacadd/sacadd.component';


@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, DatePipe]

})
export class ModuloComponent implements OnInit {
  tabs = ['Sesion'];
  selected = new FormControl(0);
  numero:any;

  addTab(selectAfterAdding: boolean) {
    
    this.tabs.push('Sesion');
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
    this.numero=this.tabs.length
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  this.numero=this.tabs.length-1;
  }
  agregarTab(index: number) {
    this.tabs.splice(index, 1);
    
  }


  tipoChange1(event) {
    if (this.selectedtp == "2") {
      this.isDisable = false;
      this.visibility = "block";
    } else {
      this.isDisable = true;
      this.visibility = "none";
    }
  }


  areaC = new FormControl();

  selectedtp = '1';
  persona: any
  isDisable = true;
  visibility = "none";
  barra = "none"
  grado: any
  areas: any
  temas: any;
  subtemas: Object;
  datos: any;
  areadelconocimiento: any;
  herramientas: any
  herramienta: any //Valor del select de herramientas
  subareas: any
  subarea: any //Valor del select de subarea del conocimiento
  tema: any;
  subtema: any;
  today: any

  nivels:any;
  grads:any;
  areacs:any;
  subareacs:any;
  tems:any;
  subtems:any;

  folio:any;

  /* Variables que tienen el valor de los select */
  vNivel: any
  vGrado: any
  vArea: any
  vSubarea: any
  vTema: any
  vSubtema: any
  vHerramienta: any


  /* Interfaz de la nueva planeacion */
  planeacion = []

  constructor(public dialog: MatDialog, private nivelService: NivelService, public toastr: ToastrManager, public notifications: NotificationsService,
    private _formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private gradoService: GradoService, private areaService: AreadelconocimientoService,
    private moduloService: ModuloService, private temaService: TemaService, private datePipe: DatePipe,
    public herramientasService: HerramientasService, public subareacService: SubareacService) { }

  ngOnInit() {
    this.fechaHoy()
    this.getHerramientas()
    this.get()
    //Obtener datos de modal nivel
    this.nivelService.get().subscribe((data) => {
      // console.log(data)
      this.persona = data
    }, (error) => {
    })
    //Obtener datos de modal grados
    this.gradoService.get().subscribe((data) => {
      // console.log(data)
      this.grado = data
    }, (error) => {
    })
    this.moduloService.geta().subscribe((data) => {
      // console.log(data)
      this.areas = data
    }, (error) => {
    })
    this.moduloService.gett().subscribe((data) => {
      // console.log(data)
      this.temas = data
    }, (error) => {
    })
    this.moduloService.gets().subscribe((data) => {
      // console.log(data)
      this.subtemas = data
    }, (error) => {
    })

    this.getSubAC()
  }

  // Notificación de success al eliminar
  showSuccesSave() {
    this.toastr.successToastr('Registro guardado', 'Exito!');
  }
  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }
  hideBarra() {
    this.barra = "none"
  }

  nuev(nivelest: Niveles) {
    /* abrir un pequeño modal para agregar otro tipo de personal */
    const dialogRef = this.dialog.open(AddnivelComponent, {
      data: { nivelest: nivelest }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.nivelService.add(this.nivelService.getDialogData()).subscribe((data) => {
          this.persona.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          // // this.notifications.hideBarra();
          this.hideBarra();
        });
      }
    });
  }

  gradomodal(grado: Grados) {
    /* abrir un pequeño modal para agregar otro tipo de personal */
    const dialogRef = this.dialog.open(AddgradosComponent, {
      data: { grado: grado }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.gradoService.addd(this.gradoService.getDialogData()).subscribe((data) => {
          this.grado.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          // // this.notifications.hideBarra();
          this.hideBarra();
        });
      }
    });
  }

  areamodal(area: areadelconocimiento) {
    /* abrir un pequeño modal para agregar otro tipo de personal */
    const dialogRef = this.dialog.open(AreaaddComponent, {
      data: { area: area }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.areaService.addd(this.areaService.getDialogData()).subscribe((data) => {
          this.areas.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();
        });
      }
    });
  }

  addHerra(herramientas: Herramientas) {
    const dialogRef = this.dialog.open(AddHerramientasComponent, {
      data: { herramientas: herramientas }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.herramientasService.herramienta(this.herramientasService.getDialogData()).subscribe((data) => {
          this.herramientas.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();
        });
      }
    });
  }

  addSAC(subareaC: Subareac) {
    const dialogRef = this.dialog.open(SacaddComponent, {
      data: { subareaC: subareaC }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.subareacService.add(this.subareacService.getDialogData()).subscribe((data) => {
          this.subareas.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          // // this.notifications.hideBarra();
          this.hideBarra();
        });
      }
    });
  }


  temamodal(tema: tema) {
    /* abrir un pequeño modal para agregar otro tipo de personal */
    const dialogRef = this.dialog.open(TemaaddComponent, {
      data: { tema: tema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.temaService.addd(this.areaService.getDialogData()).subscribe((data) => {
          this.temas.push(data)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          // // this.notifications.hideBarra();
          this.hideBarra();
        });
      }
    });
  }

  subareaChange(subarea) {
    this.vSubarea = subarea
    let datos = ""
    subarea.forEach(function(element,index) {
        datos=datos+element.slice(0,3)
       
    });

    this.subareacs=datos
    this.folio=this.nivels+this.grads+this.areacs+this.subareacs;
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

  nivelChange(NIVEL) {
    this.vNivel = NIVEL
    this.nivels=NIVEL.slice(0,2);
    this.folio=this.nivels;
  }

  gradoChange(GRADO) {
    this.vGrado = GRADO
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

    this.vArea = AREA

    // console.log(AREA)
    let newarray = this.datos // Asignar el array de todos los datos a una variable temporal
    let tema: any // Obtiene un array de todos los temas 
    let filtered = [] // Nuevo Array con los temas ya filtrados
    AREA.forEach(function (value, index, array) {
      // console.log(value)
      tema = newarray.filter(tem => tem.idac == value)
      // console.log(tema)
      tema.forEach(function (value, index, array) {
        filtered.push(value)
      })
    });

    this.tema = filtered // Asigna la variable tema (select de temas) a los datos de los temas ya filtrados

    /* Quita los nombres repetidos del Array de los temas */
    var hash = {};
    this.tema = this.tema.filter(function (tem) {
      var exists = !hash[tem.nomtema] || false;
      hash[tem.nomtema] = true;
      return exists;
    })

  }

  getSubAC() {
    this.moduloService.getSAC().subscribe((data) => {
      // console.log(data)
      this.subareas = data
    }, (error) => {

    })
  }

  getsubtema(TEMA) {
    this.vTema = TEMA
    // console.log(this.tema)

   this.tems=TEMA
    this.folio=this.nivels+this.grads+this.areacs+this.subareacs+this.tems;

    this.subtema = this.datos.filter(sub => sub.idt == TEMA)
    // this.tems=this.subtema[0].nomtema.slice(0,3)
    // this.folio=this.nivels+this.grads+this.areacs+this.subareacs+this.tems;

    // console.log(TEMA);
    // console.log(this.subtema);
  }

  getHerramientas() {
    this.moduloService.getHerra().subscribe((data) => {
      // console.log(data)
      this.herramientas = data
    }, (error) => {

    })
  }

  fechaHoy() {
    this.today = new Date()
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd')
  }

  // SelectNivel(data){
  //   this.nivels=data.value.slice(0,2);
  //   this.folio=this.nivels;
  // }
  // SelectGrado(data){

  //   this.grads=data.value.slice(0,2)
  //   this.folio=this.nivels+this.grads;
  // }
  // getarc(data){
  //   let datos = ""
  //   data.forEach(function(element,index) {
  //       datos=datos+element.slice(0,3)
       
  //   });

  //   this.subareacs=datos
  //   this.folio=this.nivels+this.grads+this.areacs+this.subareacs;

  // }

  herramChange(herramienta) {
    this.vHerramienta = herramienta
  }

  subtemasChange(SUBTEMAS) {
    this.vSubtema = SUBTEMAS
    var aleatorio = Math.round(Math.random()*100000);
    this.folio=this.folio+aleatorio
  }

  guardar()
  {
    // console.log(this.vNivel)
    // console.log(this.vGrado)
    console.log(this.vArea)
    // console.log(this.vSubarea)
    // console.log(this.vTema)
    // console.log(this.vSubtema)
    // console.log(this.vHerramienta)

    let plan = []
    let subarea = this.vSubarea
    this.vArea.forEach(function(value,index, array){
      plan.push
      ({idarchivo:  null,
        idac: value,
        idsac:  null,
        idherra: null 
      })
    });
    // console.log(plan)
    
    let limite = plan.length
    // console.log(limite)
    subarea.forEach(function(value, index, array){
      
      if(index < limite)
      {
        plan[index].idsac = value
        // alert()
      }else{
        plan.push
      ({idarchivo:  null,
        idac: null,
        idsac:  value,
        idherra: null 
      })
      }
    });

    limite = plan.length
    this.vHerramienta.forEach(function(value,index,array){
      if(index < limite)
      {
        plan[index].idherra = value
      }else{
        plan.push
        ({idarchivo:  null,
          idac: null,
          idsac:  null,
          idherra: value 
        })
      }

      console.log(plan)

    });

 



    this.planeacion = plan
    console.log(this.planeacion)
    
  }
  final(data){
    // this.subtems=data.slice(0,3)
    // console.log(this.nivels+this.grads+this.areacs+this.subareacs+this.tems+this.subtems)
    // this.folio=this.nivels+this.grads+this.areacs+this.subareacs+this.tems+this.subtems;
    var aleatorio = Math.round(Math.random()*100000);
    this.folio=this.folio+aleatorio
  }
}