import { Component, OnInit, Directive, ViewChild } from '@angular/core';
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
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { Memalumnos } from 'src/app/interfaces/memalumno';
import { MemalumnoService } from 'src/app/services/memalumno.service';
import { GruposAlumnosService } from 'src/app/services/grupos-alumnos.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { NG_VALIDATORS } from '@angular/forms';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { AddtipomemComponent } from 'src/app/tipomembresias/addtipomem/addtipomem.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { globalVarimg } from '../../services/global.service';
import {CategoriaService} from 'src/app/services/categoria.service';
import * as jsPDF from 'jspdf';





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
import { from } from 'rxjs';
import { contabilidad } from 'src/app/interfaces/contabilidad';
import { LoginService } from 'src/app/services/login.service';

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
  API_ENDPOINT = globalVarimg.url


  @ViewChild('Profile') img;

  myForm: FormGroup;
  email: any;
  infoEscuela: any

  jstoday: any;
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

  nombredelamembresia:any


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

  tipodepago:any;
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
      idsuc: null,
    }

  // Imterfaz de la tabla Tipo de membresia
  tmem: Tipomembresia =
    {
      idtmem: null,
      nombre: null,
      costo: null,
      clases: null,
      idesc: null,
      idsuc: null
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
      total: null,
      idsuc:null,
      fechaini:null,
      fechater:null
    }

    fechaini:any;
    fechater:any;

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
    tareasasignadas: null, idtper: null, activo: null, idsuc: null, fotopersonal: null
  };
  showSuccess: boolean;

  cont:contabilidad = {
  
    Concepto: null,
    fecha: null,
    tipo: 1,
    monto: null,
    idcate:null,
    iduser:null,
    nombre: null,
    activo: 1,
    status:null,
    adelanto:null,
    restante:null,
    suma:null,
    idscu:null,
    idsuc:null
  };

  selected:any

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

  constructor(private cat:CategoriaService,private alumnosService: AlumnosService, private httpClient: HttpClient,
    public toastr: ToastrManager, private gethorarios: GethorariosService,
    private tmembresia: TipomembresiaService, private memaluService: MemalumnoService,
    private galuService: GruposAlumnosService, private router: Router,
    private escuelasService: EscuelasService,
    private uploadService: FileuploadService, public tmemService: TipomembresiaService,
    public dialog: MatDialog, public notifications: NotificationsService,private service:LoginService) {
    this.idsuc = localStorage.getItem('sucursal')
  }


  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login');
  }


  public  emai = localStorage.getItem("email");

  ngOnInit(): void {
    this.getEscuelas()
    this.initConfig();
    this.getTipomem();

    this.service.getPersonas()
    .subscribe(data=>{
      let logs=data;
      this.selected = logs.filter(x => x.email == this.emai)
      
      this.cont.iduser = this.selected[0].id
      this.cont.nombre= this.selected[0].subname
      

      // this.datos=data;
      // this.imagen=this.datos.avatar;
      // x:this.datos;
    })
  }
  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
  }

  getEscuelas() {
    this.escuelasService.get().subscribe((data) => {
      this.escuelas = data

      this.escuelas = this.escuelas.filter(data => data.idscu == this.idsuc);
    }, (error) => {
    })
  }
  sucursal = localStorage.getItem("sucursal");


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
      this._allMembresias = this._allMembresias.filter(x => (x.idsuc == this.sucursal))
    }, (error) => {

    });
  }
  seleccionarArchivo(event) {
    // this.btnChange = ""
    this.jstoday = new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo = this.jstoday + this.archivo.nombreArchivo
    this.alumno.perfilalu = this.archivo.nombreArchivo;

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


  // Metodo para guardar alumnos
  saveAlumno(alumno) {

    this.uploadService.uploadFile(this.archivo)
      .subscribe(
        datos => {
          if (datos['resultado'] == 'OK') {
            // alert(datos['mensaje']);
            // this.router.navigate(['home']);

          }
        }
      );
    this.alumno.idsuc = localStorage.getItem("sucursal");
    // Se envian los datos al servicio de alumnos para guardar los datos en la BD
    this.alumnosService.save(alumno).subscribe((data) => {
      // console.log(data)
      if (alumno.idesc == null) {
        this.alumnosview = "none";
        this.membresiaview = "";
        // Recupera todo el array del alumno guardado que regresa la base de datos
        this.alu = data;
        this.malu.idalu = this.alu.idalu;
        this.gruposAlumnos.idalu = this.alu.idalu;



      } else {
        this.alumnosview = 'none'
        this.viewesc = ''
        this.infoEscuela = data
        // console.log(this.infoEscuela)
        this.showSuccesSave();
      }

    }, (error) => {
      this.showErrorSave();
      // console.log(error);
    });
  }

  // Guarda el tipo de membresia escogido
  saveMem(idtmem, costo, clases,nombre) {
    // // console.log(idtmem);
    this.nombredelamembresia=nombre
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

  escuelasChange(id: number) {
    if (id == Number(localStorage.getItem('sucursal'))) {
      this.alumno.idesc = null
      this._allMembresias = this._allMembresias.filter(mem => mem.idesc == null)
    } else {
      this._allMembresias = this._allMembresias.filter(mem => mem.idesc == id)
    }
 
  }

  // Guarda el tipo de pago escogido
  saveTpago() {
    this.malu.idsuc=this.sucursal
    this.malu.adelanto = this.adelanto;
    this.malu.restante = this.totalpago - this.adelanto;
    this.malu.total = this.totalpago;
    this.malu.fechaini=this.fechaini
    this.malu.fechater=this.fechater
    this.cont.status=1
    this.cont.Concepto="Membrecia del alumno: " + this.alumno.nomalu + " " + this.alumno.apealu;
    // this.cont.fecha=now
    this.cont.monto=this.malu.total
    this.cont.adelanto=this.malu.adelanto
    this.cont.restante=this.malu.restante
    this.cont.suma=this.malu.adelanto
    this.cont.idsuc=this.idsuc
    this.cont.idscu=this.idsuc
    this.cont.fecha=this.fechaini

  // // console.log(this.cont)
    this.cat.savemem(this.cont)
    .subscribe((data) =>{
      // console.log(data)
      // this.personalService.tput(this.data);
    },(error)=>{
    // console.log(error)
    });
    // // console.log(this.malu);
    this.memaluService.save(this.malu).subscribe((data) => {
      this.showSuccesSave();
      this.tipopagoview = "none";
      this.gruposview = "";
    }, (error) => {
      this.showErrorSave();
      // console.log(error);
    });

    this.pdf()

  }
  pdf(){

    if(this.alumno.cronica==null){
      this.alumno.cronica="NINGUNA"
    }
    if(this.alumno.medicacion==null){
      this.alumno.medicacion="NINGUNA"
    }
    if(this.alumno.alergias==null){
      this.alumno.alergias="NINGUNA"
    }
    if(this.alumno.otro==null){
      this.alumno.otro="NINGUNA"
    }
    if(this.malu.idtpago==1){
      this.tipodepago="Efectivo";
    }
    if(this.malu.idtpago==2){
      this.tipodepago="Paypal";
    }

    let docs = new jsPDF();
    var img = new Image()
    var imgs = new Image()
    img.src = 'assets/images/rg.png';

    // imgs.src = this.API_ENDPOINT+'perfiles/Alumnos/default.jpg';

    docs.addImage(img, 'png', 159,4, 40,20)
    docs.setFontSize(14);
    docs.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    docs.setFontType("normal");
    docs.text(70,20, 'FORMATO DE INSCRIPCIÓN');
    docs.text(10,30, 'Datos del alumno');
    docs.setDrawColor(255, 0, 0);
    docs.line(10,32, 200, 32);
    docs.setFontSize(11);
    docs.text(20,40, 'Nombre del alumno: '+ this.alumno.nomalu+" "+ this.alumno.apealu);
    docs.text(20,50, 'Fecha de nacimiento: '+ this.alumno.fnacalu);
    docs.text(80,60, 'Teléfono : '+ this.alumno.telalu);
    docs.setFontSize(10);
    docs.text(20,60, 'Correo : '+ this.alumno.correoalu);
    docs.setFontSize(11);
    docs.text(90,50, 'Sexo : '+ this.alumno.sexoalu);
    docs.text(20,70, 'Domicilio : '+ this.alumno.domalu);
  // ----------------------MEDICACION DEL ALUMNO ----------------------------
    docs.setFontSize(14);
    docs.text(10,80, 'Ficha medica del alumno');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,82, 200, 82);
    docs.text(20,90, 'Enfermedad cronica : '+ this.alumno.cronica);
    docs.text(90,90, 'Medicacion : '+ this.alumno.medicacion);
    docs.text(20,100, 'Alergias : '+ this.alumno.alergias);
    docs.text(90,100, 'Otro : '+ this.alumno.otro);
  // ----------------------INFO DE SISTEMA----------------------------
    docs.setFontSize(14);
    docs.text(10,110, 'Acceso al sistema');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,112, 200, 112);
    docs.text(20,120, 'Usuario : '+ this.alumno.usuarioalu);
    docs.text(100,120, 'Contraseña : '+ this.alumno.pswalu);
  // ----------------------INFO DE PADRES----------------------------
    docs.setFontSize(14);
    docs.text(10,130, 'Informacion de los padres');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,132, 200, 132);
    docs.setFontSize(13);
    docs.text(20,140, 'MADRE ');
    docs.setFontSize(11);
    docs.text(20,150, 'Nombre : '+ this.alumno.nommad + this.alumno.apemad);
    docs.text(20,160, 'Telefono : '+ this.alumno.telmad);
    docs.text(20,170, 'Ocupacion : '+ this.alumno.ocupmad);
    var lMargins=20; //left margin in mm
    var rMargins=110; //right margin in mm
    var pdfInMMs=210;  // width of A4 in mm
    var paragraphs="Direccion: "+this.alumno.dommad;
    var liness =docs.splitTextToSize(paragraphs, (pdfInMMs-lMargins-rMargins));
    docs.text(lMargins,180,liness);
    docs.setFontSize(13);
    docs.text(110,140, 'PADRE ');
    docs.setFontSize(11);
    docs.text(110,150, 'Nombre : '+ this.alumno.nompad + this.alumno.apepad);
    docs.text(110,160, 'Telefono : '+ this.alumno.telpad);
    docs.text(110,170, 'Ocupacion : '+ this.alumno.ocupad);
    var lMargin=110; //left margin in mm
    var rMargin=20; //right margin in mm
    var pdfInMM=210;  // width of A4 in mm
    var paragraph="Direccion: "+this.alumno.dompad;
    var lines =docs.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));
    docs.text(lMargin,180,lines);
    // ----------------------Membresia ----------------------------
    docs.setFontSize(14);
    docs.text(10,200, 'Membresia');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,202, 200, 202);
    var lMargin1=20; //left margin in mm  
    var rMargin1=20; //right margin in mm
    var pdfInMM1=210;  // width of A4 in mm
    var paragraph1="La membrecia seleccionada es : "+this.nombredelamembresia+" la cual tiene un costo de $."+this.totalpago+".00 y cuenta con Crendencial del alumno,Credencial de papá autorizado, Uso de todo el material didáctico, Acceso al área de manufactura con supervisor del asesor, Ademas cuenta con "+this.tclases+" clases por semana.";
    var lines1 =docs.splitTextToSize(paragraph1, (pdfInMM1-lMargin1-rMargin1));
    docs.text(lMargin1,210,lines1);
    // ----------------------Membresia ----------------------------
    docs.setFontSize(14);
    docs.text(10,230, 'Pago');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,232, 200, 232);
    docs.text(20,240, 'Tipo de pago : '+ this.tipodepago);
    docs.text(20,250, 'Fecha de inicio  : '+ this.malu.fechaini);
    docs.text(110,250, 'Fecha de termino : '+ this.malu.fechater);
    docs.text(20,260, 'Total : $.'+ this.malu.total+".00");
    docs.text(20,270, 'Adelanto $: '+ this.malu.adelanto+".00");
    docs.text(20,280, 'Restante $: '+ this.malu.restante+".00");
    docs.setFontSize(13);
    docs.text(70,290, 'GRACIAS POR SU COMPRA ');
    // ---------------------nueva pagina-----------------------------------
    docs.addPage();    
    docs.addImage(img, 'png', 159,4, 40,20)
    docs.setFontSize(14);
    docs.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    docs.setFontType("normal");
    docs.text(70,20, 'FORMATO DE INSCRIPCIÓN');
    docs.text(10,30, 'Documentos solicitados');
    docs.setDrawColor(255, 0, 0);
    docs.line(10,32, 200, 32);
    docs.setFontSize(12);
    docs.text(20,40, 'Acta de nacimiento (copia). ');
    docs.text(140,40, '_________/_______/_______');
    docs.setFontSize(8);
    docs.text(150,44, '   Dia   /  Mes  /  Año  ');
    docs.setFontSize(12);
    docs.text(20,50, 'Identificación oficial del Padre o Tutor (copia).');
    docs.text(140,50, '_________/_______/_______');
    docs.setFontSize(8);
    docs.text(150,54, '   Dia   /  Mes  /  Año  ');
    docs.setFontSize(12);
    docs.text(20,60, 'Comprovante de domicilio (copia). ')
    docs.text(140,60, '_________/_______/_______');
    docs.setFontSize(8);
    docs.text(150,64, '   Dia   /  Mes  /  Año  ');
    docs.setFontSize(12);
    docs.text(20,70, 'Dos fotografias tamaño infantil del niño. ');
    docs.text(140,70, '_________/_______/_______');
    docs.setFontSize(8);
    docs.text(150,74, '   Dia   /  Mes  /  Año  ');
// -------------------------aviso-----------------------------------
    docs.setFontSize(14);
    docs.text(10,90, 'Aviso');
    docs.setFontSize(11);
    docs.setDrawColor(255, 0, 0);
    docs.line(10,92, 200, 92);
    var lMargin1=20; //left margin in mm  
    var rMargin1=20; //right margin in mm
    var pdfInMM1=210;  // width of A4 in mm
    var paragraph1="La persona solicitante acepta haber recibido el reglamento de ROBOGENIUS ademas complir y respetar los terminos y condiciones del mismo. Acepto y doy consentimiento para que ROBOGENIUS y sus alidos realicen publicacioes en medios digitales e impresos de fotografías y videos del alumno trabajando durante las clases, así como enentrevistas con medios de comunicación.";
    var lines1 =docs.splitTextToSize(paragraph1, (pdfInMM1-lMargin1-rMargin1));
    docs.text(lMargin1,100,lines1);
    docs.setFontSize(12);
    docs.text(20,123, '  Por favor indique  SI(  ) o NO(  ). ');
    docs.text(60,270, '____________________________________');
    docs.text(77,276, 'Nombre y firma del solicitante.');
    docs.save(this.alumno.nomalu+this.alumno.apealu+'.pdf');



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
      // console.log(data)
      this._allHoras = data;
      this._allHoras = this._allHoras.filter(x => x.idsuc == this.idsuc)
      this.labelh = ""
      this.spinerh = "none";
      this.horavalue = "";
      this.detallegrupos.idd = dia.iddia;
      // // console.log(this.detallegrupos);
      if (this._allHoras.length < 1) {
        this.showDisp();
      }
    }, (error) => {
      // // console.log(error);

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
    // // console.log(this.detallegrupos);
    this.gethorarios.getPersonal(this.detallegrupos).subscribe((data: Personal[]) => {
      // console.log(data)
      this._allPersonal = data;
      this._allPersonal = this._allPersonal.filter(datas => datas.idsuc == this.idsuc)
      this.labelp = "";
      this.spinnerp = "none";
      // // console.log(this._allPersonal);
    }, (error) => {

    });
  }

  // Obteine el id del grupo al cambiar el personal
  personalChange(id) {
    // console.log(id)
    this.gruposAlumnos.idg = id;
  }

  // Muestra la vista de tipo de pago de efectivo
  efectivo(id) {
    this.tipoimg = "none";
    this.efec = "";
    this.malu.idtpago = id;
    // // console.log(id);

  }

  // Guarda los grupos por alumno
  saveGalu() {
    if (this.clasenow == this.tclases) {
      this.clasesbutton = true;
    }
    // console.log(this.gruposAlumnos)
    this.galuService.save(this.gruposAlumnos).subscribe((data) => {
      // console.log(data)
      this.showSuccesSave();
      this.diavalue = "";
      this.horavalue = "";
      this.pervalue = "";
      if (this.clasenow < this.tclases) {
        this.clasenow++;
      }
    }, (error) => {
      this.showErrorSave();
      // console.log(error);
    });

  }
  paypal(id) {
    this.tipoimg = "none";
    this.payp = "";
  }

  // Aumenta el precio de la inscripcion cuando se activa el toggle button de incripción
  inscripcion(event: MatSlideToggleChange) {
    if (this.cheked == false) {
      this.totalpago = this.totalpago + this.anualidad;
      this.cheked = true
      // // console.log(this.cheked)
    } else {
      this.totalpago = this.totalpago - this.anualidad;
      this.cheked = false
      // // console.log(this.cheked)
    }
  }

  // Boton de finalizar todo el proceso
  finalizar() {
    // console.log("Finalizacion")
  }

  newMem() {
    let tmembresia: Tipomembresia
    // Abre la ventana modal
    const dialogRef = this.dialog.open(AddtipomemComponent, {
      data: { tmembresia: tmembresia }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.tmemService.add(this.tmemService.getDialogData()).subscribe((data) => {
          this.getTipomem()
          this.notifications.showSuccessAdd()
        }, (error) => {
          this.notifications.showError();
        });

      }
    });
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
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
      },
      onError: err => {
        // console.log('OnError', err);
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
      },
    };
  }



}

