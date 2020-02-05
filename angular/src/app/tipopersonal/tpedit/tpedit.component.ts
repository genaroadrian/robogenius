import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleChange} from '@angular/material';
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

  cheked: boolean
  chekedM: boolean

  constructor(public dialogRef: MatDialogRef<TpeditComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    // // console.log(this.data)
    if(this.data.permisos == 1)
    {
      this.cheked = true
    }else{
      this.cheked = false
    }
    if(this.data.maestro == 1)
    {
      this.chekedM = true
    }else{
      this.chekedM = false
    }
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

  permisos(event: MatSlideToggleChange)
    {
      this.cheked = event.checked
      if(this.cheked == false)
      {
        this.chekedM == false
      }
    }

    clases(event: MatSlideToggleChange)
    {
      this.chekedM = event.checked
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

    /* Confirma la actualizacion del registro */
    stopEdit(data): void {
      this.data.permisos = this.cheked
      this.data.maestro = this.chekedM
      this.tipopersonalService.updateTipopersonal(this.data);
    }

}

