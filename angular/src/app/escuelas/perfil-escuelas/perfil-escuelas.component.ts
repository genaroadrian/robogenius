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

@Component({
  selector: 'app-perfil-escuelas',
  templateUrl: './perfil-escuelas.component.html',
  styleUrls: ['./perfil-escuelas.component.css']
})
export class PerfilEscuelasComponent implements OnInit {
  data: any
  info: any
  alumnos = []
  membresias = {
    nombre: null,
    costo: null,
    clases: null
  }
  barra: string = ''
  status: string = ''
  displayedColumns: string[] = ['dia', 'hora', 'personal']
  horario = []

  constructor(public escuelasService: EscuelasService, public dialog: MatDialog,
    public notificationsService: NotificationsService, public tipomebresiaService: TipomembresiaService,
    public detalleGruposService: DetallegruposService) { }

  ngOnInit() {
    this.data = this.escuelasService.getDialogData()
    this.escuelasService.fetchProfileInfo(this.data.idesc).subscribe((data)=>{
      this.barra = 'none'
      this.info = data
      this.alumnos = this.info[0].forEach((element, index, array)=>{
      element.fnacalu = this.ageCalculator(element.fnacalu)
    })
      this.membresias = this.info[1]
      console.log(this.membresias)
      this.horario = this.info[2]

    },(error)=>{
      
    })
  }

  ageCalculator(nac){
      const convertAge = new Date(nac);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      let showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      return showAge
  }

  editInfo(data)
  {
    console.log(data)
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
          console.log(e)
          this.notificationsService.showError()
          this.barra = 'none'
        }
      }
    })
  }

  addH(data)
  {
    console.log(data)
    const dialogRef = this.dialog.open(AddhoraescComponent,{
      data: {idesc: data.idesc}
    })
    dialogRef.afterClosed().subscribe(async result =>{
      if(result === 1)
      {
          console.log(this.detalleGruposService.getDialogData())
      }
    })
  }

}