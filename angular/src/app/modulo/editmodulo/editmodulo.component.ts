import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { MatDialog } from '@angular/material';
import { EditsesionesComponent } from 'src/app/sesiones/editsesiones/editsesiones.component';
import { SesionesService } from 'src/app/services/sesiones.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DeletesesionesComponent } from 'src/app/sesiones/deletesesiones/deletesesiones.component';
import { DceditComponent } from 'src/app/detalleclases/dcedit/dcedit.component';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent implements OnInit {

  aC = []
  sAC = []
  herra = []

  detalleClases: any
  folio: string
  planeaciones: any
  sesiones: any
  fecha: any
  plan: any
  barra: string = 'none'

  // tabs es la variable para pintar las tabs
  tabs = ['Clase 1', 'Clase 2', 'Clase 3'];
  selected = new FormControl(0);


  constructor(public homefclasesService: HomefclasesService, public dialog: MatDialog,
    public sesionesService: SesionesService, public notificationsService: NotificationsService,
    public moduloService: ModuloService) { }

  ngOnInit() {
    this.getData()
  }

  showBarra() {
    this.barra = ''
  }

  hideBarra() {
    this.barra = 'none'
  }

  getData() {
    this.plan = this.homefclasesService.returnData()
    this.homefclasesService.getDataSesion(this.homefclasesService.returnData()).subscribe((data) => {

      let datos: any
      datos = data
      this.detalleClases = datos[0]
      this.folio = this.detalleClases[0].folio
      this.planeaciones = datos[1]
      this.planeaciones = this.planeaciones[0]
      this.sesiones = datos[2]
      this.fecha = this.planeaciones.fecha
      this.fecha = new Date(this.fecha + 'T00:00:00')
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      this.fecha = this.fecha.toLocaleDateString("es-ES", options)

    })
  }

  editSes(idsesion, nombre, objetivo, apren_clave,
    introduccion, contenido, desarrollo, mat_necesario, ice_break,
    descanso, cierre, i) {
    const dialogRef = this.dialog.open(EditsesionesComponent, {
      data: {
        idsesion: idsesion, nombre: nombre, objetivo: objetivo, apren_clave: apren_clave, introduccion: introduccion, ice_break: ice_break, contenido: contenido, desarrollo: desarrollo, mat_necesario: mat_necesario, descanso: descanso,
        cierre: cierre
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.sesionesService.put(this.sesionesService.getDialogData()).subscribe((data) => {
          this.sesiones[i] = this.sesionesService.getDialogData()
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

  deleteSesion(id, nombre, i) {
    const dialogRef = this.dialog.open(DeletesesionesComponent, {
      data: { nombre: nombre }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.sesionesService.delete(id).subscribe((data) => {
          this.sesiones.splice(i, 1)
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

  editDetalle() {
    let areac = []
    let subac = []
    let herramientas = []
    let n: string = ''
    this.detalleClases.forEach(function (element, index, array) {
      if (element.idac != null) {
        n = '' + element.idac + ''
        areac.push(n)
      }

      if (element.idsac != null) {
        n = '' + element.idsac + ''
        subac.push(n)
      }

      if (element.idherra != null) {
        n = '' + element.idherra + ''
        herramientas.push(n)
      }
    });

    const dialogRef = this.dialog.open(DceditComponent, {
      data: {
        ac: areac, subac: subac, herra: herramientas, idn: this.planeaciones.idn, idg: this.planeaciones.idg,
        idt: this.planeaciones.idt, ids: this.planeaciones.ids
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        let extras = this.moduloService.retExt()
        let folio = this.folio

        let data = []
        data.push(this.moduloService.getDialogData())
        data.push(this.moduloService.getPlan())
        this.moduloService.editDC(data, folio).subscribe((data) => {
          this.detalleClases = data
          this.plan.g = extras.grado
          this.plan.n = extras.nivel
          this.plan.ntema = extras.tema
          this.plan.nt = extras.subtema
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

}
