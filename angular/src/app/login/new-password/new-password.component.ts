import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  /* Visibilidad del formulario hasta que se compruebe la validacion del token */
  tok = "none"

  /* si existe el token */
  exist: any

  hide  = true
  hidec = true

  constructor(private route: ActivatedRoute,fb: FormBuilder, public passwordResetService: PasswordResetService,
    private router: Router, public notificacionService: NotificationsService) { }

  /* Validaciones de los formularios */
  fControl = new FormControl('', [
    Validators.required
  ]);

  password =
  {
    pass: null,
    passc: null,
    token: null
  }

  token = {
    token:null
  }

  /* Mensajes de error de las validaciones */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
      this.fControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  samePass()
  {
    return 'Los campos deben coincidir'
  }

  ngOnInit() {
    this.token.token = this.route.snapshot.paramMap.get('id')
    // console.log(this.token)
    this.passwordResetService.confirmToken(this.token).subscribe((data)=>{
      this.exist = data[0].exist
      // console.log(this.exist)
    if(this.exist == 1 )
    {
      this.tok = ""
    }else{
      alert("El link ha expirado, intentalo de nuevo")
      this.router.navigateByUrl('/home'); 
    }
    },(error)=>{
      alert("Ocurrio un error, intentalo de nuevo")
      this.router.navigateByUrl('/home'); 
    })
    
  }

  confirm(password)
  {
    this.password.token = this.token.token;
    if(this.password.pass != password.passc)
      {
        this.samePass()
      }
      else{
        this.passwordResetService.confirmPassword(this.password).subscribe((data)=>{
          if(data == 1)
          {
            this.notificacionService.passwordChange()
            this.router.navigateByUrl('/home')
          }
        },(error)=>{
          // console.log(error)
          this.notificacionService.showError()
        })
      }
  }

}
