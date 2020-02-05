import { Component, OnInit } from '@angular/core';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material';
import { NotificationsService } from 'src/app/services/notifications.service';
import { EditMemComponent } from '../edit-mem/edit-mem.component';
import { EdittipomemComponent } from 'src/app/tipomembresias/edittipomem/edittipomem.component';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { AddhoraescComponent } from '../addhoraesc/addhoraesc.component';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { EdithoraescComponent } from '../edithoraesc/edithoraesc.component';
import { globalVarimg } from "../../services/global.service";

@Component({
  selector: 'app-perfil-escuelas',
  templateUrl: './perfil-escuelas.component.html',
  styleUrls: ['./perfil-escuelas.component.css']
})
export class PerfilEscuelasComponent implements OnInit {
  API_ENDPOINT = globalVarimg.url;
  data: any
  info: any
  alumnos = []
  loading: string
  alumnosFiltered: any = []
  membresias = {
    nombre: null,
    costo: null,
    clases: null
  }
  barra: string = ''
  status: string = ''
  displayedColumns: string[] = ['dia', 'hora', 'personal', 'acciones']
  horario = []

  constructor(public escuelasService: EscuelasService, public dialog: MatDialog,
    public notificationsService: NotificationsService, public tipomebresiaService: TipomembresiaService,
    public detalleGruposService: DetallegruposService) { }

  ngOnInit() {
    this.data = this.escuelasService.getDialogData()
    this.getAll()
  }

  async getAll()
  {
    this.barra = ''
    this.loading = 'Cargando...'
    try {
      this.info = await this.escuelasService.fetchProfileInfo(this.data.idesc).toPromise()
      // console.log(this.info)
    this.alumnos = this.info[0]

    this.alumnosFiltered = this.alumnos
    if(this.alumnosFiltered.length < 1)
    {
      this.loading = 'No hay resultados'
    }
    this.membresias = this.info[1]
    this.horario = this.info[2]
    this.barra = 'none'
    } catch (e) {
      // console.log(e)
    }

  }

  editInfo(data)
  {
    // console.log(data)
    const dialogRef = this.dialog.open(EditComponent, {
      data: { idesc: data.idesc, nombre: data.nombre, representante: data.representante, direccion: data.direccion, telefono: data.telefono, correouno: data.correouno }
    });
    dialogRef.afterClosed().subscribe(async result =>{
      if(result === 1)
      {
        this.barra = ''
        
        try {
          let d = await this.escuelasService.put(this.escuelasService.getDialogData()).toPromise()
        this.data = d
        this.barra = 'none'
        this.notificationsService.showSuccessEdit()
        } catch (e) {
          this.barra = 'none'
          this.notificationsService.showError()
        }

      }
    })
  }

  editMem(data)
  {
    const dialogRef = this.dialog.open(EdittipomemComponent, {
      data: {idtmem: data.idtmem,nombre: data.nombre,costo: data.costo,clases: data.clases}
    })
    dialogRef.afterClosed().subscribe(async result =>{
      if(result === 1)
      {

        try {
          this.barra = ''
          let m: any = await this.tipomebresiaService.put(this.tipomebresiaService.getDialogData()).toPromise()
          this.membresias = m
          this.barra = 'none'
          this.notificationsService.showSuccessEdit()
        } catch (e) {
          // console.log(e)
          this.notificationsService.showError()
          this.barra = 'none'
        }
      }
    })
  }

  addH(data)
  {
    // console.log(data)
    const dialogRef = this.dialog.open(AddhoraescComponent,{
      data: {idesc: data.idesc, idd: '', idh: '', idp: ''}
    })
    dialogRef.afterClosed().subscribe(async result =>{
      if(result === 1)
      {
          // console.log(this.detalleGruposService.getDialogData())
          try {
            let d = await this.detalleGruposService.save(this.detalleGruposService.getDialogData()).toPromise()
            this.getAll()
          } catch (e) {
            
          }
      }
    })
  }

  editHora(i: number, id: number, idd: number, idh: number, idp: number)
  {
    // console.log(idd)
    // console.log(idh);
    // console.log(idp);
    const index = i
    const dialogRef = this.dialog.open(EdithoraescComponent, {
      data: {iddgru: id, idd: idd, idh: idh, idp: idp, idesc: this.data.idesc}
    })
    dialogRef.afterClosed().subscribe(async result => {
      if(result === 1)
      {
        try {
          await this.detalleGruposService.update(this.detalleGruposService.getDialogData()).toPromise()
          this.getAll()
        } catch (e) {
          // console.log(e)
        }
      }
    })
  }

  search(value)
  {
    this.alumnosFiltered = this.alumnos.filter(element => element.nombre.toLowerCase().includes(value.toLowerCase()) )
    if(this.alumnosFiltered.length < 1)
    {
      this.loading = 'Sin resultados'
    }

  }

}