import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { PersonalService } from 'src/app/services/personal.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-personalhoraedit',
  templateUrl: './personalhoraedit.component.html',
  styleUrls: ['./personalhoraedit.component.css']
})
export class PersonalhoraeditComponent implements OnInit {
  dias: any; horas: any
  dia = '' + this.data.idd + ''
  hora = '' + this.data.idh + ''
  bar : string
  sucursal:any

  constructor(public dialogRef: MatDialogRef<PersonalhoraeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalPerfilService: PersonalperfilService,
    public personalService: PersonalService, public detalleGruposService: DetallegruposService,
    public notificacionService: NotificationsService) { }

  ngOnInit() {
    this.getAll()
    this.sucursal=localStorage.getItem('sucursal')

  }

  showB()
  {
    this.bar = ''
  }


  hideB()
  {
    this.bar = 'none'
  }

  async getAll() {
    try {
      this.showB()
      let result = await Promise.all([this.personalService.getDias().toPromise(), this.personalService.getHorario().toPromise()])
      this.dias = result[0]
      this.horas = result[1]
      this.horas=this.horas.filter(data=>data.idsuc==this.sucursal);
      this.hideB()
    } catch (e) {
      this.hideB()
      this.notificacionService.showError()
    }


  }

  stopEdit() {
    this.data.idd = Number(this.dia) 
    this.data.idh = Number(this.hora)
    this.detalleGruposService.add(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  finalizar(){
    
  }
}
