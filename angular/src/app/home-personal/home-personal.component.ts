import { Component, OnInit } from '@angular/core';
import {PersonalService} from '../services/personal.service';
import {HttpClient} from '@angular/common/http';
import {Personal} from '../interfaces/personal';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-home-personal',
  templateUrl: './home-personal.component.html',
  styleUrls: ['./home-personal.component.css'],
  template: `
  <div style="overflow:auto;
overflow: scroll;
overflow-y:hidden;
overflow-x: scroll;"> <ng2-smart-table [settings]="settings" [source]="personal"></ng2-smart-table></div>
   `,
})



export class HomePersonalComponent implements OnInit {
	
	API_ENDPOINT = 'http://localhost:8000/api';
	personal: Personal[];
  constructor(private personalService: PersonalService, private httpClient:HttpClient){
	httpClient.get(this.API_ENDPOINT + '/personal').subscribe((data: Personal[])=>{
		this.personal = data;
	});
  }
  
  ngOnInit() {
  }

  settings = {
    columns: {
      idper: {
        title: 'ID'
      },
      nombre: {
        title: 'Nombre'
      },
      apellidos: {
        title: 'Apellidos'
      },
      usuario: {
        title: 'Usuario'
      },
      contra: {
        title: 'Contraseña',
        type: 'password'
      },
      fechanac: {
        title: 'Fecha de nacimiento'
      },
      sexo: {
        title: 'Sexo'
      },
      curp: {
        title: 'CURP'
      },
      estadocivil: {
        title: 'Estado civil'
      },
      domicilio: {
        title: 'Domicilio'
      },
      fechaingreso: {
        title: 'Fecha de ingreso'
      },
      horaentrada: {
        title: 'Hora / entrada'
      },
      horasalida: {
        title: 'Hora / salida'
      },
      perfilprofesional: {
        title: 'Perfil Profesional'
      },
      especialidad: {
        title: 'Especialidad'
      },
      salariomensual: {
        title: 'Salario mensual'
      },
      tareasasignadas: {
        title: 'Tareas asignadas'
      },
      idtper: {
        title: 'ID tipo de personal'
      },
    }
  };
}


