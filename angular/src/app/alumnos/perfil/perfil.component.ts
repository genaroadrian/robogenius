import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialog } from '@angular/material';
import { AlueditComponent } from '../aluedit/aluedit.component';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PerfilhoraeditComponent } from './perfilhoraedit/perfilhoraedit.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  /* Variable de la informacion del alumno traida desde la tabla de alumnos */
  datos: any;

  /* Datos que se van a mandar a el servicio para que se modifiquen en la base de datos */
  alu: any;

  /* Variable que contiene las membresias del alumno seleccionado */
  membresia: any;

  /* Tamaño de la variable de las membresias (se usa como contador las mostrar las membresias del alumno) */
  memlenght: number;

  /* Encabezados de la tabla de horarios */
  displayedColumns: string[] = ['id','iddia','dia','idh', 'hora', 'idper' ,'instructor', 'actions'];

  /* Visibilidad de la columna de id */
  tableview = "none";

  /* Variable que contiene la informacion de los horarios del alumno */
  dataSource: any;

  /* Variuable del expansion panel */
  panelOpenState = false;

  constructor(public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager) {
  }

  ngOnInit() {
    /* Obtiene los datos del alumno (se obtienen de perfilService en el metodo "ret"), su historial de membresias y su horario */
    this.datos = this.perfilService.ret()
    this.membresias();
    this.horarios();
  }


  /* Obtiene todas las membresias del alumno seleccionado */
  membresias()
  {
    this.perfilService.getmem(this.datos).subscribe((data) => {
      this.membresia = data;
      this.memlenght = this.membresia.length;
    }, (error) => {

    });
  }

  // Notificación de success al editar
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  // Notificacion de error al editar
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  /* Obtiene el horario del alumno seleccionado */
  horarios()
  {
    this.perfilService.gethorario(this.datos).subscribe((data)=>{
      this.dataSource = data;
      console.log(this.dataSource)
    }, (error)=>{

    })
  }

  editAlu(idalu: number,nomalu: string, apealu: string, fnacalu: string, sexoalu: string, 
    domalu: string, telalu: number, correoalu: string, medicacion: string,
    alergias: string, perfilalu: string, cronica: string, otro: string,
    evaluacion: string, usuarioalu: string, pswalu: string, nompad: string,
    apepad: string, dompad: string, telpad: number, correopad: string,
    ocupad: string, nommad: string, apemad: string, dommad: string,
    telmad: number, correomad: string, ocupmad: string, finscripcion: string, usuariopad: string,
    pswpad: string )
  {
    
    const dialogRef = this.dialog.open(AlueditComponent, {
      // Anchura de el modal
      width: '60%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data: 
      {
        idalu:idalu, nomalu: nomalu, apealu: apealu, fnacalu: fnacalu, sexoalu: sexoalu,
        domalu: domalu, telalu: telalu, correoalu: correoalu, medicacion: medicacion,
    alergias: alergias, perfilalu: perfilalu, cronica: cronica, otro: otro,
    evaluacion: evaluacion, usuarioalu: usuarioalu, pswalu: pswalu, nompad: nompad,
    apepad: apepad, dompad: dompad, telpad: telpad, correopad: correopad,
    ocupad: ocupad, nommad: nommad, apemad: apemad, dommad: dommad,
    telmad: telmad, correomad: correomad, ocupmad: ocupmad, usuariopad: usuariopad,
    pswpad: pswpad, finscripcion: finscripcion
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1)
      {
        this.alu = this.perfilService.getDialogData();
        this.alumnosService.put(this.alu).subscribe((data)=>{
          this.showSuccessEdit();
          this.datos = this.perfilService.getDialogData();
        },(error)=>{
          this.showErrorEdit();
        });
        
      }
    });
  }

  editHora(i:number, idgalu: number, iddia: number, idh: number , idper: number)
  {
    const dialogRef = this.dialog.open(PerfilhoraeditComponent, {
      // Anchura de el modal
      width: '80%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data: 
      {
       i:i, idgalu: idgalu, iddia: iddia, idh: idh, idper: idper
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1)
      {
        this.alu = this.perfilService.getDialogData();
        this.alumnosService.put(this.alu).subscribe((data)=>{
          this.showSuccessEdit();
          this.datos = this.perfilService.getDialogData();
        },(error)=>{
          this.showErrorEdit();
        });
        
      }
    });
  }



}
