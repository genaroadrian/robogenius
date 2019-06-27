import { Component, OnInit,AfterViewChecked  } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Dias } from 'src/app/interfaces/dias';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { GruposAlumnos } from 'src/app/interfaces/gruposalumnos';
import { Observable } from 'rxjs';
import { Horas } from 'src/app/interfaces/horas';
import { GethorariosService } from 'src/app/services/gethorarios.service';
import { Personal } from 'src/app/interfaces/personal';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';
import { MatSlideToggleChange } from '@angular/material';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


// declare let paypal: any;

@Component({
  selector: 'app-aluadd',
  templateUrl: './aluadd.component.html',
  styleUrls: ['./aluadd.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AluaddComponent implements OnInit {


// Payppal
  public payPalConfig?: IPayPalConfig;

  
  // Imterfaz de la tabla Tipo de membresia
  tmem: Tipomembresia =
    {
      idtmem: null,
      nombre: null,
      costo: null,
      clases: null
    }

  _allMembresias: Tipomembresia[];

  // Interfaz de la tabla detalle grupos
  detallegrupos: Detallegrupos =
    {
      iddgru: null,
      idd: null,
      idh: null,
      idp: null,
      idalu: null
    }

  // Visibilidad de los formularios
  precioinscripcion: number;
  alumnosview = "";
  membresiaview = "none";
  tipopagoview = "none";
  gruposview = "none";
  tipoimg = "";
  efec = "none";
  payp = "none";
  tarje = "none";
  transfe = "none";

  // Valor del total a pagar 
  totalpago;
  adelanto;
  restante;

  // Costo de la inscripcion
  anualidad = 350;

  // Toggle desabolitado
  cheked = false;

  // Horas obtenidas de laravel
  _allHoras: Horas[];

  // Personal obtenido de larabel
  _allPersonal: Personal[];

  //  Display y label hora y personal
  spinerh = "none";
  labelh = "";
  spinnerp = "none";
  labelp = "";

  // Esconder la contraseña en el input 
  hide = true;

  // Validaciones de el formulario
  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  // Interfaz de la tabla de grupos por alumno
  gruposAlumnos: GruposAlumnos =
    {
      idgalu: null,
      idg: null,
      idalu: null
    }

  // Interfaz de la tabla dias
  dia: Dias =
    {
      iddia: null,
      dia: null
    }

  // Interfaz de la tabla horas
  hora: Horas =
    {
      idh: null,
      hora: null
    }

  // Interfaz de personal
  persona: Personal = {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada: null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null
  };
  showSuccess: boolean;

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un correo valido' :
        '';
  }

  padresControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getPadresMessage() {
    return this.padresControl.hasError('required') ? 'Campo obligatorio perro' :
      this.padresControl.hasError('email') ? 'Ingrese un correo valido' :
        '';
  }

  // Notificación de success al eliminar
  showSuccesSave() {
    this.toastr.successToastr('Registro guardado', 'Exito!');
  }

  // Notificacion de error al eliminar
  showErrorSave() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Notificacion de que no hay registros de horas y personal disponible
  showDisp() {
    this.toastr.infoToastr('No hay horarios disponibles', 'Oops!');
  }

  constructor(private alumnosService: AlumnosService, private httpClient: HttpClient,
    public toastr: ToastrManager, private gethorarios: GethorariosService,
    private tmembresia: TipomembresiaService) {
  }



  ngOnInit(): void {
    this.initConfig();
    this.getTipomem();
  }


  // Interfaz de la tabla alumnos
  alumno: Alumnos = {
    idalu: null,
    nomalu: null,
    apealu: null,
    fnacalu: null,
    sexoalu: null,
    domalu: null,
    telalu: null,
    correoalu: null,
    medicacion: null,
    alergias: null,
    perfilalu: null,
    cronica: null,
    otro: null,
    evaluacion: null,
    usuarioalu: null,
    pswalu: null,
    nompad: null,
    apepad: null,
    dompad: null,
    telpad: null,
    correopad: null,
    ocupad: null,
    nommad: null,
    apemad: null,
    dommad: null,
    telmad: null,
    correomad: null,
    ocupmad: null,
    finscripcion: null,
    usuariopad: null,
    pswpad: null,
    activo: null,
    idsuc: null
  };

  getTipomem() {
    this.tmembresia.getMemalu().subscribe((data: Tipomembresia[]) => {
      this._allMembresias = data;
      console.log(this._allMembresias);
    }, (error) => {

    });
  }

  saveMem(idtmem, costo) {
    console.log(idtmem);
    this.membresiaview = "none";
    this.tipopagoview = "";
    this.totalpago = costo;
  }

  returntmem() {
    this.membresiaview = "";
    this.tipopagoview = "none";
  }

  saveTpago() {
    this.tipopagoview = "none";
    this.gruposview = "";
  }

  returntpago() {
    this.tipopagoview = "";
    this.tipoimg = "";
    this.gruposview = "none";
    this.efec = "none";
    this.payp = "none"
    this.tarje = "none"
    this.transfe = "none"
  }

  // Metodo para guardar alumnos
  saveAlumno(alumno) {
    alumno.restante = alumno.total - alumno.adelanto;
    console.log(alumno.restante);
    this.alumnosview = "none";
    this.membresiaview = "";
    // this.alumnosService.save(alumno).subscribe((data)=>{

    //   this.showErrorSave();
    // },(error)=>{
    //   this.showErrorSave();
    // });  
  }

  diasChange(dia) {
    this.labelh = "none"
    this.spinerh = "";
    this.gethorarios.getHora(dia).subscribe((data: Horas[]) => {
      this._allHoras = data;
      this.labelh = ""
      this.spinerh = "none";
      this.detallegrupos.idd = dia.iddia;
      console.log(this.detallegrupos);
      if (this._allHoras.length < 1) {
        this.showDisp();
      }
    }, (error) => {
      console.log(error);

    });
  }

  horasChange(hora) {
    this.labelp = "none";
    this.spinnerp = "";
    this.detallegrupos.idh = hora.idh;
    console.log(this.detallegrupos);
    this.gethorarios.getPersonal(this.detallegrupos).subscribe((data: Personal[]) => {
      this._allPersonal = data;
      this.labelp = "";
      this.spinnerp = "none";
      console.log(this._allPersonal);
    }, (error) => {

    });
  }

  efectivo() {
    this.tipoimg = "none";
    this.efec = "";
  }
  paypal() {
    this.tipoimg = "none";
    this.payp = "";
  }

  inscripcion(event: MatSlideToggleChange) {
    if (this.cheked == false) {
      this.totalpago = this.totalpago + this.anualidad;
      this.cheked = true
      console.log(this.cheked)
    } else {
      this.totalpago = this.totalpago - this.anualidad;
      this.cheked = false
      console.log(this.cheked)
    }
  }





  // addScript: boolean = false;
  // paypalLoad: boolean = true;
  


  // paypalConfig = {
  //   env: 'sandbox',
  //   client: {
  //     // sandbox: 'ARjodSEBZ_5YeXgiEVkH1-I7VrU0b6YLoFtYN9zqSuYn_d_K4dM4sLlZHKs_hyF3JZPQAU6Dm6SqxyT_',
  //     sandbox: '<your-sandbox-key-here>',
  //     production: 'Afpk-YhqAeYTIeL008oY11RHq3dyBTt4NRSwut0iPf2CIRbLtX3T7VmhcAurkpiFjvyoG8HMweEN99fw'
  //   },
  //   commit: true,
  //   payment: (data, actions) => {
  //     return actions.payment.create({
  //       payment: {
  //         transactions: [
  //           { amount: { total: this.adelanto, currency: 'MXN' } }
  //         ]
  //       }
  //     });
  //   },
  //   onAuthorize: (data, actions) => {
  //     return actions.payment.execute().then((payment) => {
  //       //Do something when payment is successful.
  //     })
  //   }
  // };

  // ngAfterViewChecked(): void {
  //   if (!this.addScript) {
  //     this.addPaypalScript().then(() => {
  //       paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
  //       this.paypalLoad = false;
  //     })
  //   }
  // }
  
  // addPaypalScript() {
  //   this.addScript = true;
  //   return new Promise((resolve, reject) => {
  //     let scripttagElement = document.createElement('script');    
  //     scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
  //     scripttagElement.onload = resolve;
  //     document.body.appendChild(scripttagElement);
  //   })
  // }



 
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'MXN',
    // clientId: 'Afpk-YhqAeYTIeL008oY11RHq3dyBTt4NRSwut0iPf2CIRbLtX3T7VmhcAurkpiFjvyoG8HMweEN99fw',
    clientId: 'Afpk-YhqAeYTIeL008oY11RHq3dyBTt4NRSwut0iPf2CIRbLtX3T7VmhcAurkpiFjvyoG8HMweEN99fw',
    

    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: this.adelanto,
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.adelanto
              }
            }
          },
          items: [
            {
              name: 'Robogenius Membrecia ',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'MXN',
                value: this.adelanto,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}

