import { Component, OnInit } from '@angular/core';
import { PmembresiaService } from 'src/app/services/pmembresia.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PerfilmemeditComponent } from '../../alumnos/perfilmemedit/perfilmemedit.component';


@Component({
  selector: 'app-modulomembrecias',
  templateUrl: './modulomembrecias.component.html',
  styleUrls: ['./modulomembrecias.component.css']
})
export class ModulomembreciasComponent implements OnInit {

  datos:any;
  datosEditMem: any
  membresia: any;


  sucursal=localStorage.getItem('sucursal')


  constructor(public pmem:PmembresiaService,
    public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.pmem.getHorarios().subscribe(data => {
      this.datos=data
      this.datos=this.datos.filter(x=>x.idsuc==this.sucursal)

    });
  }
  editMem(i: number, idmalu,mem, fechainicio, adelanto, restante, total,nommem) {
    // console.log(this.membresia)
    const dialogRef = this.dialog.open(PerfilmemeditComponent, {
      width: '37%',
      data:
      {
        i: i, idmalu: idmalu,nombre:mem, fechainicio: fechainicio, adelanto: adelanto, restante: restante, total: total,nommem:nommem
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

        this.perfilService.putMembresias(this.perfilService.getDialogData()).subscribe((data) => {
          this.datosEditMem = this.perfilService.getDialogData()
          this.membresia[i].adelanto = this.datosEditMem.adelanto
          this.membresia[i].restante = this.datosEditMem.restante
          this.membresia[i].total = this.datosEditMem.total
          this.showSuccessEdit()

        }, (error) => {
          this.showErrorEdit()
        })
      }
    })
  }

    // Notificación de success al editar
    showSuccessEdit() {
      this.toastr.successToastr('Registro actualizado', 'Exito!');
    }
  
    // Notificacion de error al editar
    showErrorEdit() {
      this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
    }

}
