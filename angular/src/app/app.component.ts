import { Component } from '@angular/core';
import {HomePersonalComponent} from './home-personal/home-personal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor(private router :Router){}
  
  logout(){
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login');
  }
  
}
