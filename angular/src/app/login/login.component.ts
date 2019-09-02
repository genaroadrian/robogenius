import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { MatDialog} from '@angular/material';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    log:Login[];
  hide = true;

  constructor(private router: Router, private service:LoginService,public dialog: MatDialog) { }

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
      this.log=data;
    })
  }

  login(form: NgForm){  
    if (form.value.email === form.value.email && form.value.password === form.value.password){
        localStorage.setItem('email' , form.value.email);
        this.router.navigateByUrl('/home'); 
    }
  }

  forgotPassword()
  {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result == 1 ){
        
      }
    })
  }

}
