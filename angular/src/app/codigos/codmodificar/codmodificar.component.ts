import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CodigosService } from 'src/app/services/codigos.service';




@Component({
  selector: 'app-codmodificar',
  templateUrl: './codmodificar.component.html',
  styleUrls: ['./codmodificar.component.css']
})
export class CodmodificarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CodmodificarComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public codigosService: CodigosService, public toastr: ToastrManager) { }

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
  
  MODIFICAR(data): void {
    this.codigosService.put(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      this.codigosService.updatecodigos(this.data.id);
    },(error)=>{
      this.showErrorEdit();
    });
  }


}
