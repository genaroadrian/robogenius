import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SubtemaService } from 'src/app/services/subtema.service';
import { TemaService } from 'src/app/services/tema.service';
import { subtema } from 'src/app/interfaces/subtema';

@Component({
  selector: 'app-subtemaedit',
  templateUrl: './subtemaedit.component.html',
  styleUrls: ['./subtemaedit.component.css']
})
export class SubtemaeditComponent implements OnInit {

  ac:any;
  logs:any;
  selected:any;
  temas:any;

  subtema:subtema={
    nombre:null,
    idt:null,
    activo:null
  }
  constructor(public dialogRef: MatDialogRef<SubtemaeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public subtemaservice:SubtemaService,public tema:TemaService) { }

  disableSelect = new FormControl(false);

  ngOnInit() {
    this.obtener();
    this.data;
    
  }

  
formControl = new FormControl('', [
  Validators.required
  // Validators.email,
]);

/* Lanza los errores de las validaciones del formulario */
getErrorMessage() {
  return this.formControl.hasError('required') ? 'El campo es obligatorio' :
    this.formControl.hasError('email') ? 'Ingrese un corre valido' :
      '';
}

submit() {
  // emppty stuff
}
select(plan){
  this.data.idt=plan
  console.log(plan)
}

/* Cuando se da clic afuera del modal, se cierra */
onNoClick(): void {
  this.dialogRef.close();
}

/* Confirma la actualizacion del registro */
stopEdit(data): void {
  this.subtema.nombre=data.nombre;
  console.log(data)
  console.log(this.temas)

  this.subtemaservice.put(data);
  
}
obtener(){
  this.tema.get().subscribe(data=>{
      this.ac=data;
        this.logs=data;
        this.selected = this.logs.filter(x => x.idt == this.data.idt)   
        this.temas=this.selected[0].nombre;   
})

}

}