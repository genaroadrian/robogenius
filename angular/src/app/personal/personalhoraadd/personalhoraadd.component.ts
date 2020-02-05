import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { PersonalService } from 'src/app/services/personal.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-personalhoraadd',
  templateUrl: './personalhoraadd.component.html',
  styleUrls: ['./personalhoraadd.component.css']
})
export class PersonalhoraaddComponent implements OnInit {

  horas: any
  dias: any
  escuelas: any
  sucursal :any

  constructor(public dialogRef: MatDialogRef<PersonalhoraaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalPerfilService: PersonalperfilService,
    public personalService: PersonalService, public detalleGruposService: DetallegruposService, 
    public notificacionService: NotificationsService) { }

  ngOnInit() {
    this.getAll()
    this.sucursal=localStorage.getItem('sucursal')

  }

  async getAll() {
    try {
      this.dias = await this.personalService.getDias().toPromise()
      this.horas = await this.personalService.getHorario().toPromise()
      this.horas=this.horas.filter(data=>data.idsuc==this.sucursal);
    } catch (e) {
      this.notificacionService.showError()
    }
    
  }

  stopEdit()
  {
    // // console.log(this.data)
    this.detalleGruposService.add(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
