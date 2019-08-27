import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /* Opciones del formulario */
  options: FormGroup;


  constructor(public dialogRef: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public data: Escuelas, 
    public escuelasService: EscuelasService,fb: FormBuilder) {
      this.options = fb.group({
        hideRequired: false
      });
     }

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
      this.fControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  /* Cuando se da clic afuera del modal, lo cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la alta del registro */
  confirmAdd(): void 
  {
    this.escuelasService.addEscuela(this.data)
  }

}
