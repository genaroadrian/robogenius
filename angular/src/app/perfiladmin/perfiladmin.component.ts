import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { MatDialog} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { ModificaradComponent } from './modificarad/modificarad.component';
import { UserAdminService } from '../services/user-admin.service';


import { FileuploadService } from 'src/app/services/fileupload.service';
import {Router} from '@angular/router';
import { userAdmin } from 'src/app/interfaces/userAdmin';






@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.css']
})
export class PerfiladminComponent implements OnInit {


  log:Login[];
  logs:any;
  selecionar:any;
  barra = "none";
  index: number;
  id: number;
  exampleDatabase: UserAdminService | null;

  
  jstoday:any;

  
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }


   Login:Login= {
    id: null,
    subname: null,
    email: null,
    password: null,
    nombre: null,
    apellidos: null,
    telefono: null,
    avatar: null,
    activo: null,
    fotoadmin:null
}

  constructor( private service:LoginService, public httpClient: HttpClient, public dialog: MatDialog,
    public useradminService: UserAdminService, public toastr: ToastrManager,private uploadService: FileuploadService,private router:Router) { }
  public  emai = localStorage.getItem("email")
  ;

 

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
    
      this.log=data;
      this.logs = this.log.filter(x=>x.email == this.emai)
      // console.log(this.logs)
      this.Login.id=this.logs[0].id
    },(error)=>{
      // console.log(error)
    })

   
    
  }

  seleccionarArchivo(event) {
    this.jstoday= new Date().getTime();
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.nombreArchivo=this.jstoday+this.archivo.nombreArchivo
 

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
    // console.log(this.archivo);
    localStorage.removeItem('foto');
    localStorage.setItem('foto' , this.archivo.nombreArchivo);
    this.uploadService.uploadFileAdmin(this.archivo)

    .subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          // alert(datos['mensaje']);
          // this.router.navigate(['home']);

        }
      }
    );

    // this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss', 'en-US');
    
    this.Login.fotoadmin=this.archivo.nombreArchivo;
        this.showBarra()

    // this.datos.perfilalu=this.archivo.nombreArchivo;
    this.uploadService.subirimagenAdmin(this.Login).subscribe(data=>{
      this.hideBarra()
      this.showSuccessFoto()
      
    }, (error) => {
      this.showError()
      this.hideBarra()
      
    })
    
  }


  showBarra() {
    this.barra = ""
  }
  hideBarra() {
    this.barra = "none"
  }

  showSuccessFoto() {
    this.toastr.successToastr('Foto actualizada', 'Exito!');
  }
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  /* Mensaje de DELETE */
  showSuccessDelete() {
    this.toastr.successToastr('Registro eliminado','Exito!');
  }

  /* Mensaje de ERROR */
  showError() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }


   // Metodo para abrir el modal para modificar
   updateperfil(i: number, id: number,  email: string, subname: string, password: string, nombre: string, apellidos: string, telefono: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(ModificaradComponent, {
      data: { id: id, email: email,subname: subname, password: password,nombre: nombre, apellidos: apellidos, telefono: telefono }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.useradminService.put(this.useradminService.getDialogData()).subscribe((data) => {
          this.logs[0]=data;
          //console.log(data)
          this.hideBarra()
          this.showSuccessEdit()
        }, (error) => {
          this.showError()
          this.hideBarra()
        })

      }

    });
  }




  

 

}
