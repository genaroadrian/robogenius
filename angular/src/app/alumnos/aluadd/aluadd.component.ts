import { Component, OnInit, Directive } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Dias } from 'src/app/interfaces/dias';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { GruposAlumnos } from 'src/app/interfaces/gruposalumnos';
import { Horas } from 'src/app/interfaces/horas';
import { GethorariosService } from 'src/app/services/gethorarios.service';
import { Personal } from 'src/app/interfaces/personal';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';
import { MatSlideToggleChange } from '@angular/material';
import { Memalumnos } from 'src/app/interfaces/memalumno';
import { MemalumnoService } from 'src/app/services/memalumno.service';
import { GruposAlumnosService } from 'src/app/services/grupos-alumnos.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { NG_VALIDATORS } from '@angular/forms';
import { FileuploadService } from 'src/app/services/fileupload.service';


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

@Directive({
  selector: '[emailDomain][ngModel]', 
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: emailDomainValidator,
      multi: true 
    }
  ]
})
class EmailDomainValidator {
}
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
  myForm: FormGroup;
  email: any;

  jstoday:any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }


  /* ---------------------- Declaraión de variables ---------------------- */

  ids: number = Number(localStorage.getItem('sucursal'))
  noms: string = localStorage.getItem('sucuname')

// Payppal
  public payPalConfig?: IPayPalConfig;

  /* Todas las escuelas */
  escuelas: any

  // ID del grupo o clases
  idgrupo: any;

  // Variable donde se almacenara los datos guardados en la base de datos
  alu;

  // Resetear los valores del dia
  diavalue;

  // Resetear los valores de los horarios
  horavalue;

  // Resetear los valores del personal
  pervalue;

  // Total de clases
  tclases;

  // Variable que desabilita las clases
  clasesbutton = false;

  // Clase actual (en la asignacion de grupos)
  clasenow = 1;

  // Visibilidad de los formularios
  precioinscripcion: number;

  // Visibilidad de la vista de alumnos
  alumnosview = "";

  // Visibilidad de la vista de las membresias
  membresiaview = "none";

  // Visibilidad de la vista de tipo de pago
  tipopagoview = "none";

  // Visibilidad de la vista de grupos
  gruposview = "none";

  // Vista de las imagenes contenidas en la vista de tipo de pagos
  tipoimg = "";

  // Vista de pago pro efectivo
  efec = "none";

  // Vista de tipo de pago por PayPal
  payp = "none";

  // Vista de tipo de pago por tarjeta de credito
  tarje = "none";

  // Vista de pago por transferencia bancaria
  transfe = "none";

  // Variables del total a pagar el adeltando y el restante
  totalpago;
  adelanto;
  restante;


  idsuc: any


  //  Display y label hora y personal
  spinerh = "none";
  labelh = "";
  spinnerp = "none";
  labelp = "";

  // Esconder la contraseña en el input 
  hide = true;

  // Costo de la inscripcion-------------
  anualidad = 350;
  // ------------------------------------

  // Toggle button que agrega el precio de la inscripción en el total <desabolitado>
  cheked = false;

  viewesc = 'none'


  /* --------------------------- Declaración de interfaces --------------------------- */

  // Horas obtenidas de laravel
  _allHoras: Horas[];

  // Personal obtenido de larabel
  _allPersonal: Personal[];



  // Validaciones de el formulario
  fControl = new FormControl('', [
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
      hora: null,
      idsuc:null,
    }

  // Imterfaz de la tabla Tipo de membresia
  tmem: Tipomembresia =
    {
      idtmem: null,
      nombre: null,
      costo: null,
      clases: null,
      idesc: null
    }

  // Interfaz de la membresia por alumno
  malu: Memalumnos =
    {
      idmemalu: null,
      idalu: null,
      idmem: null,
      idtpago: null,
      adelanto: null,
      restante: null,
      total: null
    }



  // Interfaz declarada para todas las membresias
  _allMembresias: Tipomembresia[];

  // Interfaz de la tabla detalle grupos
  detallegrupos: Detallegrupos =
    {
      iddgru: null,
      idd: null,
      idh: null,
      idp: null
    }

  // Interfaz de personal
  persona: Personal = {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada: null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null,idsuc:null,fotopersonal:null
  };
  showSuccess: boolean;

  /* Mensjaes de error */ 

  getErrorMessage() {
    return this.fControl.hasError('required') ? 'Campo obligatorio' :
     // this.fControl.hasError('email') ? 'Ingrese un correo valido' :
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
    private tmembresia: TipomembresiaService, private memaluService: MemalumnoService,
    private galuService: GruposAlumnosService, private router :Router,
    private escuelasService: EscuelasService,
    private uploadService: FileuploadService  ) {
      this.idsuc=localStorage.getItem('sucursal')
     }


    logout(){
      localStorage.removeItem('email');
      this.router.navigateByUrl('/login');
    }



  ngOnInit(): void {
    this.getEscuelas()
    this.initConfig();
    this.getTipomem();
  }
  createFormControls(){
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
  }

  getEscuelas()
  {
    this.escuelasService.get().subscribe((data)=>{
      this.escuelas = data

      this.escuelas=this.escuelas.filter(data=>data.idscu==this.idsuc);
    },(error)=>{
    })
  }
   sucursal=localStorage.getItem("sucursal");


  // Interfaz de la tabla alumnos
  alumno: Alumnos = {
    idalu: null, nomalu: null,
    apealu: null, fnacalu: null,
    sexoalu: null, domalu: null,
    telalu: null, correoalu: null,
    medicacion: null, alergias: null,
    perfilalu: null, cronica: null,
    otro: null, escuela: null,
    usuarioalu: null, pswalu: null,
    nompad: null, apepad: null,
    dompad: null, telpad: null,
    correopad: null, ocupad: null,
    nommad: null, apemad: null,
    dommad: null, telmad: null,
    correomad: null, ocupmad: null,
    finscripcion: null, usuariopad: null,
    pswpad: null, activo: null,
    idsuc: null, idesc: null, nombre: null
  };

  // Obtiene el tipo de membresias
  getTipomem() {
    this.tmembresia.getMemalu().subscribe((data: Tipomembresia[]) => {
      this._allMembresias = data;
      // console.log(this._allMembresias);
    }, (error) => {

    });
  }
  seleccionarArchivo(event) {
    // this.btnChange = ""
    this.jstoday= new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo=this.jstoday+this.archivo.nombreArchivo
    this.alumno.perfilalu=this.archivo.nombreArchivo;

 

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }


  // Metodo para guardar alumnos
  saveAlumno(alumno) {

    this.uploadService.uploadFile(this.archivo)
    .subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          // alert(datos['mensaje']);
          // this.router.navigate(['home']);

        }
      }
    );
    this.alumno.idsuc=localStorage.getItem("sucursal");
    // Se envian los datos al servicio de alumnos para guardar los datos en la BD
    this.alumnosService.save(alumno).subscribe((data) => {
      if(alumno.idesc ==  null)
    {
      this.alumnosview = "none";
      this.membresiaview = "";
      // Recupera todo el array del alumno guardado que regresa la base de datos
      this.alu = data;
      this.malu.idalu = this.alu.idalu;
      this.gruposAlumnos.idalu = this.alu.idalu;
      
      
      
    }else{
      this.alumnosview = 'none'
      this.viewesc = ''
      this.showSuccesSave();
    }
      
    }, (error) => {
      this.showErrorSave();
      console.log(error);
    });
  }

  // Guarda el tipo de membresia escogido
  saveMem(idtmem, costo, clases) {
    // console.log(idtmem);
    this.membresiaview = "none";
    this.tipopagoview = "";
    this.totalpago = costo;
    this.malu.idmem = idtmem;
    this.tclases = clases;
  }

  // Boton de regresar a las membresias
  returntmem() {
    this.membresiaview = "";
    this.tipopagoview = "none";
  }

  escuelasChange(id: number)
  {
    if(id ==  Number(localStorage.getItem('sucursal')))
    {
      this.alumno.idesc = null
      this._allMembresias =  this._allMembresias.filter(mem=> mem.idesc == null)
    }else
    {
      this._allMembresias =  this._allMembresias.filter(mem=> mem.idesc == id)
    }
    
  }

  // Guarda el tipo de pago escogido
  saveTpago() {

    this.malu.adelanto = this.adelanto;
    this.malu.restante = this.totalpago - this.adelanto;
    this.malu.total = this.totalpago;
    // console.log(this.malu);
    this.memaluService.save(this.malu).subscribe((data) => {
      this.showSuccesSave();
      this.tipopagoview = "none";
      this.gruposview = "";
    }, (error) => {
      this.showErrorSave();
      console.log(error);
    });
  }

  // Regresa a la vista de tipo de pagos
  returntpago() {
    this.tipopagoview = "";
    this.tipoimg = "";
    this.gruposview = "none";
    this.efec = "none";
    this.payp = "none"
    this.tarje = "none"
    this.transfe = "none"
  }



  // Obtiene las horas dependiendo el dia que se ha escogido
  diasChange(dia) {
    this.hora.idh = null;
    this.idgrupo = null;
    this.horavalue = "";
    this.pervalue = "";
    this.labelh = "none"
    this.spinerh = "";
    this.gethorarios.getHora(dia).subscribe((data: Horas[]) => {
      this._allHoras = data;
      this.labelh = ""
      this.spinerh = "none";
      this.horavalue = "";
      this.detallegrupos.idd = dia.iddia;
      // console.log(this.detallegrupos);
      if (this._allHoras.length < 1) {
        this.showDisp();
      }
    }, (error) => {
      // console.log(error);

    });
    this.horavalue = "";
  }

  // Obtiene el personal y el id del grupo dependiendo la hora, el dia elegido y el personal escogido
  horasChange(hora) {
    this.idgrupo = null;
    this.pervalue = "";
    this.labelp = "none";
    this.spinnerp = "";
    this.detallegrupos.idh = hora.idh;
    // console.log(this.detallegrupos);
    this.gethorarios.getPersonal(this.detallegrupos).subscribe((data: Personal[]) => {
      this._allPersonal = data;
      this._allPersonal=this._allPersonal.filter(datas=>datas.idsuc==this.idsuc)
       console.log(this._allPersonal)
      this.labelp = "";
      this.spinnerp = "none";
      // console.log(this._allPersonal);
    }, (error) => {

    });
  }

  // Obteine el id del grupo al cambiar el personal
  personalChange(id) {

    this.gruposAlumnos.idg = id;
  }

  // Muestra la vista de tipo de pago de efectivo
  efectivo(id) {
    this.tipoimg = "none";
    this.efec = "";
    this.malu.idtpago = id;
    // console.log(id);

  }

  // Guarda los grupos por alumno
  saveGalu() {
    if (this.clasenow == this.tclases) {
      this.clasesbutton = true;
    }
    console.log(this.gruposAlumnos)
    this.galuService.save(this.gruposAlumnos).subscribe((data) => {
      console.log(data)
      this.showSuccesSave();
      this.diavalue = "";
      this.horavalue = "";
      this.pervalue = "";
      if (this.clasenow < this.tclases) {
        this.clasenow++;
      }
    }, (error) => {
      this.showErrorSave();
      console.log(error);
    });
    
  }
  paypal() {
    this.tipoimg = "none";
    this.payp = "";
  }

  // Aumenta el precio de la inscripcion cuando se activa el toggle button de incripción
  inscripcion(event: MatSlideToggleChange) {
    if (this.cheked == false) {
      this.totalpago = this.totalpago + this.anualidad;
      this.cheked = true
      // console.log(this.cheked)
    } else {
      this.totalpago = this.totalpago - this.anualidad;
      this.cheked = false
      // console.log(this.cheked)
    }
  }

  // Boton de finalizar todo el proceso
  finalizar() {
    console.log("Finalizacion")
  }

 
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

