import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NivelService } from 'src/app/services/nivel.service';
import { Niveles } from 'src/app/interfaces/niveles';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-addnivel',
  templateUrl: './addnivel.component.html',
  styleUrls: ['./addnivel.component.css']
})
export class AddnivelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddnivelComponent>, @Inject(MAT_DIALOG_DATA) public data: Niveles, 
  public nivelService: NivelService,fb: FormBuilder, public toastr: ToastrManager) { }

  ngOnInit() {
  }
  
  /* Validaciones de los formularios */
  fControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

    /* Mensajes de error de las validaciones */
    getErrorMessage() {
      return this.fControl.hasError('required') ? 'El campo es obligatorio' :
        this.fControl.hasError('email') ? 'Ingrese un correo valido' :
          '';
    }
    showSuccessEdit() {
      this.toastr.successToastr('Registro actualizado','Exito!');
    }
  
    showErrorEdit() {
      this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
    }
  

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    /* Confirma la alta del registro */
    addnivel(): void 
    {
      this.data.idsuc=localStorage.getItem("sucursal");
      this.data.activo="1";
      this.nivelService.addniveles(this.data)
    }
  

}
