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
  hide = true;
  submit:any;

  constructor(public dialogRef: MatDialogRef<UserAdminService>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public perfilService: UserAdminService) { }

  ngOnInit() {
  }
  fControl = new FormControl('', [Validators.required ]);
  emailControl = new FormControl('',[Validators.required, Validators.email])

  /* Lanza los errores de las validaciones del formulario */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
        '';
  }

  getEmailErrorMessage() {
      this.fControl.hasError('email') ? 'Ingrese un correo valido' :
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
