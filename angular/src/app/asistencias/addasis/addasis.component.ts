import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonalService } from 'src/app/services/personal.service';
import { PersonalperfilComponent } from 'src/app/personal/personalperfil/personalperfil.component';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-addasis',
  templateUrl: './addasis.component.html',
  styleUrls: ['./addasis.component.css']
})
export class AddasisComponent implements OnInit {


  dataSource: any

  constructor(public dialogRef: MatDialogRef<AddasisComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    public personalPerfilService: PersonalperfilService,
    public asistenciaService : AsistenciasService,
    public notificacionService: NotificationsService) { }

    displayedColumns: string[] = ['no', 'apealu', 'nomalu', 'asis'];

  ngOnInit() {
    // this.personalPerfilService.getListaalumnos(this.data)
    this.getAlumnos()
  }

  getAlumnos()
  {
    this.personalPerfilService.getListaalumnos(this.data).subscribe((data)=>{
      this.dataSource = data
    }, (error)=>{

    })
  }

  prueba(element,n,i)
  {
    // this.dataSource[i].push({asis:n})
    this.dataSource[i].asis = n
  }

  pasAsis()
  {
    console.log(this.dataSource)
    this.asistenciaService.asistencia(this.dataSource).subscribe((data)=>{
      console.log(data)
    },(eror)=>{
      this.notificacionService.showError()
    })
  }
    
  }
