import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';

@Component({
  selector: 'app-addtipomem',
  templateUrl: './addtipomem.component.html',
  styleUrls: ['./addtipomem.component.css']
})
export class AddtipomemComponent implements OnInit {
  /* Opciones del formulario */
  options: FormGroup;
  sucursal=localStorage.getItem("sucursal");


  constructor(public dialogRef: MatDialogRef<AddtipomemComponent>, @Inject(MAT_DIALOG_DATA) public data: Tipomembresia, 
  public tmembresiaService: TipomembresiaService) { }

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
      this.fControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  /* Cuando se da clic afuera del modal, lo cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la alta del registro */
  confirmAdd(data): void 
  {
    data.idsuc=this.sucursal;
    this.tmembresiaService.addTmem(data)
  }

}
