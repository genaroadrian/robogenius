import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipomensualidadService } from 'src/app/services/tipomensualidad.service';
import { Tipomensualidad } from 'src/app/interfaces/tipomensualidad';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tmedit',
  templateUrl: './tmedit.component.html',
  styleUrls: ['./tmedit.component.css']
})
export class TmeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TmeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
    public tipomensualidadService: TipomensualidadService, public toastr: ToastrManager) { }

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

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  stopEdit(data): void {
    this.tipomensualidadService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      // alert('Registro Actualizado');
      // this.openSnackBar();
      this.showSuccessEdit();
      // console.log(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }

}
