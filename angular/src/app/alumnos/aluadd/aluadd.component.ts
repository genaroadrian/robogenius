import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { HttpClient} from '@angular/common/http';
import { Alumnos } from 'src/app/interfaces/alumnos';
import { FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-aluadd',
  templateUrl: './aluadd.component.html',
  styleUrls: ['./aluadd.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AluaddComponent implements OnInit {

  hide = true;

  selecdia = "1";

  
  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

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



  
  constructor(private alumnosService: AlumnosService, private httpClient: HttpClient,
    public toastr: ToastrManager) { }

  ngOnInit() 
  {
    
  }

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


  onFileSelected(event)
  {
    // this.alumno.perfilalu = event.target.files[0].name;
    // console.log(this.alumno.perfilalu);
   
    }

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
}
