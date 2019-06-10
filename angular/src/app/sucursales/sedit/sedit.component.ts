import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sedit',
  templateUrl: './sedit.component.html',
  styleUrls: ['./sedit.component.css']
})
export class SeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    public sucursalService: SucursalService, public toastr: ToastrManager) { }

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
    this.sucursalService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      // alert('Registro Actualizado');
      this.showSuccessEdit();
      this.sucursalService.updateSucursal(this.data.id);
      // console.log(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }

}
