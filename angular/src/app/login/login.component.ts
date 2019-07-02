import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    log:Login[];
  constructor(private router: Router, private service:LoginService) { }

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
      this.log=data;
    })
  }

  login(form: NgForm){
    console.log(form.value);
    
  

    if (form.value.email === form.value.email && form.value.password === form.value.password){
        localStorage.setItem('email' , form.value.email);
        this.router.navigateByUrl('/personal');
    
    }
  }
  // login(form: NgForm){
  //   console.log(form.value);
    
  //   if (form.value.email === 'chomp@live.com' && form.value.password ==='12'){
  //       localStorage.setItem('email' , form.value.email);
  //       this.router.navigateByUrl('/personal');
    
  //   }
  // }

}
