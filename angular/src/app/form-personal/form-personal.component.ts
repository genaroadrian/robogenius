import { Component, OnInit, Input } from '@angular/core';
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import {Tipopersonal} from '../interfaces/tipopersonal';
import { PersonalService } from '../services/personal.service';
import {Personal} from '../interfaces/personal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css']
})


export class FormPersonalComponent implements OnInit {
  @Input() row: [];

  persona: Personal =  {
    idper: null,
    nombre: null,
    apellidos: null,
    usuario: null,
    contra: null,
    fechanac: null,
    sexo: null,
    curp: null,
    estadocivil: null,
    domicilio: null,
    fechaingreso: null,
    horasalida: null,
    horaentrada: null,
    perfilprofesional: null,
    especialidad: null,
    salariomensual: null,
    tareasasignadas: null,
    idtper: null,
    activo: null
  };

  tipopersonal: Tipopersonal[];
  id: any;
  editing: boolean = false;
  personal: Personal[];
  constructor(
    private tipopersonalService: TipopersonalService, 
    private httpClient: HttpClient,
    private personalService : PersonalService,
    private activatedRoute: ActivatedRoute) {
    this.tipopersonalService.get().subscribe((data: Tipopersonal[])=>{
      this.tipopersonal = data;
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    if(this.id){
      this.editing = true;
      this.personalService.get().subscribe((data: Personal[])=>{
        this.personal = data;
        this.persona = this.personal.find((m)=>{
          return m.idper == this.id;
        });
        console.log(this.persona);
      }, (error)=>{
        console.log(error)
      });
    } else {
      this.editing = false;
    }
   }

  ngOnInit() {
  }

  // Metodo para guardar productos
  savePersonal() {
    if(this.editing){
      this.personalService.put(this.persona).subscribe((data) =>{
        alert('Registro Actualizado');
        console.log(data);
      },(error)=>{
        console.log(error);
        alert('Ocurrio un error');
      });
    }else{
      this.personalService.save(this.persona).subscribe((data) =>{
        alert('Registro guardado');
        console.log(data);
      },(error)=>{
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    
  }

}
