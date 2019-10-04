import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Grados } from 'src/app/interfaces/grados';
import { GradoService } from 'src/app/services/grado.service';

@Component({
  selector: 'app-addgrados',
  templateUrl: './addgrados.component.html',
  styleUrls: ['./addgrados.component.css']
})
export class AddgradosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddgradosComponent>, @Inject(MAT_DIALOG_DATA) public data: Grados,
  public gradoService: GradoService, fb: FormBuilder) { }

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

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    /* Confirma la alta del registro */
    addgrados(): void 
    {
      this.gradoService.addgrados(this.data)
    }

}
