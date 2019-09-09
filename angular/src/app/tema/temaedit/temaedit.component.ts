import { Component, OnInit, Inject } from '@angular/core';
import { TemaService } from 'src/app/services/tema.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { tema } from 'src/app/interfaces/tema';



@Component({
  selector: 'app-temaedit',
  templateUrl: './temaedit.component.html',
  styleUrls: ['./temaedit.component.css']
})
export class TemaeditComponent implements OnInit {

  ac:any;
  logs:any;
  selected:any;
  areadelconocimiento:any;
  teme:tema={
    nombre:null,
    idac:null,
    activo:null
  }
  constructor(public dialogRef: MatDialogRef<TemaeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public temaservice:TemaService,public area:AreadelconocimientoService) { }

  disableSelect = new FormControl(false);

  ngOnInit() {
    this.obtener();
    
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
  this.data.idac=plan
  // console.log(plan)
}

/* Cuando se da clic afuera del modal, se cierra */
onNoClick(): void {
  this.dialogRef.close();
}

/* Confirma la actualizacion del registro */
stopEdit(data): void {
  this.teme.nombre=data.nombre;
  // console.log(data)
  this.temaservice.put(data);
  
}
obtener(){
  this.area.get().subscribe(data=>{
      this.ac=data;
        this.logs=data;
        this.selected = this.logs.filter(x => x.idac == this.data.idac)   
        this.areadelconocimiento=this.selected[0].nombre;          
})

}




}
