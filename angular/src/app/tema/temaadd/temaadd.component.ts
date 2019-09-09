import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { TemaService } from 'src/app/services/tema.service';
import { tema } from 'src/app/interfaces/tema';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';

@Component({
  selector: 'app-temaadd',
  templateUrl: './temaadd.component.html',
  styleUrls: ['./temaadd.component.css']
})
export class TemaaddComponent implements OnInit {

  /* Opciones del formulario */
  options: FormGroup;
  ac:any;

  teme:tema={
    nombre:null,
    idac:null,
    activo:null
  }

  constructor(public dialogRef: MatDialogRef<TemaaddComponent>, @Inject(MAT_DIALOG_DATA) public data: tema, 
    public tema: TemaService,fb: FormBuilder,public area:AreadelconocimientoService) {
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
    this.tema.addTema(this.teme)
    console.log(this.teme)

  }

  // recibir valor del selector
  obtener(){
      this.area.get().subscribe(data=>{
          this.ac=data;
          
    })

  }
  select(plan){
    // console.log(plan)
    // this.plan=this.teme.idac;
    // console.log(this.teme.idac)
    this.teme.idac=plan
  }

}
