import { Component, OnInit } from '@angular/core';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { FileuploadService } from 'src/app/services/fileupload.service';
import {Router} from '@angular/router';
import { fotopersonal } from 'src/app/interfaces/fotopersonal';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material';
import { PereditComponent } from '../peredit/peredit.component';
import { PersonalService } from 'src/app/services/personal.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-personalperfil',
  templateUrl: './personalperfil.component.html',
  styleUrls: ['./personalperfil.component.css']
})
export class PersonalperfilComponent implements OnInit {

  datos: any;
  jstoday:any;

  barra = 'none'

  
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }

  personal:fotopersonal={
    idper:null,
    nombre: null,
    apellidos: null,
    usuario: null,
    contra: null,
    fechanac: null,
    sexo: null,
    curp: null,
    estadocivil: null,
    domicilio: null,
    fechaingreso: null,
    horasalida: null,
    horaentrada: null,
    perfilprofesional: null,
    especialidad: null,
    salariomensual: null,
    tareasasignadas: null,
    idtper: null,
    activo: null,
    fotopersonal:null
  }

  constructor(public personalPerfilService: PersonalperfilService,private uploadService: FileuploadService,private router:Router,
    public dialog: MatDialog,public personalService: PersonalService, public notificationsService: NotificationsService) { }

  ngOnInit() {
    this.datos = this.personalPerfilService.returnPerfil()
    this.personal.idper=this.datos.idper
  }

  seleccionarArchivo(event) {
    this.jstoday= new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo=this.jstoday+this.archivo.nombreArchivo
    this.personal.fotopersonal=this.archivo.nombreArchivo;

 

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

  upload() {

      // this.datos.perfilalu=this.archivo.nombreArchivo;
      this.uploadService.subirimagenPersonal(this.personal).subscribe(data=>{
        console.log(this.personal)
       }, (error) => {
         
       console.log(error)
       })
    // console.log(this.archivo);
    this.uploadService.uploadFilePersonal(this.archivo)
    .subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          // alert(datos['mensaje']);
          // this.router.navigate(['home']);

        }
      }
    );
  
    
  }

  mostrarBarra()
  {
    this.barra = ""
  }

  ocultarBarra()
  {
    this.barra = "none"
  }

  // Metodo para abrir el modal para modificar
  editPersonal(idper: number, nombre: string,
    apellidos: string, usuario: string, contra: string,
    fechanac: string, sexo: string, curp: string, estadocivil:string,
    domicilio: string, fechaingreso: string, horaentrada: string,
    horasalida: string, perfilprofesional: string, especialidad: string,
    tareasasignadas: string, salariomensual: number, idtper: number, fotopersonal: fotopersonal ) {
    const dialogRef = this.dialog.open(PereditComponent, {
      // Anchura de el modal
      width: '60%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data: 
      {
        idper: idper, nombre: nombre, apellidos: apellidos,
        usuario: usuario, contra: contra, fechanac: fechanac,
        sexo: sexo, curp: curp, estadocivil: estadocivil,
        domicilio: domicilio, fechaingreso: fechaingreso, horaentrada: horaentrada,
        horasalida: horasalida, perfilprofesional: perfilprofesional, especialidad: especialidad,
        tareasasignadas: tareasasignadas, salariomensual: salariomensual, idtper: idtper, fotopersonal: fotopersonal
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if (result === 1) {
        this.mostrarBarra()
        this.personalService.put(this.personalService.getDialogData()).subscribe((data) =>{
         this.notificationsService.showSuccessEdit()
         this.datos = this.personalService.getDialogData()
         this.ocultarBarra()
        },(error)=>{
          this.notificationsService.showError()
          this.ocultarBarra()
        });    
        
      }
    });
  }


}
