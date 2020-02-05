import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { PersonalService } from 'src/app/services/personal.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-edithoraesc',
  templateUrl: './edithoraesc.component.html',
  styleUrls: ['./edithoraesc.component.css']
})
export class EdithoraescComponent implements OnInit {

  dia: string
  hora: string 
  persona: string
  barra: string 
  dias: any
  horas: any
  personal: any
  allHorarios: any

  constructor(public dialogRef: MatDialogRef<EdithoraescComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public perfilService: PerfilService,
    public detalleGruposService: DetallegruposService,  public personalService: PersonalService,
    public notificacionService: NotificationsService) { }

  ngOnInit() {
    this.dia = ''+this.data.idd+''
    this.hora = ''+this.data.idh +''
    this.persona = ''+this.data.idp+''
    // console.log(this.dia);
    this.getAll()
  }

  showBarra()
  {
    this.barra = ''
  }

  hideBarra()
  {
    this.barra = 'none'
  }

  async getAll()
  {
    this.showBarra()
    try {
      const result = await Promise.all([
        this.personalService.getDias().toPromise(), 
        this.personalService.getHorario().toPromise(),
        this.personalService.getMaestros().toPromise()
      ])
      this.dias = result[0]
      this.horas = result[1]
      this.personal = result[2]
      this.personal = this.personal.filter(e => e.idsuc == localStorage.getItem('sucursal'))
      this.hideBarra()
    } catch (e) {
      this.notificacionService.showError()
      this.hideBarra()
    }
  }

  // Metodo para cuando termine de guardar
  stopEdit(): void {
    // // console.log(this.data)
    this.data.idd = Number(this.dia)
    this.data.idh = Number(this.hora)
    this.data.idp = Number(this.persona)
    // // console.log(this.data)
    this.detalleGruposService.add(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
