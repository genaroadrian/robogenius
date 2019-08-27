import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TipopagoService } from 'src/app/services/tipopago.service';
import { Tipopago } from 'src/app/interfaces/tipopago';


@Component({
  selector: 'app-tpaadd',
  templateUrl: './tpaadd.component.html',
  styleUrls: ['./tpaadd.component.css']
})
export class TpaaddComponent implements OnInit {

  /* Opciones del formulario */
  options: FormGroup;

  constructor(public dialogRef: MatDialogRef<TpaaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Tipopago,
    public tipopagoService: TipopagoService,fb: FormBuilder) { 

    this.options = fb.group({
        hideRequired: false
      });
     }

     /* Validaciones de los formularios */
  fControl = new FormControl('', [
    Validators.required
  ]);

  /* Mensajes de error de las validaciones */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
        '';
  }

  ngOnInit() {
  }

  /* Cuando se hace clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirmar el registro */
  confirmAdd(data): void
  {
    
    this.tipopagoService.addTpago(data);
  }


}
