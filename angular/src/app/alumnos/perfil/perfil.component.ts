import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialog } from '@angular/material';
import { AlueditComponent } from '../aluedit/aluedit.component';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PerfilhoraeditComponent } from './perfilhoraedit/perfilhoraedit.component';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { Router } from '@angular/router';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { PerfilmemeditComponent } from '../perfilmemedit/perfilmemedit.component';
import { PerfilhoradeleteComponent } from './perfilhoradelete/perfilhoradelete.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PerfiladdmemComponent } from '../perfiladdmem/perfiladdmem.component';
import { PerfiladdhoraComponent } from '../perfiladdhora/perfiladdhora.component';
// import {formatDate } from '@angular/common';
import {globalVarimg} from '../../services/global.service';
import * as jsPDF from 'jspdf';
import { PmembresiaService } from 'src/app/services/pmembresia.service';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';
import { MemalumnoService } from 'src/app/services/memalumno.service';
import { Memalumnos } from 'src/app/interfaces/memalumno';
import { contabilidad } from 'src/app/interfaces/contabilidad';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';





@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})




export class PerfilComponent implements OnInit {

  @ViewChild('Profile') img;

  dfoto: string = 'none'

  /* Nuevo horario */
  nhorario: any

  /* cantidad de clases disponibles en la membresia actual */
  clasesMem: number
  /* Cantidad de clases en la base de datos */
  clasesDB: number

  jstoday: any;
  // today= new Date();
  API_ENDPOINT = globalVarimg.url

  datosEditMem: any


  id: number

  // Ocultar el id de las membresias
  idmemhide = "none"

  /* Opciones de la brra de progreso */

  /* barra de Progreso de la membresia  */
  barra = "none"

  /* Longitud del array de los horarios */
  l;

  /* Fechas a usar para las membresias:  */
  fecha;
  hoy;

  /* Estatus de la membresia */
  status;

  /* Icono de el status de la membresia */
  icono;

  /* Color de la letra del status de la membresia */
  color;

  pagomem;

  /* Icono de el status de la membresia */
  iconopago;

  /* Color de la letra del status de la membresia */
  colorpago;

  /* Variable para actualizar los grupos */
  ngrupo: any;

  /* Variable de la informacion del alumno traida desde la tabla de alumnos */
  datos: any;

  /* Datos que se van a mandar a el servicio para que se modifiquen en la base de datos */
  alu: any;

  /* Variable que contiene las membresias del alumno seleccionado */
  membresia: any;


  /* Tamaño de la variable de las membresias (se usa como contador las mostrar las membresias del alumno) */
  memlenght: number;

  /* Encabezados de la tabla de horarios */
  displayedColumns: string[] = ['dia', 'hora', 'instructor', 'actions'];

  /* Visibilidad de la columna de id */
  tableview = "none";

  /* Variable que contiene la informacion de los horarios del alumno */
  dataSource;
  dataSoruceUp;

  /* Variuable del expansion panel */
  panelOpenState = false;

  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }
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

  // Interfaz de la tabla alumnos
  alumnofoto: Alumnos = {
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

  tipopagoview = "";
  nmembrecia="";
  mostramem="none";
  formulario="none";
  formadepago="none";
  tablamembrecia=""
  _allMembresias:any;
  preciotmembresia:any

  adelanto:any
  totalpago:any

  efec = "none";

  // Vista de tipo de pago por PayPal
  payp = "none";

  // Vista de tipo de pago por tarjeta de credito
  tarje = "none";

  // Vista de pago por transferencia bancaria
  transfe = "none";

  tipoimg = "";

  anualidad=350

  costomembresia:any;


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
  constructor(public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager, private changeDetectorRefs: ChangeDetectorRef, private uploadService: FileuploadService,
    private router: Router, public notificationsService: NotificationsService,public pmem:PmembresiaService,private tmembresia: TipomembresiaService,private memaluService: MemalumnoService,private cat:CategoriaService,private service:LoginService) {
  }

  seleccionarArchivo(event) {
    this.jstoday = new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo = this.jstoday + this.archivo.nombreArchivo


    /* -------------------- */
    var archivos = event.target.files
    var archivo = archivos[0]
    var lector = new FileReader()
    var vista_previa

    lector.onloadend = () =>{
      this.img.nativeElement.src = lector.result
    }


    if(archivo)
    {
      lector.readAsDataURL(archivo)
    }else{
      vista_previa = ''
    }
    
    /* -------------------- */

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    this.dfoto = ''
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  upload() {
    // // console.log(this.archivo);
    this.uploadService.uploadFile(this.archivo).subscribe(
      datos => {
        if (datos['resultado'] == 'OK') {
          // alert(datos['mensaje']);
          // this.router.navigate(['alumnos']);

        }
      }
    );

    // this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss', 'en-US');

    this.alumnofoto.perfilalu = this.archivo.nombreArchivo;
    this.alumnofoto.idalu = this.datos.idalu;
    // this.datos.perfilalu=this.archivo.nombreArchivo;
    this.uploadService.subirimagen(this.alumnofoto).subscribe(data => {
      // console.log(data);
      this.showSuccessFoto()
    }, (error) => {
      // console.log(error);
      this.showError()

    })
    this.dfoto = 'none'
  }

  historial:any;
  logs:any;
  sucursal=localStorage.getItem('sucursal')
  emai=localStorage.getItem('email')

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
      this.logs=data;
      this.logs = this.logs.filter(x => x.email == this.emai)
      this.logs = this.logs.filter(x => x.email == this.emai)
      console.log(this.logs)

      this.cont.iduser= this.logs[0].id
      this.cont.nombre= this.logs[0].subname
    });
    this.getTipomem();
    
    /* Obtiene los datos del alumno (se obtienen de perfilService en el metodo "ret"), su historial de membresias y su horario */
    this.datos = this.perfilService.ret()
    // console.log(this.datos)
    // console.log(this.datos)
    this.membresias();
    this.horarios();
    this.pmem.getHistorial().subscribe(dat=>{
      this.historial=dat
      this.historial=this.historial.filter(x=>x.idscu==this.sucursal)
      console.log(this.historial)


    })
  }
  
  showSuccessFoto() {
    this.toastr.successToastr('Foto actualizada', 'Exito!');
  }

    /* Mensaje de ERROR */
    showError() {
      this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
    }

  /* Obtiene todas las membresias del alumno seleccionado */
  membresias() {

    this.perfilService.getmem(this.datos).subscribe((data) => {
      this.membresia = data;
      console.log(this.membresia)
      /* Asignacion del numero de clases de la membresia */
      this.clasesMem = Number(this.membresia[0].clases)
      
      this.memlenght = this.membresia.length;
      this.fecha = this.membresia[0].fechainicio
      this.hoy = new Date().getTime()
      this.fecha = new Date(this.fecha).getTime()
      this.fecha = (this.hoy - this.fecha) / (1000 * 60 * 60 * 24)
      // console.log(this.fecha)

      /* Determinar si puede agregar un nuevo horario o no */

      /* Asignación de status de la membresia */
      if (this.fecha > 29 && this.fecha < 32) {
        this.status = "Membresia por terminar"
        this.color = "text-warning"
        this.icono = "warning"
      } else if (this.fecha > 1 && this.fecha < 25) {
        this.status = "Membresia activa"
        this.color = "text-success"
        this.icono = "verified_user"
      } else if (this.fecha > 32) {
        this.status = "Membresia inactiva"
        this.color = "text-danger"
        this.icono = "error"
      }
    }, (error) => {

    });
  }

  // Notificación de success al editar
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  valmembrecia(x) {
    this.toastr.errorToastr(x, 'Error!');
  }

  // Notificacion de error al editar
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  /* Obtiene el horario del alumno seleccionado */
  horarios() {
    this.barra = ""
    this.perfilService.gethorario(this.datos).subscribe((data) => {
      // console.log(data)
      this.dataSource = data;
      // console.log('numero de horarios en la base de datos' +this.dataSource.length)
      this.clasesDB = Number(this.dataSource.length)
      this.barra = "none"
    }, (error) => {
      this.barra = "none"
    })
  }

  editAlu(idalu: number, nomalu: string, 
    apealu: string, fnacalu: string, 
    sexoalu: string,
    domalu: string, telalu: number, correoalu: string, 
    medicacion: string,
    alergias: string, perfilalu: string, 
    cronica: string, otro: string,
    escuela: string, usuarioalu: string, 
    pswalu: string, nompad: string,
    apepad: string, dompad: string, telpad: number, 
    correopad: string,
    ocupad: string, nommad: string, apemad: string, 
    dommad: string,
    telmad: number, correomad: string, ocupmad: string, 
    finscripcion: string) {

    const dialogRef = this.dialog.open(AlueditComponent, {
      // Anchura de el modal
      width: '60%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data:
      {
        idalu: idalu, nomalu: nomalu, apealu: apealu, fnacalu: fnacalu, sexoalu: sexoalu,
        domalu: domalu, telalu: telalu, correoalu: correoalu, medicacion: medicacion,
        alergias: alergias, perfilalu:perfilalu, cronica: cronica, otro: otro,
        escuela: escuela, usuarioalu: usuarioalu, pswalu: pswalu, nompad: nompad,
        apepad: apepad, dompad: dompad, telpad: telpad, correopad: correopad,
        ocupad: ocupad, nommad: nommad, apemad: apemad, dommad: dommad,
        telmad: telmad, correomad: correomad, ocupmad: ocupmad, finscripcion: finscripcion
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.alu = this.perfilService.getDialogData();
        this.alumnosService.put(this.alu).subscribe((data) => {
          this.showSuccessEdit();
          this.datos = this.perfilService.getDialogData();
        }, (error) => {
          this.showErrorEdit();
        });

      }
    });
  }

  editHora(i: number, idgalu: number, iddia: number, idh: number, idper: number) {
    const dialogRef = this.dialog.open(PerfilhoraeditComponent, {
      // Anchura de el modal
      width: '80%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data:
      {
        i: i, idgalu: idgalu, iddia: iddia, idh: idh, idper: idper
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.barra = ""
        this.ngrupo = this.perfilService.getDialogHoraData();

        this.perfilService.putHorario(this.dataSource[i].idgalu, this.ngrupo).subscribe((data) => {
          this.ngrupo = this.perfilService.regresarNuevoHorario()
          this.dataSource[i].iddia = this.ngrupo.iddia
          this.dataSource[i].idh = this.ngrupo.idh
          this.dataSource[i].idper = this.ngrupo.idper
          this.dataSource[i].dia = this.ngrupo.dia
          this.dataSource[i].hora = this.ngrupo.hora
          this.dataSource[i].nombre = this.ngrupo.nombre
          this.dataSource[i].apellidos = this.ngrupo.apellidos
          this.barra = "none"
          this.notificationsService.showSuccessEdit()
          // console.log(data)
        }, (error) => {
          // console.log(error)
          this.barra = "none"
          this.notificationsService.showError()
        })
      }
    });
  }

  deleteHora(i, idgalu) {
    // this.dataSource = this.dataSource.filter(x => x.idgalu !== idgalu)
    const dialogRef = this.dialog.open(PerfilhoradeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.barra = ""
        this.perfilService.deleteHorarioPerfil(idgalu).subscribe((data) => {
          this.dataSource = this.dataSource.filter(x => x.idgalu !== idgalu)
          /* Actualiza la cantidad de clases */
          this.clasesDB = Number(this.dataSource.length)
          this.barra = "none"
          this.notificationsService.showSuccessDelete()
        }, (error) => {

          this.barra = "none"
          this.notificationsService.showError()
        })
      }
    });
  }

  editMem(i: number, idmalu, nommem, fechainicio, adelanto, restante, total, nombre,nombrealu,apealu) {
    console.log(i, idmalu, nommem, fechainicio, adelanto, restante, total, nombre,nombrealu,apealu)
    const dialogRef = this.dialog.open(PerfilmemeditComponent, {
      width: '500px',
      data:
      {
        i: i, idmalu: idmalu, nommem: nommem, fechainicio: fechainicio, adelanto: adelanto, restante: restante, total: total, nombre: nombre,nombrealu:nombrealu,apealu:apealu
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

        this.perfilService.putMembresias(this.perfilService.getDialogData()).subscribe((data) => {
          this.datosEditMem = this.perfilService.getDialogData()
          this.membresia[i].adelanto = this.datosEditMem.adelanto
          this.membresia[i].restante = this.datosEditMem.restante
          this.membresia[i].total = this.datosEditMem.total
          this.showSuccessEdit()
          this.pdf(this.membresia[i]);

        }, (error) => {
          this.showErrorEdit()
        })
      }
    })
  }

  agregarMem() {
    const dialogRef = this.dialog.open(PerfiladdmemComponent, {
      width: '80%',
      data:
      {

      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

      }
    })
  }

  agregarHora(idalu) {
    const dialogRef = this.dialog.open(PerfiladdhoraComponent, {
      width: '80%',
      data:
      {
        idalu: idalu
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.nhorario = this.perfilService.getDialogData()
        this.perfilService.saveNHorario(this.perfilService.getDialogData()).subscribe((data)=>{
          this.horarios()
          // this.dataSource.push({nombre: ""})
          // console.log(this.dataSource)
          // let i = Number(this.dataSource.length)
          // i -= 1
          // // console.log(i)
          // this.dataSource[i].nombre = "Genaro"
          // // this.dataSource = dataS
          // // console.log(this.dataSource)
          // // this.dataSource = this.dataSource.push()
          // // this.clasesDB = Number(this.dataSource.length)
        },(error)=>{
          console.log(error)
        })
      }
    })
  }

  pdf(x){
    console.log(x)
    let docs = new jsPDF();

    var img = new Image()
    var rows1 = [];
    var rows2 = [];
    var rows3 = [];
    img.src = 'assets/images/rg.png'
    docs.addImage(img, 'png', 159,4, 40,20)
    docs.setFontSize(14);
    docs.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    docs.setFontType("normal");
    docs.setFontSize(14);
    docs.text(10,20, 'Alumno '+this.datos.nomalu+" " +this.datos.apealu  );
    docs.text(10,30, 'Membrecia : '+ x.nommem);
    docs.text(10,40, 'Numero de clases a la semana: ' + x.clases );
    docs.text(10,50, 'Fecha de inicio: '+x.fechainicio );
    docs.text(130,50, 'Fecha de termino: '+x.fechatermino);
    docs.setFontSize(12);
    docs.text(10,70, 'Tipo de pago: '+x.nombre);
    docs.text(10,80, 'Adelanto: $'+x.adelanto+".00");
    docs.text(10,100,'Total: $'+x.total+".00")
    docs.text(10,90,'Restante: $'+x.restante+".00")
    docs.setFontSize(12);
    docs.setDrawColor(0, 0, 0);
    docs.line(10,93, 200, 93);
    docs.setFontSize(10);
    docs.save('.pdf');

  }

    anm(x,y){      
     
      var f = new Date(); 

      if(y.fechatermino<f.getFullYear()+"-"+ f.getMonth()+ 1+"-"+f.getDate()&&y.adelanto==y.total){
        this.tipopagoview = "none";
        this.nmembrecia="none"
        this.mostramem=""

      }else{
        this.tipopagoview = "";
        this.valmembrecia( "Necesitas pagar o esperar a que acabe tu membrecia el dia "+y.fechatermino)
       
      }
    }

    sii(x,y){
      this.totalpago=x
      this.malu.idsuc=this.sucursal
      this.malu.idalu=this.datos.idalu
      this.malu.idmem=y.idtmem
      

    }
    sino(x){
      if(x.checked==true){
      this.formulario=""
      this.tablamembrecia="none"
    }else{
      this.formulario="none"
      this.tablamembrecia=""
      this.tipoimg="none"
      this.efec="none"
      this.payp="none"
      
      
  }
  }
  getTipomem() {
    this.tmembresia.getMemalu().subscribe((data: Tipomembresia[]) => {
      this._allMembresias = data;
      this._allMembresias = this._allMembresias.filter(x => (x.idsuc == this.sucursal))
      // mostrar precio this.membresia
      this.preciotmembresia=this._allMembresias
      console.log(this.preciotmembresia)
    
    }, (error) => {

    });
  }

  saveMem(idtmem, costo) {
    this.malu.total=costo
    this.malu.idalu=this.datos.idalu
    this.malu.idmem=idtmem
    this.malu.idsuc=this.sucursal
    console.log(this.malu)
    this.tablamembrecia="none"
    this.formulario="none"
    this.formadepago=""
    this.totalpago=costo
  }


  actmem(){

    this.malu.restante=this.totalpago-this.adelanto
    this.malu.adelanto=this.adelanto
    this.malu.total=this.totalpago
    console.log(this.malu)
    this.memaluService.save(this.malu).subscribe((data) => {
      this.showSuccesSave();

    }, (error) => {
      this.showErrorSave();
      console.log(error);
    });


    this.cont.status=1
    this.cont.Concepto="Membrecia del alumno: " + this.datos.nomalu + " " + this.datos.apealu;
    // this.cont.fecha=now
    this.cont.monto=this.malu.total
    this.cont.adelanto=this.malu.adelanto
    this.cont.restante=this.malu.restante
    this.cont.suma=this.malu.adelanto
    this.cont.idsuc=this.sucursal
    this.cont.idscu=this.sucursal
    this.cont.fecha=this.malu.fechaini
    this.cat.savemem(this.cont)
    .subscribe((data) =>{
      console.log(data)
      // this.personalService.tput(this.data);
    },(error)=>{
    console.log(error)
    });
  }

   // Notificación de success al eliminar
   showSuccesSave() {
    this.toastr.successToastr('Registro guardado', 'Exito!');
  }

  // Notificacion de error al eliminar
  showErrorSave() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }
  inscripcion(x) {
    if (x.checked == true) {
      this.totalpago = this.totalpago + this.anualidad;
      x.checked = true
      // console.log(this.cheked)
    } else {
      this.totalpago = this.totalpago - this.anualidad;
      x.cheked = false
      // console.log(this.cheked)
    }
  }

  efectivo(id) {
    this.malu.idtpago=id
    this.tipoimg = "none";
    this.efec = "";
    // console.log(id);

  }


  paypal(id) {
    this.tipoimg = "none";
    this.payp = "";
  }

  segmem(){

  }

}
