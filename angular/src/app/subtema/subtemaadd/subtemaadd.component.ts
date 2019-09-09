import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { TemaService } from 'src/app/services/tema.service';
import { SubtemaService } from 'src/app/services/subtema.service';
import { subtema } from 'src/app/interfaces/subtema';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-subtemaadd',
  templateUrl: './subtemaadd.component.html',
  styleUrls: ['./subtemaadd.component.css']
})

export class SubtemaaddComponent implements OnInit {

  /* Opciones del formulario */
  options: FormGroup;
  ac:any;

  teme:subtema={
    nombre:null,
    idt:null,
    activo:null
  }

  constructor(public dialogRef: MatDialogRef<SubtemaaddComponent>, @Inject(MAT_DIALOG_DATA) public data: subtema, 
    public tema: TemaService,fb: FormBuilder,public subtema:SubtemaService) {
      this.options = fb.group({
        hideRequired: false
      });
     }

  ngOnInit() {
    this.obtener();
  
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
  confirmAdd(): void 
  {
    this.data.nombre=this.teme.nombre;
    this.data=this.teme
    console.log(this.data)
    this.subtema.addTema(this.data)

  }

  // recibir valor del selector
  obtener(){
      this.tema.get().subscribe(data=>{
          this.ac=data;
          
    })

  }
  select(plan){

    this.teme.idt=plan
  }

}