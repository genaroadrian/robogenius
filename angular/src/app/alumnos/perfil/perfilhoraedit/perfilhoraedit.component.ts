import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder } from '@angular/forms';
import { Dias } from 'src/app/interfaces/dias';
import { GethorariosService } from 'src/app/services/gethorarios.service';
import { Horas } from 'src/app/interfaces/horas';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { Personal } from 'src/app/interfaces/personal';
import { GruposAlumnos } from 'src/app/interfaces/gruposalumnos';
import { PerfilService } from 'src/app/services/perfil.service';
import { GEdit } from 'src/app/interfaces/gedit';
  
@Component({
  selector: 'app-perfilhoraedit',
  templateUrl: './perfilhoraedit.component.html',
  styleUrls: ['./perfilhoraedit.component.css']
})
export class PerfilhoraeditComponent implements OnInit {

  
  /* Variable de la interfaz de horas */
  dia: Dias= {
    iddia: null,
    dia: null
  }

  // Actualizar los valores cuando se actualiza un horario
  nomdia: string;
  nomhora: string;
  nompersonal: string;

  diavalue;

  ngrupo: GEdit = {
    dia: null,
    hora: null,
    nombre: null,
    iddia: null,
    idh: null,
    idgalu: null,
    idper: null,
    apellidos: null
  }

  // Interfaz de personal
  persona: Personal = {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada: null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null,idsuc:null,fotopersonal:null
  };

  // Interfaz de la tabla horas
  hora: Horas =
    {
      idh: null,
      hora: null,
      idsuc:null
    }

    nuevoGrupo: any

  // Horas obtenidas de laravel
  _allHoras: Horas[];

  // ID del grupo o clases
  idgrupo: any;

  // Variable donde se almacenara los datos guardados en la base de datos
  alu;

  // Resetear los valores de los horarios
  horavalue;

  // Resetear los valores del personal
  pervalue;

  //  Display y label hora y personal
  spinerh = "none";
  labelh = "";
  spinnerp = "none";
  labelp = "";

  // Interfaz de la tabla detalle grupos
  detallegrupos: Detallegrupos =
    {
      iddgru: null,
      idd: null,
      idh: null,
      idp: null
    }

    gruposAlumnos: GruposAlumnos =
    {
      idgalu: null,
      idg: null,
      idalu: null
    }

    // Personal obtenido de larabel
  _allPersonal: Personal[];

  idsuc:any;

  constructor(public dialogRef: MatDialogRef<PerfilhoraeditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public alumnosService: AlumnosService, 
    public toastr: ToastrManager, fb: FormBuilder, private getHorarios: GethorariosService,
    public perfilService: PerfilService) {
      this.idsuc=localStorage.getItem('sucursal')

     }

  ngOnInit() {
    // console.log(this.data);
    this.ngrupo.idgalu = this.data.idgalu
  }

  diasChange(dia) {
    // // console.log(dia);
    this.hora.idh = null;
    this.idgrupo = null;
    this.horavalue = "";
    this.pervalue = "";
    this.labelh = "none"
    this.spinerh = "";
    this.getHorarios.getHora(dia).subscribe((data: Horas[]) => {
      data=data.filter(datas=>datas.idsuc=this.idsuc)
      this._allHoras = data;
      this.labelh = ""
      this.spinerh = "none";
      this.horavalue = "";
      this.detallegrupos.idd = dia.iddia;
      // // // console.log(this.detallegrupos);
      if (this._allHoras.length < 1) {
        // this.showDisp();
      }
    }, (error) => {
      // // // console.log(error);

    });
    // this.horavalue = "";
  }

  // Obtiene el personal y el id del grupo dependiendo la hora, el dia elegido y el personal escogido
  horasChange(hora) {
    this.idgrupo = null;
    this.pervalue = "";
    this.labelp = "none";
    this.spinnerp = "";
    this.detallegrupos.idh = hora.idh;
    // // // console.log(this.detallegrupos);
    this.getHorarios.getPersonal(this.detallegrupos).subscribe((data: Personal[]) => {
      this._allPersonal = data; 
      this._allPersonal=this._allPersonal.filter(datas=>datas.idsuc==this.idsuc)
      console.log(this._allPersonal)
      this.labelp = "";
      this.spinnerp = "none";
      // // // console.log(this._allPersonal);
    }, (error) => {

    });
  }

  // Obteine el id del grupo al cambiar el personal
  personalChange(id) {
    // // console.log(nombre)
    this.gruposAlumnos.idg = id;
    // // console.log(this.hora.idh+this.idgrupo)
  }

    /* Obtener el texto de los select */
  perName(per)
  { 
    this.nuevoGrupo = per
    this.ngrupo.idper = per.idp
    this.ngrupo.nombre = per.nombre
    this.ngrupo.apellidos = per.apellidos
  }
  /* Obtener el texto de los select */
  horaName(ho)
  {
    // console.log(ho)
    this.ngrupo.idh = ho.idh
    this.ngrupo.hora = ho.hora
  }
  /* Obtener el texto de los select */
  diaName(dia: string)
  {
    this.ngrupo.dia = dia
    this.ngrupo.iddia = this.dia.iddia
  }

  // Metodo para cuando termine de guardar
  stopEdit(): void {
      this.perfilService.putPerfilHora(this.nuevoGrupo)
      this.perfilService.nuevoPerfilHora(this.ngrupo)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
