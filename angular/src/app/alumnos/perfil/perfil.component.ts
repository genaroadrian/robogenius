import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  datos: any;
  membresia: any;
  horario: any;

  constructor(private perfilService: PerfilService, private router :Router  ) { }


  logout(){
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login');
  }


  ngOnInit() {
    this.datos = this.perfilService.ret();  
    console.log(this.datos);
    this.membresias();
    this.horarios();
  }

  membresias()
  {
    this.perfilService.getmem(this.datos).subscribe((data) => {
      this.membresia = data;
      console.log(this.membresia);
    }, (error) => {

    });
  }

  horarios()
  {
    this.perfilService.gethorario(this.datos).subscribe((data)=>{
      this.horario = data;
      console.log(this.horario);
    }, (error)=>{

    })
  }



}
