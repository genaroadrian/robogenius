import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';

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
    public detalleGruposService: DetallegruposService) { }

  ngOnInit() {
    console.log(this.data);
    this.getHorarios()
  }

  async getHorarios() {
    try {
      this.allHorarios = await this.perfilService.getAllHorarios().toPromise()
      this.allHorarios = this.allHorarios.filter(element => element.idsuc == localStorage.getItem('sucursal'))
      var hash = {};
      this.dias = this.allHorarios.filter(function (hora) {
        var exists = !hash[hora.dia] || false;
        hash[hora.dia] = true;
        return exists;
      });
    } catch (e) {
      console.log(e)
    }
  }

  filterHora(dia: string) {
    this.horas = []
    this.personal = []
    this.horas = this.allHorarios.filter(hora => hora.dia == dia)
  }

  filterPersonal(hora: string) {
    this.personal = []
    let horac = hora
    this.personal = this.horas.filter(hora => hora.hora == horac)
  }


  // Metodo para cuando termine de guardar
  stopEdit(): void {
    console.log(this.data)
    this.detalleGruposService.add(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
