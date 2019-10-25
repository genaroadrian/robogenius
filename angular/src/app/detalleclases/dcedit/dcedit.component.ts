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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dcedit',
  templateUrl: './dcedit.component.html',
  styleUrls: ['./dcedit.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, DatePipe]
})
export class DceditComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

     /* Obtiene la fecha actual para el formulario */
  fechaHoy() {
    this.today = new Date()
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd')
  }

  ngOnInit() {
    console.log(this.data)
    let n = Math.round(Math.random() * 100000);
    this.idfolio = n.toString()
    console.log(this.idfolio + this.nivels + this.grads + this.areacs)
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
    
      console.log(this.datos)
      let newarray = this.datos // Asignar el array de todos los datos a una variable temporal
    let tema: any // Obtiene un array de todos los temas 
    let filtered = [] // Nuevo Array con los temas ya filtrados
    this.AREA.forEach(function (value, index, array) {
      // console.log(value)
      tema = newarray.filter(tem => tem.idac == value)
      // console.log(tema)
      tema.forEach(function (value, index, array) {
        filtered.push(value)
      })
    });

    this.tema = filtered


    }, (error) => {
    })
    this.moduloService.gets().subscribe((data) => {
      this.subtemas = data
      this.subtema = this.datos.filter(sub => sub.idt == this.TEMA)
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
      this.herramientasSearch = data
    }, (error) => {

    })
  }


  /* Evento Change de todos los select */
  nivelChange(NIVEL, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
    value = value.slice(0, 3)
    this.nivels = value
    this.folio = this.nivels + this.grads + this.areacs + this.subareacs + this.tems + this.subtems + this.herrams + this.idfolio;

    this.vNivel = NIVEL
  }

  gradoChange(GRADO, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
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

    this.temasSearch = this.tema

  }
  getsubtema(TEMA, event) {
    let text = event.source.selected._element.nativeElement
    let value: string
    value = text.innerText.trim()
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
    console.log(this.dClases)
    
    this.moduloService.edit(this.dClases)
  }

herraSearch(value)
  {
    console.log(this.herramientas)
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

  

}
