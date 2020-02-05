import { Component, OnInit } from '@angular/core';
import { ModuloescuelasService } from 'src/app/services/moduloescuelas.service';

@Component({
  selector: 'app-moduloescuelas',
  templateUrl: './moduloescuelas.component.html',
  styleUrls: ['./moduloescuelas.component.css']
})
export class ModuloescuelasComponent implements OnInit {

  alumnos: any

  constructor(public moduloEscuelaSerive: ModuloescuelasService) { }

  ngOnInit() {
    this.moduloEscuelaSerive.getData(1).subscribe((data)=>{
      this.alumnos = data
      this.alumnos.fnacalu = 11
      // console.log(this.alumnos)
    },(error)=>{
      // console.log(error)
    })
  }

}
