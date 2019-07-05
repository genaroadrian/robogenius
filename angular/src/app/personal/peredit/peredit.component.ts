import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-peredit',
  templateUrl: './peredit.component.html',
  styleUrls: ['./peredit.component.css']
})
export class PereditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PereditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalService: PersonalService,
    public toastr: ToastrManager) {
      
     }

  ngOnInit() {
  }

  // Validaciones del formulario
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  /* getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  } */

  submit() {
    // emppty stuff
  }

  // Cuando se le de clic afuera del modal, el modal se cerrará
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Notificación de success al editar
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  // Notificacion de error al editar
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Metodo para cuando termine de guardar
  stopEdit(data): void {
    // console.log(data);
    this.personalService.put(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      // this.personalService.tput(this.data);
    },(error)=>{
      this.showErrorEdit();
    });    
  }

}
