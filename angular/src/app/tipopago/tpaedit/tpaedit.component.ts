import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipopagoService } from 'src/app/services/tipopago.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tpaedit',
  templateUrl: './tpaedit.component.html',
  styleUrls: ['./tpaedit.component.css']
})
export class TpaeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpaeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    public tipopagoService: TipopagoService, public toastr: ToastrManager) { }

  ngOnInit() {
  }

  /* Validaciones del formulario */
  fControl = new FormControl('', [
    Validators.required
  ]);

  /* Mensajes de error del formulario */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
      this.fControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  stopEdit(data): void {
    this.tipopagoService.updateTpago(data)
  }

}
