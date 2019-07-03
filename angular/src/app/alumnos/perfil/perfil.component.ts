import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  datos: any;
  membresia: any;
  displayedColumns: string[] = ['dia', 'hora', 'instructor', 'actions'];
  dataSource: any;
  panelOpenState = false;
  memlenght: number;

  constructor(private perfilService: PerfilService) {
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
      this.memlenght = this.membresia.length;
    }, (error) => {

    });
  }

  horarios()
  {
    this.perfilService.gethorario(this.datos).subscribe((data)=>{
      this.dataSource = data;
    }, (error)=>{

    })
  }



}
