import { Component, OnInit, Input } from '@angular/core';
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import { Tipopersonal } from '../interfaces/tipopersonal';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../interfaces/personal';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Detallegrupos } from '../interfaces/detallegrupos';
import { DetallegruposService } from '../services/detallegrupos.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})


export class FormPersonalComponent implements OnInit {

  // Tabs validators
  tabs = ['Horario'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('Horario');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  agregarTab(index: number) {
    this.tabs.splice(index, 1);
  }

  ngOnInit() {
   
  }

  // Change the user and password input and groups module visibility 
  tipoChange(event) {
    if (this.selectedtp == "2") {
      this.isDisable = false;
      this.visibility = "block";
      this.visibilityspan = "none";
    } else {
      this.isDisable = true;
      this.visibility = "none";
      this.visibilityspan = "block";
    }

  }

  

  // Resetear usuario y contraseña
  cleanCamps = "";
  visibility = "none";
  visibilityspan = "block";
  // Valor de lo disables
  isDisable = true;
  // Valor del tipo de personal
  selectedtp = '1';
  // Ocultar el campo de contraseña por defecto
  hide = true;
  // Que aparezca hombre selecciondo por defecto en el select de sexo
  selectedsex = 'Hombre';
  // Que aparezca soltero seleccionado por defecto en el select de estado civil
  selectedestado = 'Soltero(a)';

  // Interfaz de personal
  personal: Personal[];

  // Campos a guardar personal
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

  idp: any;
  idper: number;
  // Interfaz de detalle de grupos
  detallegrupos: Detallegrupos[];

  // Campos a guardar detalle grupos
  detallegrupo: Detallegrupos = {
    iddgru: null,
    idalu: null,
    idd: null,
    idh: null,
    idp: this.idper,
    activo: null
  };

  sanitizeDate(date: string): string {
    if (!date) {
      return null;
    }
  
    const dataArray = date.split('-');
    const month = Number(dataArray[0]) - 1;
    const day = Number(dataArray[1]);
    const year = Number(dataArray[2]);
    return (new Date(year, month, day)).toISOString();
  }

  today= new Date();
  jstoday = '';

  constructor(private personalService: PersonalService , private detallegruposService: DetallegruposService,
    private _formBuilder: FormBuilder,
    private httpClient: HttpClient) 
    {
      // Get date
      this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
      console.log(this.jstoday);
    }

    showDate(){

    }

    // Guardar la informacion del personal
    savePersonal(persona)
    {
      // this.persona.fechaingreso = this.sanitizeDate(this.persona.fechaingreso);
      this.personalService.save(persona).subscribe((data)=>{
        console.log(data);
        // this.idp = data;
        // this.idper = this.idp.idper;
      },(error)=>{
        alert('Ocurrio un error');
        console.log(error);
      });
    }

    saveDetallegrupos(index)
    {
      this.detallegrupo.idp = this.idper;
      console.log(this.detallegrupo);
      this.detallegruposService.save(this.detallegrupo).subscribe((data)=>{
        console.log(data);
      }, (error)=>{
        console.log(error);
      });
      this.removeTab(index);
    }




}
