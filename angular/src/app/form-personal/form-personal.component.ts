import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import { Tipopersonal } from '../interfaces/tipopersonal';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../interfaces/personal';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Detallegrupos } from '../interfaces/detallegrupos';
import { DetallegruposService } from '../services/detallegrupos.service';
import {formatDate } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AmazingTimePickerService } from 'amazing-time-picker';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { TpaddComponent } from '../tipopersonal/tpadd/tpadd.component';
import { MatDialog } from '@angular/material';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})


export class FormPersonalComponent implements OnInit {
  public selectedTime: string;
  public selectedTimes: string;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  /* Visibilidad de la barra de carga */
  barra = "none"

   /* Almacena todos los tipos de personal */
   selectTPersonal: any

  /* ---------------------------- CONFIGURACIÓN DE LA PAGINA ---------------------------- */

  // Progrmacación de las tabs en el modulo de detalle de grupos
  tabs = ['Horario'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
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
    this.tPersonal.get().subscribe((data)=>{
      this.selectTPersonal = data
    },(error)=>{
    })
  }

  // Change the user and password input and groups module visibility 
  tipoChange(event) {
    if (this.selectedtp == "2" || this.selectedtp == "1" || this.selectedtp == "3") {
      this.isDisable = false;
      this.visibility = "block";
    } else {
      this.isDisable = true;
      this.visibility = "none";
    }
  }

   // Notificación de success al eliminar
   showSuccesSave() {
    this.toastr.successToastr('Registro guardado','Exito!');
  }

  // Notificacion de error al eliminar
  showErrorSave() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Resetear usuario y contraseña
  cleanCamps = "";
  visibility = "none";
  // Visibilidad del formulario de detalles de grupos
  horarios = "none";
  // Visibilidad del formulario de personal
  perso = "block";
  // Valor de lo disables
  isDisable = true;
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
  persona: Personal =  {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada:null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null
  };

  // Variables de id e index para los metodos relacionados con la base de datos
  idp: any;
  idper: number;

  // Interfaz de detalle de grupos
  detallegrupos: Detallegrupos[];

  // Campos a guardar detalle grupos
  detallegrupo: Detallegrupos = {
    iddgru: null,
    idalu: null,
    idd: null,
    idh: null,
    idp: this.idper
  };

  constructor(private personalService: PersonalService , private detallegruposService: DetallegruposService,
    private _formBuilder: FormBuilder, private httpClient: HttpClient,private router: Router, public toastr: ToastrManager, 
    private atp: AmazingTimePickerService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,public tPersonal: TipopersonalService,
    public dialog: MatDialog, public tipopersonalService: TipopersonalService, public notifications: NotificationsService) 
    {
      iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-design/hora.svg'));
  
    }
    

    /* -------------------------------- METODOS DEL CRUD EN LA BASE DE DATOS -------------------------------- */

    // Guardar la informacion del personal
    savePersonal(persona)
    {
      this.personalService.save(persona).subscribe((data)=>{
        this.showSuccesSave();
        // console.log(data);
        this.idp = data;
        this.idper = this.idp.idper;
      },(error)=>{
        alert('Ocurrio un error');
        console.log(error);
        this.showErrorSave();
      });
      if(persona.idtper == 2){
        this.horarios = "block";
        this.perso = "none";
      }else{
        this.router.navigate(['/personal']);
      }
      
    }

    /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }

  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }

    saveDetallegrupos(index)
    {
      this.detallegrupo.idp = this.idper;
      console.log(this.detallegrupo);
      this.detallegruposService.save(this.detallegrupo).subscribe((data)=>{
      // console.log(data);
      this.showSuccesSave();
      }, (error)=>{
        console.log(error);
        this.showErrorSave();
      });
      this.removeTab(index);
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


    nuevoTPersonal(tpersonal: Tipopersonal)
    {
      /* abrir un pequeño modal para agregar otro tipo de personal */
      const dialogRef = this.dialog.open(TpaddComponent, {
        data: { tpersonal: tpersonal }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.showBarra()
          this.tipopersonalService.add(this.tipopersonalService.getDialogData()).subscribe((data) => {
            this.selectTPersonal.push(data)
            // this.tipopadd = data
            // this.exampleDatabase.dataChange.value.push(this.tipopadd);
            // this.refreshTable()
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

}
