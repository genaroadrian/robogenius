import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
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
    public toastr: ToastrManager) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  // Notificación de succes
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  // Notificacion de error
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // stopEdit(data): void {
  //   this.personalService.put(this.data).subscribe((data) =>{
  //     this.showSuccessEdit();
  //   },(error)=>{
  //     this.showErrorEdit();
  //   });
    
  // }

  stopEdit(): void {
    this.personalService.updatePersonal(this.data);
  }

}
