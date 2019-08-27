import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
    public escuelasService: EscuelasService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  /* Lanza los errores de las validaciones del formulario */
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  submit() {
    // emppty stuff
  }

  /* Cuando se da clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la actualizacion del registro */
  stopEdit(data): void {
    this.escuelasService.putEscuela(data);
  }

}
