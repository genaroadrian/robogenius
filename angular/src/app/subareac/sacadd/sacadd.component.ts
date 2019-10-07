import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubareacService } from 'src/app/services/subareac.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subareac } from 'src/app/interfaces/subareac';

@Component({
  selector: 'app-sacadd',
  templateUrl: './sacadd.component.html',
  styleUrls: ['./sacadd.component.css']
})
export class SacaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SacaddComponent>, @Inject(MAT_DIALOG_DATA) public data: Subareac, 
  public subareacService: SubareacService,fb: FormBuilder) { }

  ngOnInit() {
  }

  /* Validaciones de los formularios */
  fControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  /* Mensajes de error de las validaciones */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
   
        '';
  }

  /* Cuando se da clic afuera del modal, lo cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la alta del registro */
  confirmAdd(): void 
  {
    this.data.idsuc=localStorage.getItem("sucursal")
    this.subareacService.addSubac(this.data)
  }

}
