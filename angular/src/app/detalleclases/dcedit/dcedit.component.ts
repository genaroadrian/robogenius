import { Component, OnInit, Inject } from '@angular/core';
import { NivelService } from 'src/app/services/nivel.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { GradoService } from 'src/app/services/grado.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { TemaService } from 'src/app/services/tema.service';
import { DatePipe } from '@angular/common';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { SubareacService } from 'src/app/services/subareac.service';
import { SesionesService } from 'src/app/services/sesiones.service';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubtemaaddComponent } from 'src/app/subtema/subtemaadd/subtemaadd.component';
import { subtema } from 'src/app/interfaces/subtema';
import { TemaaddComponent } from 'src/app/tema/temaadd/temaadd.component';
import { tema } from 'src/app/interfaces/tema';
import { SacaddComponent } from 'src/app/subareac/sacadd/sacadd.component';
import { Subareac } from 'src/app/interfaces/subareac';
import { AddHerramientasComponent } from 'src/app/herramientas/add-herramientas/add-herramientas.component';
import { Herramientas } from 'src/app/interfaces/herramientas';
import { AddgradosComponent } from 'src/app/grados/addgrados/addgrados.component';
import { AreaaddComponent } from 'src/app/areadelconocimiento/areaadd/areaadd.component';
import { areadelconocimiento } from 'src/app/interfaces/areadelconocimiento';
import { Grados } from 'src/app/interfaces/grados';
import { Niveles } from 'src/app/interfaces/niveles';
import { AddnivelComponent } from 'src/app/niveles/addnivel/addnivel.component';
import { SubtemaService } from 'src/app/services/subtema.service';

@Component({
  selector: 'app-dcedit',
  templateUrl: './dcedit.component.html',
  styleUrls: ['./dcedit.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, DatePipe]
})
export class DceditComponent implements OnInit {

  niv: string
  grad: string
  tem: string
  subt: string



  AREA = this.data.ac
  subarea = this.data.subac
  NIVEL = ''+this.data.idn+''
  GRADO = ''+this.data.idg+''
  TEMA = ''+this.data.idt+''
  SUBTEMAS = ''+this.data.ids+''

  no_s: number
  numero: any;
  ns: any;
  dis= false
  buttonView = ''
  /* Almacena todas las sesiones que se van a insertar en la base de datos 
  en forma de arreglo */
  allSesiones = [{
    nombre: null,
    apren_clave: null,
    objetivo: null,
    mat_necesario: null,
    introduccion: null,
    ice_break: null,
    contenido: null,
    descanso: null,
    desarrollo: null,
    cierre: null,
  }]
/* Almancena una sesion por separado en forma de diccionario de datos */
  singleSesion = {
    nombre: null,
    apren_clave: null,
    objetivo: null,
    mat_necesario: null,
    introduccion: null,
    ice_break: null,
    contenido: null,
    descanso: null,
    desarrollo: null,
    cierre: null,
  }
  sesionesView = "none"
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
  herramienta = this.data.herra //Valor del select de herramientas
  subareas: any//Valor del select de subarea del conocimiento
  tema: any; 
  subtema: any;
  today: any

  /* valores para la busqueda en los select */
  herramientasSearch: any
  temasSearch: any
  subtemasSearch: any

  /* Variables para el folio */
  nivels: string = ''
  grads: string = ''
  areacs: string = ''
  subareacs: string = ''
  tems: string = ''
  subtems: string = ''
  herrams: string = ''

  folio: any;
  noalu: number

  /* Variables que tienen el valor de los select */
  vNivel: any = this.NIVEL
  vGrado: any = this.GRADO
  vArea: any = this.AREA
  vSubarea: any = this.subarea
  vTema: any = this.TEMA
  vSubtema: any = this.SUBTEMAS
  vHerramienta: any = this.herramienta
  idfolio: string


  /* Interfaz del detalle de clases */
  dClases = []
  planeacion = []

  constructor(private nivelService: NivelService, public notifications: NotificationsService,  
    private gradoService: GradoService, private areaService: AreadelconocimientoService,
    private moduloService: ModuloService, private temaService: TemaService, private datePipe: DatePipe,
    public herramientasService: HerramientasService, public subareacService: SubareacService,
    public sesionesService: SesionesService, public dialogRef: MatDialogRef<DceditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public subtemaService: SubtemaService) { }

    /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }
  hideBarra() {
    this.barra = "none"
  }

     /* Obtiene la fecha actual para el formulario */
  fechaHoy() {
    this.today = new Date()
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd')
  }

  ngOnInit() {
    // console.log(this.data)
    let n = Math.round(Math.random() * 100000);
    this.idfolio = n.toString()
    // console.log(this.idfolio + this.nivels + this.grads + this.areacs)
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.idfolio
    this.numero = 1
    this.ns = 1
    this.fechaHoy()
    this.getHerramientas()
    this.get()
    //Obtener datos de modal nivel
    this.nivelService.get().subscribe((data) => {
      this.persona = data
    }, (error) => {
    })

    //Obtener datos de modal grados
    this.gradoService.get().subscribe((data) => {
      this.grado = data
    }, (error) => {
    })

    this.moduloService.geta().subscribe((data) => {
      this.areas = data
    }, (error) => {
    })

    this.moduloService.gett().subscribe((data) => {
      this.temas = data
    
      // console.log(this.datos)
      let newarray = this.datos // Asignar el array de todos los datos a una variable temporal
    let tema: any // Obtiene un array de todos los temas 
    let filtered = [] // Nuevo Array con los temas ya filtrados
    this.AREA.forEach(function (value, index, array) {
      // // console.log(value)
      tema = newarray.filter(tem => tem.idac == value)
      // // console.log(tema)
      tema.forEach(function (value, index, array) {
        filtered.push(value)
      })
    });

    this.tema = filtered
    this.temasSearch = this.tema


    }, (error) => {
    })
    this.moduloService.gets().subscribe((data) => {
      this.subtemas = data
      this.subtema = this.datos.filter(sub => sub.idt == this.TEMA)
      this.subtemasSearch = this.subtema
    }, (error) => {
    })

    this.getSubAC()
  }

  /* funciones que obtienen todos los datos que se van a filtrar */
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

  getSubAC() {
    this.barra = ''
    this.moduloService.getSAC().subscribe((data) => {
        this.barra = 'none'
      this.subareas = data
    }, (error) => {
      this.barra = 'none'
      this.notifications.showError()
    })
  }

  getHerramientas() {
    this.moduloService.getHerra().subscribe((data) => {
      this.herramientas = data
      this.herramientasSearch = this.herramientas
    }, (error) => {

    })
  }


  /* Evento Change de todos los select */
  nivelChange(NIVEL, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
    this.niv = value
    value = value.slice(0, 3)
    this.nivels = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;

    this.vNivel = NIVEL
  }

  gradoChange(GRADO, event) {
    let text = event.source.selected._element.nativeElement
    let value: string

    value = text.innerText.trim()
    this.grad = value
    value = value.slice(0, 3)
    this.grads = value

    this.vGrado = GRADO
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;
  }

  subareaChange(subarea, event) {
    let text = event.source.selected
    let value: string = ''
    text.forEach(element => {

      let val = element.viewValue
      val = val.slice(0, 3)
      value = value + val
    });
    this.vSubarea = subarea
    let datos = ""
    subarea.forEach(function (element, index) {
      datos = datos + element.slice(0, 3)

    });

    this.subareacs = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;
  }

  gettema(AREA, event) {
    let text = event.source.selected
    let value: string = ''
    text.forEach(element => {

      let val = element.viewValue
      val = val.slice(0, 3)
      value = value + val
    });

    let datos = ""
    AREA.forEach(function (element, index) {
      datos = datos + element.slice(0, 2)

    });

    this.areacs = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;

    this.vArea = AREA

    let newarray = this.datos // Asignar el array de todos los datos a una variable temporal
    let tema: any // Obtiene un array de todos los temas 
    let filtered = [] // Nuevo Array con los temas ya filtrados
    AREA.forEach(function (value, index, array) {
      // // console.log(value)
      tema = newarray.filter(tem => tem.idac == value)
      // // console.log(tema)
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

    this.temasSearch = this.tema
    // console.log(this.temaSearch)

  }
  getsubtema(TEMA, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
    this.tem = value
    value = value.slice(0, 3)
    this.vTema = TEMA

    this.tems = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;

    this.subtema = this.datos.filter(sub => sub.idt == TEMA)
    this.subtemasSearch = this.subtema
  }

  subtemasChange(SUBTEMAS, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
    this.subt = value
    value = value.slice(0, 3)
    this.vSubtema = SUBTEMAS
    this.subtems = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio
  }

  herramChange(herramienta, event) {
    let text = event.source.selected
    let value: string = ''
    text.forEach(element => {

      let val = element.viewValue
      val = val.slice(0, 3)
      value = value + val
    });
    this.herrams = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio

    this.vHerramienta = herramienta
  }

  /* Funciones que guardan los registros */
  guardar() {
    /* Asignacion de la tabla de detalle clases */
    let dClase = []
    let subarea = this.vSubarea

    this.vArea.forEach(function (value, index, array) {
      dClase.push
        ({
          idarchivo: null,
          idac: value,
          idsac: null,
          idherra: null,
          folio: null
        })
    });

    let limite = dClase.length
    subarea.forEach(function (value, index, array) {

      if (index < limite) {
        dClase[index].idsac = value
      } else {
        dClase.push
          ({
            idarchivo: null,
            idac: null,
            idsac: value,
            idherra: null,
            folio: null
          })
      }
    });

    limite = dClase.length
    this.vHerramienta.forEach(function (value, index, array) {
      if (index < limite) {
        dClase[index].idherra = value
      } else {
        dClase.push
          ({
            idarchivo: null,
            idac: null,
            idsac: null,
            idherra: value,
            folio: null
          })
      }
    });

    let folio = this.folio
    dClase.forEach(function (value, index, array) {
      array[index].folio = folio
    });

    this.dClases = dClase
    // console.log(this.dClases)

    let plan = {
      nivel: this.NIVEL,
      grado: this.GRADO,
      tema: this.TEMA,
      subtema: this.SUBTEMAS
    }

    this.moduloService.savePlantemp(plan)
    
    this.moduloService.edit(this.dClases)
    let extras = {
      nivel: this.niv,
      grado: this.grad,
      tema: this.tem,
      subtema: this.subt
    }
    this.moduloService.saveExt(extras)


  }

herraSearch(value)
  {
    // console.log(this.herramientas)
    this.herramientas = this.herramientasSearch
    let crit = value.trim().toLowerCase()
    let herramientas = this.herramientas
    herramientas = this.herramientas.filter(function(el) {
      return el.nombre.toLowerCase().indexOf(crit.toLowerCase()) > -1;
  })
  this.herramientas = herramientas
    
  }
temaSearch(value)
  {
    this.tema = this.temasSearch
    // console.log(this.temasSearch)
    let crit = value.trim().toLowerCase()
    let temas = this.tema
    temas = this.tema.filter(function(tem){
      return tem.nomtema.toLowerCase().indexOf(crit.toLowerCase()) > -1
    })

    this.tema = temas
  }

  subtemaSearch(value)
  {
    this.subtema = this.subtemasSearch
    let crit = value.trim().toLowerCase()
    let subtemas = this.subtema
    subtemas = this.subtema.filter(function(sub){
      return sub.nomsubt.toLowerCase().indexOf(crit.toLowerCase()) > -1
    })

    this.subtema = subtemas
  }




  /* Modales para agregar nuevos registros en cada select */
  nuev() {
    let nivelest: Niveles
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
          this.hideBarra();
        });
      }
    });
  }

  gradomodal() {
    let grado: Grados
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
          this.hideBarra();
        });
      }
    });
  }

  areamodal() {
    let area: areadelconocimiento
    const dialogRef = this.dialog.open(AreaaddComponent, {
      data: { area: area }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // console.log(this.areas)
        this.showBarra()
        this.areaService.addd(this.areaService.getDialogData()).subscribe((data) => {
          this.areas.push(data)
          // console.log(this.areas)
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();
        });
      }
    });
  }

  addHerra() {
    let herramientas: Herramientas
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

  addSAC() {
    let subareaC: Subareac
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
          this.hideBarra();
        });
      }
    });
  }

  temamodal() {
    let tema: tema
    const dialogRef = this.dialog.open(TemaaddComponent, {
      data: { tema: tema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.temaService.addd(this.temaService.getDialogData()).subscribe((data) => {
          this.temas.push(data)
          this.get()
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();
        });
      }
    });
  }

  subtemaModal()
  {
    let subtema: subtema
    const dialogRef = this.dialog.open(SubtemaaddComponent, {
      data: { tema: subtema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.subtemaService.save(this.subtemaService.getDialogData()).subscribe((data) => {
          this.get()
          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
