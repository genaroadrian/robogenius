import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from 'src/app/interfaces/alumnos';

@Component({
  selector: 'app-aluadd',
  templateUrl: './aluadd.component.html',
  styleUrls: ['./aluadd.component.css']
})
export class AluaddComponent implements OnInit {

  constructor(private alumnosService: AlumnosService, private httpClient: HttpClient) { }

  ngOnInit() {
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
      
      console.log(alumno);
      this.alumnosService.save(alumno).subscribe((data)=>{

        console.log(data);
      },(error)=>{
        console.log(error);
        
      });
    }

}
