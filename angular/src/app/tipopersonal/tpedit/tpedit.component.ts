import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import {MatSnackBar} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tpedit',
  templateUrl: './tpedit.component.html',
  styleUrls: ['./tpedit.component.css']
})
export class TpeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpeditComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService,
    public toastr: ToastrManager) { }

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


  onNoClick(): void {
    this.dialogRef.close();
  }

  // Notificación de succes
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  // Notificacion de error
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  stopEdit(data): void {
    this.tipopersonalService.put(this.data).subscribe((data) =>{
      this.showSuccessEdit();
    },(error)=>{
      this.showErrorEdit();
    });
    
  }

  

}

