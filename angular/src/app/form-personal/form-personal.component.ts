import { Component, OnInit, Inject, Directive, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import { Tipopersonal } from '../interfaces/tipopersonal';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../interfaces/personal';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Detallegrupos } from '../interfaces/detallegrupos';
import { DetallegruposService } from '../services/detallegrupos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TpaddComponent } from '../tipopersonal/tpadd/tpadd.component';
import { MatDialog } from '@angular/material';
import { NotificationsService } from '../services/notifications.service';
import { GruposAlumnosService } from '../services/grupos-alumnos.service';
import { HaddComponent } from '../horarios/hadd/hadd.component';
import { HorariosService } from '../services/horarios.service';
import { Horario } from '../interfaces/horario';
import { FileuploadService } from '../services/fileupload.service';
import { globalVarimg } from '../services/global.service';


function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "codecraft.tv") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
}

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class FormPersonalComponent implements OnInit {
  API_ENDPOINT = globalVarimg.url

  @ViewChild('Profile') img;

  /* select de horas */
  horas: any
  isDisable = true;

  horario: any

  dias: any
  public selectedTime: string;
  public selectedTimes: string;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  /* Visibilidad de la barra de carga */
  barra = "none"

  /* Almacena todos los tipos de personal */
  selectTPersonal: any
  horarioPersonal = [{
    idd: null,
    idh: null
  }]

  cond: any

  /* Tipo de personal  */
  tipoPersonal: boolean

  /* ---------------------------- CONFIGURACIÓN DE LA PAGINA ---------------------------- */

  // Progrmacación de las tabs en el modulo de detalle de grupos
  tabs = ['Horario'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.horarioPersonal.push({
      idd: null,
      idh: null
    })
    this.tabs.push('Horario');
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  agregarTab(index: number) {

    this.tabs.splice(index, 1);
  }

  ngOnInit() {

    this.tPersonal.get().subscribe((data) => {
      this.selectTPersonal = data
      
      this.selectTPersonal = this.selectTPersonal.filter(x => x.idsuc == this.sucursal)
      console.log(this.selectTPersonal)
    }, (error) => {
    })
    // this.getDias()
    // this.getHorarios()
    this.getHorario()
  }

  // Change the user and password input and groups module visibility 
  tipoChange(idt) {
    console.log(idt)
    idt = Number(idt)
    console.log(this.selectTPersonal)
    this.cond = this.selectTPersonal.filter(per => per.idtper == idt)
    console.log(this.cond[0])
    if (this.cond[0].permisos == 1) {
      this.visibility = ''
    } else {
      this.visibility = 'none'
    }
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

  // Notificación de success al eliminar
  showSuccesSave() {
    this.toastr.successToastr('Registro guardado', 'Exito!');
  }

  // Notificacion de error al eliminar
  showErrorSave() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }
  /* Mensaje de ERROR */
  showError(error) {
    this.toastr.errorToastr(error, 'Oops!');
  }

  // Resetear usuario y contraseña
  cleanCamps = "";
  visibility = "none";
  // Visibilidad del formulario de detalles de grupos
  horarios = "none";
  // Visibilidad del formulario de personal
  perso = "block";
  // Valor de lo disables
  // Valor del tipo de personal
  selectedtp = '1';
  // Ocultar el campo de contraseña por defecto
  hide = true;
  // Que aparezca hombre selecciondo por defecto en el select de sexo
  selectedsex = 'Hombre';
  // Que aparezca soltero seleccionado por defecto en el select de estado civil
  selectedestado = 'Soltero(a)';

  // Interfaz de personal
  personal: Personal[];

  // Campos a guardar personal
  persona: Personal = {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada: null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null, idsuc: null, fotopersonal: null
  };

  // Variables de id e index para los metodos relacionados con la base de datos
  idp: any;
  idper: number;

  // Interfaz de detalle de grupos
  detallegrupos: Detallegrupos[];
  email: any;

  // Campos a guardar detalle grupos
  detallegrupo: Detallegrupos = {
    iddgru: null,
    idd: null,
    idh: null,
    idp: this.idper,
    idsuc: null

  };

  jstoday: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }

  sucursal: number
  constructor(private personalService: PersonalService, private detallegruposService: DetallegruposService,
    private _formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, public toastr: ToastrManager,
    private atp: AmazingTimePickerService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public tPersonal: TipopersonalService,
    public dialog: MatDialog, public horarioService: HorariosService, public tipopersonalService: TipopersonalService, public notifications: NotificationsService, public horarioPersona: GruposAlumnosService
    , private uploadService: FileuploadService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-design/hora.svg'));
    this.sucursal = Number(localStorage.getItem('sucursal'))

  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
  }

  fControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  /* Mensajes de error de las validaciones */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
      this.fControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  /* -------------------------------- METODOS DEL CRUD EN LA BASE DE DATOS -------------------------------- */

  // Guardar la informacion del personal
  savePersonal(persona) {
    console.log(persona)
    this.showBarra()
    this.uploadService.uploadFilePersonal(this.archivo)
      .subscribe(
        datos => {
          if (datos['resultado'] == 'OK') {
            // alert(datos['mensaje']);
            // this.router.navigate(['home']);

          }
        }
      );
    this.persona.idsuc = localStorage.getItem("sucursal")
    this.personalService.save(persona).subscribe((data) => {
      this.hideBarra()
      this.showSuccesSave();
      console.log(this.cond)
      if (this.cond[0].permisos == 1 && this.cond[0].maestro == 1) {
        this.idp = data;
        this.idper = this.idp.idper;
        this.horarios = "";
        this.perso = "none";

      } else {
        this.router.navigateByUrl('/personal');
      }
    }, (error) => {
      this.hideBarra()

      this.showError(error.error.curp[0]);

    });


  }

  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }

  seleccionarArchivo(event) {
    // this.btnChange = ""
    this.jstoday = new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo = this.jstoday + this.archivo.nombreArchivo
    this.persona.fotopersonal = this.archivo.nombreArchivo;

    /* -------------------- */
    var archivos = event.target.files
    var archivo = archivos[0]
    var lector = new FileReader()
    var vista_previa

    lector.onloadend = () => {
      this.img.nativeElement.src = lector.result
    }


    if (archivo) {
      lector.readAsDataURL(archivo)
    } else {
      vista_previa = ''
    }

    /* -------------------- */

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }

  saveDetallegrupos(horariopersonal, index) {
    this.detallegrupo.idsuc = this.sucursal
    this.detallegrupo.idd = horariopersonal.idd
    this.detallegrupo.idh = horariopersonal.idh
    this.detallegrupo.idp = this.idper;
    this.detallegruposService.save(this.detallegrupo).subscribe((data) => {
      console.log(data)
      // this.showSuccesSave();
      // let dia = horariopersonal.idd
      // let hora = horariopersonal.idh
      // this.horario.splice(horas => horas.iddia == dia && horas.idh == hora, 1)
      // this.horas = this.horario
      this.removeTab(index);
    }, (error) => {
      console.log(error)
      this.showErrorSave();
    });
    
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
      this.persona.horaentrada = time;
    });
  }
  opens() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTimes = time;
      this.persona.horasalida = time;
    });
  }


  nuevoTPersonal() {
    let tpersonal: Tipopersonal
    const dialogRef = this.dialog.open(TpaddComponent, {
      data: { tpersonal: tpersonal }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.tipopersonalService.add(this.tipopersonalService.getDialogData()).subscribe((data) => {
          this.selectTPersonal.push(data)


          this.notifications.showSuccessAdd();
          this.hideBarra();
        }, (error) => {
          this.notifications.showError();
          this.hideBarra();

        });

      }
    });
  }

  getHorario() {
    this.personalService.getHorario().subscribe((data) => {
      console.log(data)
      this.horario = data
      var hash = {};
      this.dias = this.horario.filter(function (dias) {
        var exists = !hash[dias.iddia] || false;
        hash[dias.iddia] = true;
        return exists;
      })
    }, (error) => {
      console.log(error)
    })
  }

  diasChange(id) {
    this.horas = null
    this.horas = this.horario.filter(horas => horas.iddia == id)
    // console.log(this.horas)   
    this.horas = this.horas.filter(horas => horas.idsuc == this.sucursal)
    // console.log(this.horas)

  }


  nuevoDia() {

  }

  nuevoHorario(horario: Horario) {
    const dialogRef = this.dialog.open(HaddComponent, {
      data:
      {
        horario: horario
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.horarioService.add(this.horarioService.getDialogData()).subscribe((data) => {
          let addH = data
          console.log(addH)
          this.horas.push(addH)
        })
      }
    })
  }


}
