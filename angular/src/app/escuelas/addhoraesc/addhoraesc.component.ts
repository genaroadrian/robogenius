import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { PersonalService } from 'src/app/services/personal.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-addhoraesc',
  templateUrl: './addhoraesc.component.html',
  styleUrls: ['./addhoraesc.component.css']
})
export class AddhoraescComponent implements OnInit {
  /* Variable quese va enviar a la base de datos */
  grupo: any

  /* Valor de los atributos [value] de los select */
  dia: string
  hora: string
  persona: string

  /* Valores de los arreglos con los datos */
  dias: any
  horas: any
  personal: any
  allHorarios: any

  constructor(public dialogRef: MatDialogRef<AddhoraescComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public perfilService: PerfilService,
    public detalleGruposService: DetallegruposService,  public personalService: PersonalService,
    public notificacionService: NotificationsService) { }

  ngOnInit() {
    console.log(this.data);
    this.getAll()
  }

  async getAll()
  {
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
    } catch (e) {
      this.notificacionService.showError()
    }
  }


  // Metodo para cuando termine de guardar
  stopEdit(): void {
    console.log(this.data)
    // this.detalleGruposService.add(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
