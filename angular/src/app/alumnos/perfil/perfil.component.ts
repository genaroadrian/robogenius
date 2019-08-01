import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialog } from '@angular/material';
import { AlueditComponent } from '../aluedit/aluedit.component';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PerfilhoraeditComponent } from './perfilhoraedit/perfilhoraedit.component';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { format } from 'util';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  id: number

  /* Longitud del array de los horarios */
  l;

  /* Fechas a usar para las membresias:  */
  fecha;
  hoy;

  /* Estatus de la membresia */
  status;

  /* Icono de el status de la membresia */
  icono;

  /* Color de la letra del status de la membresia */
  color;

  pagomem;

  /* Icono de el status de la membresia */
  iconopago;

  /* Color de la letra del status de la membresia */
  colorpago;

  /* Variable para actualizar los grupos */
  ngrupo: any;

  /* Variable de la informacion del alumno traida desde la tabla de alumnos */
  datos: any;

  /* Datos que se van a mandar a el servicio para que se modifiquen en la base de datos */
  alu: any;

  /* Variable que contiene las membresias del alumno seleccionado */
  membresia: any;


  /* Tamaño de la variable de las membresias (se usa como contador las mostrar las membresias del alumno) */
  memlenght: number;

  /* Encabezados de la tabla de horarios */
  displayedColumns: string[] = ['id', 'iddia', 'dia', 'idh', 'hora', 'idper', 'instructor', 'actions'];

  /* Visibilidad de la columna de id */
  tableview = "none";

  /* Variable que contiene la informacion de los horarios del alumno */
  dataSource;
  dataSoruceUp;

  /* Variuable del expansion panel */
  panelOpenState = false;

  constructor(public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    /* Obtiene los datos del alumno (se obtienen de perfilService en el metodo "ret"), su historial de membresias y su horario */
    this.datos = this.perfilService.ret()
    this.membresias();
    this.horarios();
  }


  /* Obtiene todas las membresias del alumno seleccionado */
  membresias() {
    this.perfilService.getmem(this.datos).subscribe((data) => {
      this.membresia = data;
      this.memlenght = this.membresia.length;
      this.fecha = this.membresia[0].fechainicio
      this.hoy = new Date().getTime()
      this.fecha = new Date(this.fecha).getTime()
      this.fecha = (this.hoy - this.fecha) / (1000 * 60 * 60 * 24)
      // console.log(this.fecha)

      /* Asignación de status de la membresia */
      if (this.fecha > 29 && this.fecha < 32) {
        this.status = "Membresia por terminar"
        this.color = "text-warning"
        this.icono = "warning"
      } else if (this.fecha > 1 && this.fecha < 25) {
        this.status = "Membresia activa"
        this.color = "text-success"
        this.icono = "verified_user"
      } else if (this.fecha > 32) {
        this.status = "Membresia inactiva"
        this.color = "text-danger"
        this.icono = "error"
      }
        /* Asignacion de status del pago de la membresia */
        if(this.membresia[0].restante > 0)
        {
          this.iconopago = "warning"
          this.colorpago = "text-warning"
          this.pagomem = "Debe $"+this.membresia[0].restante+".00"
          console.log(this.pagomem)
        }
        else{
          this.iconopago = "verified_user"
          this.colorpago = "text-success"
          this.pagomem = "Pagada"
        }
      

    }, (error) => {

    });
  }

  // Notificación de success al editar
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  // Notificacion de error al editar
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  /* Obtiene el horario del alumno seleccionado */
  horarios() {
    this.perfilService.gethorario(this.datos).subscribe((data) => {
      this.dataSource = data;
      // console(this.dataSource)
    }, (error) => {

    })
  }

  editAlu(idalu: number, nomalu: string, apealu: string, fnacalu: string, sexoalu: string,
    domalu: string, telalu: number, correoalu: string, medicacion: string,
    alergias: string, perfilalu: string, cronica: string, otro: string,
    evaluacion: string, usuarioalu: string, pswalu: string, nompad: string,
    apepad: string, dompad: string, telpad: number, correopad: string,
    ocupad: string, nommad: string, apemad: string, dommad: string,
    telmad: number, correomad: string, ocupmad: string, finscripcion: string, usuariopad: string,
    pswpad: string) {

    const dialogRef = this.dialog.open(AlueditComponent, {
      // Anchura de el modal
      width: '60%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data:
      {
        idalu: idalu, nomalu: nomalu, apealu: apealu, fnacalu: fnacalu, sexoalu: sexoalu,
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
      if (result == 1) {
        this.alu = this.perfilService.getDialogData();
        this.alumnosService.put(this.alu).subscribe((data) => {
          this.showSuccessEdit();
          this.datos = this.perfilService.getDialogData();
        }, (error) => {
          this.showErrorEdit();
        });

      }
    });
  }

  editHora(i: number, idgalu: number, iddia: number, idh: number, idper: number) {
    const dialogRef = this.dialog.open(PerfilhoraeditComponent, {
      // Anchura de el modal
      width: '80%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data:
      {
        i: i, idgalu: idgalu, iddia: iddia, idh: idh, idper: idper
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.ngrupo = this.perfilService.getDialogHoraData();
        // this.ngrupo.idgalu = idgalu
        // console(this.ngrupo)
        // console(this.dataSource[i]) new MatTableDataSource<any>();
        this.dataSource[i].dia = this.ngrupo.dia
        this.dataSource[i].hora = this.ngrupo.hora
        this.dataSource[i].nombre = this.ngrupo.nombre
        this.dataSource[i].apellidos = this.ngrupo.apellidos
        // console(this.dataSource[i])
        // this.refresh();
        // this.dataSource[i].

      }
    });
  }

  deleteHora(i, idgalu) {
    this.dataSource = this.dataSource.filter(x => x.idgalu !== idgalu)
  }

  editMem(i: number, nommem, fechainicio, adelanto, restante, total, nombre) {
    console.log(nommem, i, fechainicio, adelanto, restante, total, nombre)
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }



}
