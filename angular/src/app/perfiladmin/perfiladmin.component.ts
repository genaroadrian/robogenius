import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.css']
})
export class PerfiladminComponent implements OnInit {


  log:Login[];
  logs:Login[];
  selecionar:any;
  constructor( private service:LoginService) { }
  public  emai = localStorage.getItem("email");

  ngOnInit() {

    this.service.getPersonas()
    .subscribe(data=>{
      this.log=data;
      this.logs = this.log.filter(x=>x.email == this.emai)
    })
  }

}
