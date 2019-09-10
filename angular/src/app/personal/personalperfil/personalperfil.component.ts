import { Component, OnInit } from '@angular/core';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { FileuploadService } from 'src/app/services/fileupload.service';
import {Router} from '@angular/router';
import { fotopersonal } from 'src/app/interfaces/fotopersonal';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-personalperfil',
  templateUrl: './personalperfil.component.html',
  styleUrls: ['./personalperfil.component.css']
})
export class PersonalperfilComponent implements OnInit {

  datos: any;
  jstoday:any;

  
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

  constructor(public personalPerfilService: PersonalperfilService,private uploadService: FileuploadService,private router:Router) { }

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


}
