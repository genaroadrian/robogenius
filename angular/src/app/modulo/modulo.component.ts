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


@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, DatePipe]

})
export class ModuloComponent implements OnInit {





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
  today:any





  constructor(public dialog: MatDialog, private nivelService: NivelService, public toastr: ToastrManager, public notifications: NotificationsService,
    private _formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private gradoService: GradoService, private areaService: AreadelconocimientoService,
    private moduloService: ModuloService, private temaService: TemaService,private datePipe: DatePipe) { }

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



    //


  }

  /* onChangeArea(idac: number) {
     if (idac) {
       this.moduloService.gett().subscribe(
         data => {
           this.temass = data;
           this.subtemass = null;
         }
       );
     } else {
       this.temass = null;
       this.subtemass = null;
     }
   }*/



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
  gettema(AREA) {
    this.tema = this.areadelconocimiento.filter(tem => tem.idac == AREA)
    // console.log(AREA);
    // console.log(this.tema);
    var hash = {};
    this.tema = this.tema.filter(function (tem) {
      var exists = !hash[tem.nomtema] || false;
      hash[tem.nomtema] = true;
      return exists;

    })

  }

  getSubAC() {
    this.moduloService.getSAC().subscribe((data) => {
      console.log(data)
      this.subareas = data
    }, (error) => {

    })
  }

  getsubtema(TEMA) {
    // console.log(this.tema)
    this.subtema = this.datos.filter(sub => sub.idt == TEMA)
    // console.log(TEMA);
    // console.log(this.subtema);
  }

  getHerramientas() {
    this.moduloService.getHerra().subscribe((data) => {
      console.log(data)
      this.herramientas = data
    }, (error) => {

    })
  }

  fechaHoy()
  {
    this.today = new Date()
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd')
  }



}