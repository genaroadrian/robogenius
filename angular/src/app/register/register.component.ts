import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Login } from '../interfaces/login';
import { RegisterService } from '../services/register.service';
import {MatSnackBar} from '@angular/material/snack-bar';


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
    activo : 1

  };

  hide = true;
  constructor(private registerService : RegisterService, private _snackBar: MatSnackBar) {
  
  }
  ngOnInit() {
  }


  // caja de texto de email que valida 
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  saveLogin(){
      this.registerService.save(this.login)
      .subscribe(
        data => console.log('Succes!',data),
        error => console.log('Error!',error)
        
      )
    
  }


  // Modal para mostrar el nombre del user y el bienvenido
  openSnackBar(message: string, action: string,actions : string, name: string ) {
    this._snackBar.open(message, action + actions + name, {
      duration: 5000,
    });
  }
}
