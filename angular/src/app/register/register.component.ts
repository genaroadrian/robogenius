import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Login } from '../interfaces/login';
import { RegisterService } from '../services/register.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {
  
  login:Login = {
    email: null,
    password: null,
    nombre: null,
    apellidos: null,
    subname :null,
    telefono : null,
    avatar : null,
    activo : 1,
    fotoadmin:null

  };

  hide = true;

      // Notificación de success al eliminar
      showSuccesSave() {
        this.toastr.successToastr('Usuario guardado', 'Exito!');
      }
    
      // Notificacion de error al eliminar
      showErrorSave(x) {
        this.toastr.errorToastr('Ocurrio un error.',x, 'Oops!');
      }

        /* Barra de carga */
  barra = "none"
  constructor(private registerService : RegisterService, private _snackBar: MatSnackBar,public toastr: ToastrManager,private router: Router) {
  
  }
  ngOnInit() {
  }

    /* Mostrar la barra de carga */
    showBarra() {
      this.barra = ""
    }
  
    /* Ocultar la barra de carga */
    hideBarra() {
      this.barra = "none"
    }

  // caja de texto de email que valida 
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  saveLogin(){
    this.showBarra()
      this.registerService.save(this.login)
      .subscribe((data) => {
        this.showSuccesSave();
        this.hideBarra()
        this.router.navigateByUrl('/login');
      }, (error) => {
        this.showErrorSave(error.error.email[0]);
        this.hideBarra()
      })
    
  }


}
