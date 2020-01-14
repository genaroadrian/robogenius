import { Component, OnInit } from '@angular/core';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-perfil-escuelas',
  templateUrl: './perfil-escuelas.component.html',
  styleUrls: ['./perfil-escuelas.component.css']
})
export class PerfilEscuelasComponent implements OnInit {
  data: any
  info: any
  alumnos = []
  membresias = []
  barra: string = ''
  status: string = ''
  displayedColumns: string[] = ['dia', 'hora', 'personal']
  horario = []

  constructor(public escuelasService: EscuelasService) { }

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
}