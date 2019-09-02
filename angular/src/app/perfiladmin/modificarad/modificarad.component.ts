import { Component, OnInit, Inject } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { UserAdminService } from 'src/app/services/user-admin.service';



@Component({
  selector: 'app-modificarad',
  templateUrl: './modificarad.component.html',
  styleUrls: ['./modificarad.component.css']
})
export class ModificaradComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserAdminService>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public perfilService: UserAdminService) { }

  ngOnInit() {
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


  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la actualizacion del registro */
  stopEdit(data): void {
    this.perfilService.putPerfil(data);
  }

}
