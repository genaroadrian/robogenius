import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { UserAdminService } from 'src/app/services/user-admin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

   // Validaciones de el formulario
   fControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  datos =
  {
    email: null
  }

  /* Mensjaes de error */ 

  getErrorMessage() {
    return this.fControl.hasError('required') ? 'Campo obligatorio' :
      this.fControl.hasError('email') ? 'Ingrese un correo valido' :
        '';
  }

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  public loginService: UserAdminService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEmail(email)
  {
    console.log(this.datos)
    this.loginService.validEmail(this.datos)
  }

}
