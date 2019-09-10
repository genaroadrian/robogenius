import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { GradoService } from 'src/app/services/grado.service';



@Component({
  selector: 'app-updateg',
  templateUrl: './updateg.component.html',
  styleUrls: ['./updateg.component.css']
})
export class UpdategComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdategComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public gradoService: GradoService) { }

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
  
  submit() {
    // emppty stuff
  }

  /* Cuando se da clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la actualizacion del registro */
  updateg(data): void {
    this.gradoService.putGrados(data);
  }


}
