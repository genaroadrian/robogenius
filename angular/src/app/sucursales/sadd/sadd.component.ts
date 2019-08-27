import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/interfaces/sucursal';

@Component({
  selector: 'app-sadd',
  templateUrl: './sadd.component.html',
  styleUrls: ['./sadd.component.css']
})
export class SaddComponent implements OnInit {

  /* Ocultar la contraseña */
  hide = true;
  
  constructor(public dialogRef: MatDialogRef<SaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Sucursal,
    public sucursalService: SucursalService) { }

  ngOnInit() {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(data): void
  {
    this.sucursalService.addSucurusal(data)
  }

}
