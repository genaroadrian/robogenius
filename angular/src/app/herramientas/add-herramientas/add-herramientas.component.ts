import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Herramientas } from 'src/app/interfaces/herramientas';
import { HerramientasService } from 'src/app/services/herramientas.service';
@Component({
  selector: 'app-add-herramientas',
  templateUrl: './add-herramientas.component.html',
  styleUrls: ['./add-herramientas.component.css']
})
export class AddHerramientasComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddHerramientasComponent>,@Inject(MAT_DIALOG_DATA) public data: Herramientas, 
  public herramientasService: HerramientasService, public toastr: ToastrManager) { }

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


  herramientas(): void 
  {
    
    this.herramientasService.herramientas(this.data);
    
  }

}
