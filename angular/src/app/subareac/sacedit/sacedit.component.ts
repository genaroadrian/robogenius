import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubareacService } from 'src/app/services/subareac.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sacedit',
  templateUrl: './sacedit.component.html',
  styleUrls: ['./sacedit.component.css']
})
export class SaceditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SaceditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public sacService: SubareacService) { }

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
    this.sacService.putSubac(data)
  }

}
