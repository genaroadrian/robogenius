import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { HorariosService } from 'src/app/services/horarios.service';
import { Horario } from 'src/app/interfaces/horario';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-hedit',
  templateUrl: './hedit.component.html',
  styleUrls: ['./hedit.component.css']
})
export class HeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HeditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
    public horariosService: HorariosService, public toastr: ToastrManager) { }

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

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  stopEdit(data): void {
    this.horariosService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      // alert('Registro Actualizado');
      this.showSuccessEdit();
      this.horariosService.updateHorarios(this.data.id);
      // console.log(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }
}
