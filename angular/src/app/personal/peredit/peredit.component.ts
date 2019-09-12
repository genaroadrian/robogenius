import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PersonalService } from 'src/app/services/personal.service';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';

@Component({
  selector: 'app-peredit',
  templateUrl: './peredit.component.html',
  styleUrls: ['./peredit.component.css']
})
export class PereditComponent implements OnInit {

  /* Almacena todos los tipos de personal */
  selectTPersonal: any


  selected: string

  constructor(public dialogRef: MatDialogRef<PereditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalService: PersonalService,
    public toastr: ToastrManager, public tPersonal: TipopersonalService) {
      
     }

  ngOnInit() {
    this.selected = ''+this.data.idtper+''
    this.tPersonal.get().subscribe((data)=>{
      this.selectTPersonal = data
    },(error)=>{
    })
    console.log(this.selected)
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
 /*  stopEdit(data): void {
    // console.log(data);
    this.personalService.put(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      // this.personalService.tput(this.data);
    },(error)=>{
      this.showErrorEdit();
    });    
  } */

  stopEdit(data): void {
    console.log(this.selected)
    data.idtper = this.selected
  console.log(data)
    this.personalService.putPersonal(data);
    }    

}
