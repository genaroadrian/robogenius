import { Component, OnInit, Inject } from '@angular/core';
import { CodigosService } from 'src/app/services/codigos.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Codigos } from 'src/app/interfaces/codigos';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-codigosadd',
  templateUrl: './codigosadd.component.html',
  styleUrls: ['./codigosadd.component.css']
})
export class CodigosaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CodigosaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Codigos, 
  public codigosService: CodigosService, public toastr: ToastrManager) { }

  ngOnInit() {
  }
    /* Validaciones de los formularios */
    fControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  Descuentos(): void 
  {
    this.data.idsuc=localStorage.getItem("sucursal");
    this.codigosService.ado(this.data);
    
  }
}
