import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { HerramientasService } from 'src/app/services/herramientas.service';



@Component({
  selector: 'app-updateh',
  templateUrl: './updateh.component.html',
  styleUrls: ['./updateh.component.css']
})
export class UpdatehComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatehComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public herramientasService: HerramientasService) { }

  ngOnInit() {
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
}
 /* Cuando se da clic afuera del modal, se cierra */
 onNoClick(): void {
  this.dialogRef.close();
}

/* Confirma la actualizacion del registro */
updateh(data): void {
  this.herramientasService.putHerra(data);
}
}

