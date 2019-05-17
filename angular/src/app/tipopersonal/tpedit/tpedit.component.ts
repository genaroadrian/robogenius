import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tpedit',
  templateUrl: './tpedit.component.html',
  styleUrls: ['./tpedit.component.css']
})
export class TpeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpeditComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService) { }

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

  stopEdit(data): void {
    this.tipopersonalService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      // alert('Registro Actualizado');
      this.openSnackBar();
      // console.log(this.data);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  

}

