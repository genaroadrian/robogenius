import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { NivelService } from "../services/nivel.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Niveles } from "../interfaces/niveles";
import { AddnivelComponent } from "../niveles/addnivel/addnivel.component";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "../services/notifications.service";
import { Grados } from "../interfaces/grados";
import { GradoService } from "../services/grado.service";
import { AddgradosComponent } from "../grados/addgrados/addgrados.component";
import { AreadelconocimientoService } from "../services/areadelconocimiento.service";
import { ModuloService } from "../services/modulo.service";
import { areadelconocimiento } from "../interfaces/areadelconocimiento";
import { AreaaddComponent } from "../areadelconocimiento/areaadd/areaadd.component";
import { tema } from "../interfaces/tema";
import { TemaaddComponent } from "../tema/temaadd/temaadd.component";
import { TemaService } from "../services/tema.service";
import { DatePipe } from "@angular/common";
import { Herramientas } from "../interfaces/herramientas";
import { AddHerramientasComponent } from "../herramientas/add-herramientas/add-herramientas.component";
import { HerramientasService } from "../services/herramientas.service";
import { Subareac } from "../interfaces/subareac";
import { SubareacService } from "../services/subareac.service";
import { SacaddComponent } from "../subareac/sacadd/sacadd.component";
import { SesionesService } from "../services/sesiones.service";
import { subtema } from "../interfaces/subtema";
import { SubtemaaddComponent } from "../subtema/subtemaadd/subtemaadd.component";
import { SubtemaService } from "../services/subtema.service";

@Component({
  selector: "app-modulo",
  templateUrl: "./modulo.component.html",
  styleUrls: ["./modulo.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    DatePipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class ModuloComponent implements OnInit {
  checked = true;
  all: any;
  no_s: number;

  barraS: string = "none";

  colorTab: string = "accent";
  colorChange = [];
  dis: boolean = false

  /* Almacena todas las sesiones que se van a insertar en la base de datos 
  en forma de arreglo */
  allSesiones = [
    {
      idsesion: null,
      nombre: null,
      apren_clave: null,
      objetivo: null,
      mat_necesario: null,
      introduccion: null,
      ice_break: null,
      contenido: null,
      descanso: null,
      desarrollo: null,
      cierre: null
    }
  ];

  bcT: string = "#28B463";
  colorT: string = "#2ECC71";

  filesView = [];
  btnView = [];

  /* Almancena una sesion por separado en forma de diccionario de datos */
  singleSesion = {
    idsesion: null,
    nombre: null,
    apren_clave: null,
    objetivo: null,
    mat_necesario: null,
    introduccion: null,
    ice_break: null,
    contenido: null,
    descanso: null,
    desarrollo: null,
    cierre: null
  };

  sesionesView = "none";
  buttonView = "";
  disSesion = [];

  /* Variables de las tabs */
  tabs = ["Sesion"];
  selected = new FormControl(0);

  numero: any;
  ns: any;
  x: any;

  areaC = new FormControl();

  selectedtp = "1";
  persona: any;
  isDisable = true;
  visibility = "none";
  barra = "none";
  grado: any;
  areas: any;
  temas: any;
  subtemas: any;
  datos: any;
  areadelconocimiento: any;
  herramientas: any;
  herramienta: any; //Valor del select de herramientas
  subareas: any;
  subarea: any; //Valor del select de subarea del conocimiento
  tema: any;
  subtema: any;
  today: any;

  /* valores para la busqueda en los select */
  herramientasSearch: any;
  temasSearch: any;
  subtemasSearch: any;

  /* Variables para el folio */
  nivels: string = "";
  grads: string = "";
  areacs: string = "";
  subareacs: string = "";
  tems: string = "";
  subtems: string = "";
  herrams: string = "";

  folio: any;
  noalu: number;

  /* Variables que tienen el valor de los select */
  vNivel: any;
  vGrado: any;
  vArea: any;
  vSubarea: any;
  vTema: any;
  vSubtema: any;
  vHerramienta: any;
  idfolio: string;

  /* Interfaz del detalle de clases */
  dClases = [];
  planeacion = [];

  /* ERROES EN EL NG BUILD */
  NIVEL;
  GRADO;
  AREA;
  TEMA;
  SUBTEMAS;
  herra;

  constructor(
    public dialog: MatDialog,
    private nivelService: NivelService,
    public toastr: ToastrManager,
    public notifications: NotificationsService,
    private gradoService: GradoService,
    private areaService: AreadelconocimientoService,
    private moduloService: ModuloService,
    private temaService: TemaService,
    private datePipe: DatePipe,
    public herramientasService: HerramientasService,
    public subareacService: SubareacService,
    public sesionesService: SesionesService,
    public subtemaService: SubtemaService
  ) {}

  /* Obtiene la fecha actual para el formulario */
  fechaHoy() {
    this.today = new Date();
    this.today = this.datePipe.transform(this.today, "yyyy-MM-dd");
  }

  buildFolio() {
    this.folio =
      this.nivels +
      this.grads +
      this.areacs +
      this.subareacs +
      this.tems +
      this.subtems +
      this.idfolio;
  }

  ngOnInit() {
    this.filesView[0] = "none";
    this.btnView[0] = "";
    this.disSesion[0] = false;
    this.colorChange[0] = "";

    let n = Math.round(Math.random() * 100000);
    this.idfolio = n.toString();
    this.buildFolio;
    this.numero = 1;
    this.ns = 1;
    this.fechaHoy();
    this.getAll();
  }

  session(index) {
    this.ns = index;
  }

  manda(e) {
    this.ns = e;
  }

  async getAll() {
    this.barra = "";
    try {
      this.all = await Promise.all([
        this.nivelService.get().toPromise(),
        this.gradoService.get().toPromise(),
        this.moduloService.geta().toPromise(),
        this.moduloService.getSAC().toPromise(),
        this.moduloService.gett().toPromise(),
        this.moduloService.gets().toPromise(),
        this.moduloService.getHerra().toPromise()
      ]);

      this.persona = this.all[0];
      this.grado = this.all[1];
      this.areas = this.all[2];
      this.subareas = this.all[3];
      this.temas = this.all[4];
      this.subtemas = this.all[5];
      this.herramientas = this.all[6];
      this.herramientasSearch = this.herramientas;

      this.barra = "none";
    } catch (e) {
      this.barra = "none";
      this.notifications.showError();
    }
  }

  /* Funciones de las tabs */
  addTab(selectAfterAdding: boolean) {
    this.allSesiones.push({
      idsesion: null,
      nombre: null,
      apren_clave: null,
      objetivo: null,
      mat_necesario: null,
      introduccion: null,
      ice_break: null,
      contenido: null,
      descanso: null,
      desarrollo: null,
      cierre: null
    });
    this.filesView.push("none");
    this.btnView.push("");
    this.colorChange.push("");
    this.disSesion.push(false);
    this.tabs.push("Sesion");
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
    this.numero = this.tabs.length;
  }
  removeTab(index: number) {
    this.filesView.splice(index, 1);
    this.btnView.slice(index, 1);
    this.colorChange.splice(index, 1);
    this.tabs.splice(index, 1);
    this.disSesion.splice(index, 1);
    this.numero = this.numero - 1;
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

  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = "";
  }
  hideBarra() {
    this.barra = "none";
  }

  /* Modales para agregar nuevos registros en cada select */
  nuev() {
    let nivelest: Niveles;
    const dialogRef = this.dialog.open(AddnivelComponent, {
      data: { nivelest: nivelest }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.nivelService.add(this.nivelService.getDialogData()).subscribe(
          data => {
            this.persona.push(data);
            this.notifications.showSuccessAdd();
            this.hideBarra();
          },
          error => {
            this.notifications.showError();
            this.hideBarra();
          }
        );
      }
    });
  }

  gradomodal() {
    let grado: Grados;
    const dialogRef = this.dialog.open(AddgradosComponent, {
      data: { grado: grado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.gradoService.addd(this.gradoService.getDialogData()).subscribe(
          data => {
            this.grado.push(data);
            this.notifications.showSuccessAdd();
            this.hideBarra();
          },
          error => {
            this.notifications.showError();
            this.hideBarra();
          }
        );
      }
    });
  }

  areamodal() {
    let area: areadelconocimiento;
    const dialogRef = this.dialog.open(AreaaddComponent, {
      data: { area: area }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.areaService.addd(this.areaService.getDialogData()).subscribe(
          data => {
            this.areas.push(data);
            this.notifications.showSuccessAdd();
            this.hideBarra();
          },
          error => {
            this.notifications.showError();
            this.hideBarra();
          }
        );
      }
    });
  }

  addHerra() {
    let herramientas: Herramientas;
    const dialogRef = this.dialog.open(AddHerramientasComponent, {
      data: { herramientas: herramientas }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.herramientasService
          .herramienta(this.herramientasService.getDialogData())
          .subscribe(
            data => {
              this.herramientas.push(data);
              this.notifications.showSuccessAdd();
              this.hideBarra();
            },
            error => {
              this.notifications.showError();
              this.hideBarra();
            }
          );
      }
    });
  }

  addSAC() {
    let subareaC: Subareac;
    const dialogRef = this.dialog.open(SacaddComponent, {
      data: { subareaC: subareaC },
      width:'20%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.subareacService
          .add(this.subareacService.getDialogData())
          .subscribe(
            data => {
              this.subareas.push(data);
              this.notifications.showSuccessAdd();
              this.hideBarra();
            },
            error => {
              this.notifications.showError();
              this.hideBarra();
            }
          );
      }
    });
  }

  temamodal() {
    let tema: tema;
    const dialogRef = this.dialog.open(TemaaddComponent, {
      data: { tema: tema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.temaService.addd(this.temaService.getDialogData()).subscribe(
          data => {
            this.temas.push(data);
            this.notifications.showSuccessAdd();
            this.hideBarra();
          },
          error => {
            this.notifications.showError();
            this.hideBarra();
          }
        );
      }
    });
  }

  subtemaModal() {
    let subtema: subtema;
    const dialogRef = this.dialog.open(SubtemaaddComponent, {
      data: { tema: subtema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra();
        this.subtemaService.save(this.subtemaService.getDialogData()).subscribe(
          data => {
            this.notifications.showSuccessAdd();
            this.hideBarra();
            this.subtema.push(data)
          },
          error => {
            this.notifications.showError();
            this.hideBarra();
          }
        );
      }
    });
  }

  /* Evento Change de todos los select */
  nivelChange(NIVEL, event) {
    let text = event.source.selected._element.nativeElement;
    let value: string;
    value = text.innerText.trim();
    value = value.slice(0, 3);
    this.nivels = value;
    this.buildFolio();
    this.vNivel = NIVEL;
  }

  gradoChange(GRADO, event) {
    let text = event.source.selected._element.nativeElement;
    let value: string;
    value = text.innerText.trim();
    value = value.slice(0, 3);
    this.grads = value;

    this.vGrado = GRADO;
    this.buildFolio();
  }

  subareaChange(subarea, event) {
    let text = event.source.selected;
    let value: string = "";
    text.forEach(element => {
      let val = element.viewValue;
      val = val.slice(0, 3);
      value = value + val;
    });
    this.vSubarea = subarea;
    let datos = "";
    subarea.forEach(function(element, index) {
      datos = datos + element.slice(0, 3);
    });

    this.subareacs = value;
    this.buildFolio();
  }

  gettema(AREA, event) {
    let text = event.source.selected;
    let value: string = "";
    text.forEach(element => {
      let val = element.viewValue;
      val = val.slice(0, 3);
      value = value + val;
    });
    this.areacs = value;

    let datos: any = this.temas;
    let t: any[] = [];
    AREA.forEach(element => {
      let d: any = datos.filter(e => e.idac == element);
      d.forEach(tem => {
        t.push(tem);
      });
    });

    this.tema = t;
    this.buildFolio();
    this.vArea = AREA;
    this.temasSearch = this.tema;
  }
  getsubtema(TEMA, event) {
    let text = event.source.selected._element.nativeElement;
    let value: string;
    value = text.innerText.trim();
    value = value.slice(0, 3);
    this.vTema = TEMA;

    this.tems = value;
    this.buildFolio();
    this.subtema = this.subtemas.filter(sub => sub.idt == TEMA);
    this.subtemasSearch = this.subtema;
  }

  subtemasChange(SUBTEMAS, event) {
    let text = event.source.selected._element.nativeElement;
    let value: string;
    value = text.innerText.trim();
    value = value.slice(0, 3);
    this.vSubtema = SUBTEMAS;
    this.subtems = value;
    this.buildFolio();
  }

  herramChange(herramienta, event) {
    let text = event.source.selected;
    let value: string = "";
    text.forEach(element => {
      let val = element.viewValue;
      val = val.slice(0, 3);
      value = value + val;
    });
    this.herrams = value;
    this.buildFolio();
    this.vHerramienta = herramienta;
  }

  /* Funciones que guardan los registros */
  guardar() {
    /* Asignacion de la tabla de detalle clases */
    let dClase = [];
    let subarea = this.vSubarea;
    this.vArea.forEach(function(value, index, array) {
      dClase.push({
        idarchivo: null,
        idac: value,
        idsac: null,
        idherra: null,
        folio: null
      });
    });

    let limite = dClase.length;
    subarea.forEach(function(value, index, array) {
      if (index < limite) {
        dClase[index].idsac = value;
      } else {
        dClase.push({
          idarchivo: null,
          idac: null,
          idsac: value,
          idherra: null,
          folio: null
        });
      }
    });

    limite = dClase.length;
    this.vHerramienta.forEach(function(value, index, array) {
      if (index < limite) {
        dClase[index].idherra = value;
      } else {
        dClase.push({
          idarchivo: null,
          idac: null,
          idsac: null,
          idherra: value,
          folio: null
        });
      }
    });

    let folio = this.folio;
    dClase.forEach(function(value, index, array) {
      array[index].folio = folio;
    });

    this.dClases = dClase;
    this.barra = "";
    this.moduloService.saveDClases(this.dClases).subscribe(
      data => {
        this.notifications.showSuccessAdd();
        this.barra = "none";
        this.sesionesView = "";
        this.dis = true;
        this.buttonView = "none";
      },
      error => {
        this.barra = "none";
      }
    );
  }

  saveSesion(singleSesion, index) {
    let id: number;
    let ndata: any;
    this.barraS = "";
    this.sesionesService.add(singleSesion).subscribe(
      data => {
        let s: any = data;
        this.allSesiones[index].idsesion = s.idsesion;
        this.filesView[index] = "";
        this.btnView[index] = "none";
        this.disSesion[index] = true;
        ndata = data;
        id = ndata.idsesion;
        this.moduloService.getIdSesion(id);
        let planeaciones = {
          idt: this.vTema,
          ids: this.vSubtema,
          idsesion: id,
          idg: this.vGrado,
          idn: this.vNivel,
          fecha: this.today,
          no_alum: this.noalu,
          no_sesiones: this.numero,
          folio: this.folio
        };

        this.moduloService.savePlan(planeaciones).subscribe(
          data => {
            this.barraS = "none";
            this.notifications.showSuccessAdd();
            this.colorChange[index] = "on";
          },
          error => {
            this.barraS = "none";
            this.notifications.showError();
          }
        );
      },
      error => {
        this.barraS = "none";
        this.notifications.showError();
      }
    );
  }

  herraSearch(value) {
    this.herramientas = this.herramientasSearch;
    let crit = value.trim().toLowerCase();
    let herramientas = this.herramientas;
    herramientas = this.herramientas.filter(function(el) {
      return el.nombre.toLowerCase().indexOf(crit.toLowerCase()) > -1;
    });
    this.herramientas = herramientas;
  }

  temaSearch(value) {
    this.tema = this.temasSearch;
    let crit = value.trim().toLowerCase();
    let temas = this.tema;
    temas = this.tema.filter(function(tem) {
      return tem.nombre.toLowerCase().indexOf(crit.toLowerCase()) > -1;
    });

    this.tema = temas;
  }

  subtemaSearch(value) {
    this.subtema = this.subtemasSearch;
    let crit = value.trim().toLowerCase();
    let subtemas = this.subtema;
    subtemas = this.subtema.filter(function(sub) {
      return sub.nombre.toLowerCase().indexOf(crit.toLowerCase()) > -1;
    });

    this.subtema = subtemas;
  }
}
