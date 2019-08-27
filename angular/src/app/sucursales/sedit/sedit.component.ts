import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sedit',
  templateUrl: './sedit.component.html',
  styleUrls: ['./sedit.component.css']
})
export class SeditComponent implements OnInit {
  /* Ocultar la contraseña */
  hide = true;

  constructor(public dialogRef: MatDialogRef<SeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    public sucursalService: SucursalService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
        '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(data): void {
    this.sucursalService.updateSucursal(data)
  }

}
