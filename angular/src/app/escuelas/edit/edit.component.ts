import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';
import {MatSnackBar} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, public escuelasService: EscuelasService,
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

  openSnackBar() {
    this.snackBar.open('Registro actualizado','Cerrar',{
      duration: 2000,
    });
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  stopEdit(data): void {
    this.escuelasService.put(this.data).subscribe((data) =>{
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
