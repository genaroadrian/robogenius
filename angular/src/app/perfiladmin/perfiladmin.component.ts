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

  


  constructor( private service:LoginService, public httpClient: HttpClient, public dialog: MatDialog,
    public useradminService: UserAdminService, public toastr: ToastrManager) { }
  public  emai = localStorage.getItem("email")
  ;

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
    
      this.log=data;
      this.logs = this.log.filter(x=>x.email == this.emai)
      console.log(this.logs)
    },(error)=>{
      console.log(error)
    })

   
    
  }


  showBarra() {
    this.barra = ""
  }
  hideBarra() {
    this.barra = "none"
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
