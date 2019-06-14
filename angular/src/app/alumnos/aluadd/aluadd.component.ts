import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { HttpClient} from '@angular/common/http';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Dias } from 'src/app/interfaces/dias';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { GruposAlumnos } from 'src/app/interfaces/gruposalumnos';
import { Observable } from 'rxjs';
import { Horas } from 'src/app/interfaces/horas';
import { GethorariosService } from 'src/app/services/gethorarios.service';
import { Personal } from 'src/app/interfaces/personal';

@Component({
  selector: 'app-aluadd',
  templateUrl: './aluadd.component.html',
  styleUrls: ['./aluadd.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AluaddComponent implements OnInit {

  detallegrupos: Detallegrupos = 
  {
    iddgru: null,
    idd: null,
    idh: null,
    idp: null,
    idalu: null
  }

  // Horas obtenidas de laravel
   _allHoras: Horas[];

   // Personal obtenido de larabel
   _allPersonal: Personal[];

  //  Display y label hora y personal
  spinerh = "none";
  labelh= "";
  spinnerp= "none";
  labelp= "";

  // Esconder la contraseña en el input 
  hide = true;
  
  // Validaciones de el formulario
  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  // Interfaz de la tabla de grupos por alumno
  gruposAlumnos: GruposAlumnos = 
  {
    idgalu: null,
    idg: null,
    idalu: null
  }

  // Interfaz de la tabla dias
  dia: Dias = 
  {
    iddia: null,
    dia: null
  }

  // Interfaz de la tabla horas
  hora: Horas = 
  {
    idh: null,
    hora: null
  }

  // Interfaz de personal
  persona: Personal =  {
    idper: null, nombre: null, apellidos: null, usuario: null,
    contra: null, fechanac: null, sexo: null, curp: null,
    estadocivil: null, domicilio: null, fechaingreso: null, horasalida: null,
    horaentrada: null, perfilprofesional: null, especialidad: null, salariomensual: null,
    tareasasignadas: null, idtper: null, activo: null
  };

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un correo valido' :
        '';
  }

  padresControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getPadresMessage() {
    return this.padresControl.hasError('required') ? 'Campo obligatorio perro' :
      this.padresControl.hasError('email') ? 'Ingrese un correo valido' :
        '';
  }

  // Notificación de success al eliminar
  showSuccesSave() {
    this.toastr.successToastr('Registro guardado','Exito!');
  }

  // Notificacion de error al eliminar
  showErrorSave() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Notificacion de que no hay registros de horas y personal disponible
  showDisp() {
    this.toastr.infoToastr('No hay horarios disponibles', 'Oops!');
  }
  
  constructor(private alumnosService: AlumnosService, private httpClient: HttpClient,
    public toastr: ToastrManager, private gethorarios: GethorariosService) { }

  ngOnInit() 
  {
    
  }

  // Interfaz de la tabla alumnos
  alumno: Alumnos =  {
    idalu: null,
    nomalu: null,
    apealu: null,
    fnacalu: null,
    sexoalu: null,
    domalu: null,
    telalu: null,
    correoalu: null,
    medicacion: null,
    alergias: null,
    perfilalu: null,
    cronica: null,
    otro: null,
    evaluacion: null,
    usuarioalu: null,
    pswalu: null,
    nompad: null,
    apepad: null,
    dompad: null,
    telpad: null,
    correopad: null,
    ocupad: null,
    nommad: null,
    apemad: null,
    dommad: null,
    telmad: null,
    correomad: null,
    ocupmad: null,
    nommem: null,
    costomem: null,
    fechaini: null,
    fechafin: null,
    total: null,
    adelanto: null,
    restante: null,
    usuariopad: null,
    pswpad: null,
    activo: null,
    idsuc: null
  };

  // Metodo para guardar alumnos
  saveAlumno(alumno)
    {
        alumno.restante = alumno.total - alumno.adelanto;
      console.log(alumno.restante);
      this.alumnosService.save(alumno).subscribe((data)=>{

        this.showErrorSave();
      },(error)=>{
        this.showErrorSave();
      });  
    }

    diasChange(dia)
    {
      this.labelh = "none"
      this.spinerh = "";
      this.gethorarios.getHora(dia).subscribe((data: Horas[])=>{
        this._allHoras = data;
        this.labelh = ""
      this.spinerh = "none";
      this.detallegrupos.idd = dia.iddia;
      console.log(this.detallegrupos);
        if(this._allHoras.length < 1 )
        {
          this.showDisp();
        }
      }, (error)=>{
        console.log(error);
        
      });
    }

    horasChange(hora)
    {
      this.labelp="none";
      this.spinnerp="";
      this.detallegrupos.idh = hora.idh;
      console.log(this.detallegrupos);
      this.gethorarios.getPersonal(this.detallegrupos).subscribe((data: Personal[])=>{
      this._allPersonal = data;
      this.labelp ="";
      this.spinnerp = "none";
      console.log(this._allPersonal);
      }, (error)=>{

      });
    }
}
