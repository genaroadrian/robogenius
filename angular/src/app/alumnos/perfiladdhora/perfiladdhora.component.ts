import { Component, OnInit, Inject } from '@angular/core';
import { Dias } from 'src/app/interfaces/dias';
import { GEdit } from 'src/app/interfaces/gedit';
import { Personal } from 'src/app/interfaces/personal';
import { Horas } from 'src/app/interfaces/horas';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfiladdhora',
  templateUrl: './perfiladdhora.component.html',
  styleUrls: ['./perfiladdhora.component.css']
})
export class PerfiladdhoraComponent implements OnInit {

  /* Variable quese va enviar a la base de datos */
  grupo: any

  /* Valor de los atributos [value] de los select */
  dia:string
  hora: string
  persona: string

  /* Valores de los arreglos con los datos */
  dias: any
  horas: any
  personal: any
  allHorarios: any

  constructor(public dialogRef: MatDialogRef<PerfiladdhoraComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, public perfilService: PerfilService) { }

  ngOnInit() {
    // // console.log(this.data);
    this.getHorarios()
    // this.filtHora()
  }


  getHorarios()
  {
    this.perfilService.getAllHorarios().subscribe((data)=>{
      this.allHorarios = data

      /* Filtra los dias para que no se repitan */
      var hash = {};
      this.dias = this.allHorarios.filter(function(hora) {
        var exists = !hash[hora.dia] || false;
        hash[hora.dia] = true;
        return exists;
      });
    },(error)=>{

    })
  }

  filterHora(dia: string)
  {
    this.horas = []
    this.personal = []
    this.horas = this.allHorarios.filter(hora => hora.dia == dia)
  }

  filterPersonal(hora: string)
  {
    this.personal = []
    let horac = hora
    this.personal = this.horas.filter(hora => hora.hora == horac)
  }

  
  // Metodo para cuando termine de guardar
  stopEdit(): void {
    this.grupo = this.personal.filter(grupo => grupo.iddgru == this.persona)
    this.grupo[0].idalu = Number(this.data.idalu)
    this.perfilService.saveNuevoHorario(this.grupo[0])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
