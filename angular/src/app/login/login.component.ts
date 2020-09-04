import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { MatDialog} from '@angular/material';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastrManager } from 'ng6-toastr-notifications';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    statusEmail: any
    log:Login[];
  hide = true;

        /* Barra de carga */
        barra = "none"

    em:any
    ps:any

  constructor(private router: Router, private service:LoginService,public dialog: MatDialog,
    public toastr: ToastrManager) { }

  ngOnInit() {

    // this.service.getPersonas()
    // .subscribe(data=>{
    //   this.log=data;
    // })
  }

  login(form: NgForm){  
                   // if (form.value.email === form.value.email && form.value.password === form.value.password){
    //     localStorage.setItem('email' , form.value.email);
    //     localStorage.setItem('foto' , form.value.pa);
    //     this.router.navigateByUrl('/home'); 
    // }
    this.showBarra()
    this.service.validation(form.value).subscribe((data)=>{
      // // console.log(data)
    if(data[0]==1){
            if(data[2]==2){
              // console.log("personal")
                  //  // console.log(data);
                  localStorage.setItem('email' , form.value.email);
                  localStorage.setItem('foto' , data[1]);
                  // this.showSuccessEmail();
                  this.hideBarra()
                  this.router.navigateByUrl('/home'); 

            }else
            if(data[2]==3){
              // console.log("Alumnos")
              localStorage.setItem('email' , form.value.email);
                  localStorage.setItem('foto' , data[1]);
                  // this.showSuccessEmail();
                  this.hideBarra()
                  this.router.navigateByUrl('/home');
              
            }else if(data[2]==1){
              // console.log("Administrador")
              localStorage.setItem('email' , form.value.email);
                  localStorage.setItem('foto' , data[1]);
                  // this.showSuccessEmail();
                  this.hideBarra()
                  this.router.navigateByUrl('/home');
              
            }else{
              // console.log("no hay registros")
            }
    }else{
        this.hideBarra()
        this.showErrorEmail1();
        }
      },(error)=>{

          this.showErrorEmail1();
          this.hideBarra()

    //   if(data[0]==1){
    //     // console.log(data);
    //     localStorage.setItem('email' , form.value.email);
    //     localStorage.setItem('foto' , data[1]);
    //     // this.showSuccessEmail();
    //     this.hideBarra()

    //     this.router.navigateByUrl('/home'); 
    //   }
    })

  }
    /* Mostrar la barra de carga */
    showBarra() {
      this.barra = ""
    }
  
    /* Ocultar la barra de carga */
    hideBarra() {
      this.barra = "none"
    }
  showSuccessEmail() {
    this.toastr.successToastr('Correo enviado revista tu bandeja de entrada', 'Exito!');
  }

  showErrorEmail()
  {
    this.toastr.errorToastr('Ocurrio un erro intentalo de nuevo', 'Oops!')
  }
  showErrorEmail1()
  {
    this.toastr.errorToastr('Contraseña o password incorrecto', 'Oops!')
  }

  showInfoEmail()
  {
    this.toastr.warningToastr('El correo que ingresaste no existe en la base de datos')
  }

  forgotPassword()
  {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result == 1 ){
    this.service.enviarCorreo(this.service.getDialogData()).subscribe((data)=>{
      this.statusEmail = data
      if(this.statusEmail == 1)
      {
        /* Correo enviado */
        this.showSuccessEmail()
      }else if(this.statusEmail == 0)
      {
/* Correo no enviado */
this.showErrorEmail()
      }else if(this.statusEmail == 3)
      {
        /* correo no existe en la base de datos */
        this.showInfoEmail()
      }

    },(error)=>{
      // console.log(error)
    })
      }
    })
  }

}
