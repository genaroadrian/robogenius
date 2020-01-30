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

  barra = 'none'
  selected = 0
  vBtn: string = ''
  history: any
  historyF: any
  status: any[]=[]
  viewList: string = 'none'
  
  


  constructor(public dialogRef: MatDialogRef<AddasisComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public personalPerfilService: PersonalperfilService,
    public asistenciaService: AsistenciasService,
    public notificacionService: NotificationsService) { }

  displayedColumns: string[] = ['no', 'nombre', 'asis'];

  ngOnInit() {
    // this.personalPerfilService.getListaalumnos(this.data)
    this.getAlumnos()
    // console.log(this.data)
    this.getHistory()
    if(this.data.ds == true)
    {
      this.selected = 1
    }
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAlumnos() {
    this.personalPerfilService.getListaalumnos(this.data).subscribe((data) => {
      this.dataSource = data[0]
      this.status = data[1]
      console.log(data)
      if(this.status.length > 0)
      {
        this.viewList = ''
        this.vBtn = 'none'
      }
      this.dataSource.forEach(element => {
        element.iddgru = this.data.iddgru
        element.dia = this.data.dia
        element.hora = this.data.hora
        element.idesc = this.data.idesc
        element.idper = this.data.idper
        element.asis = 1;
      });
    }, (error) => {
      this.notificacionService.showError()
    })
  }

  prueba(element, n, i) {
    // this.dataSource[i].push({asis:n})
    this.dataSource[i].asis = n

  }

  pasAsis() {
    // console.log(this.dataSource)
    this.showBarra()
    this.asistenciaService.asistencia(this.dataSource).subscribe((data) => {
      this.notificacionService.showSuccessAdd()
      // console.log(data)
      this.hideBarra()
    }, (error) => {
      this.notificacionService.showError()
      this.hideBarra()
      console.log(error)
    })
  }

  applyFilter(filterValue: string) {
    let filtro = filterValue.trim().toLowerCase();
    this.historyF.filter(element => element.fechac == filtro)
  }

  showBarra() {
    this.barra = ""
  }

  hideBarra() {
    this.barra = "none"
  }

  getHistory() {
    this.showBarra()
    this.asistenciaService.historial(this.data).subscribe((data) => {
      this.hideBarra()
      console.log(data)
      this.history = data
      // history = history.filter()
      var hash = {};
      this.historyF = this.history.filter(function (h) {
        var exists = !hash[h.fecha] || false;
        hash[h.fecha] = true;
        return exists
      });
      /* Transforma la fecha en formato YYYY-mm-dd a texto en español */
      this.historyF.forEach(element => {
        element.fechac = new Date(element.fecha + 'T00:00:00')
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        element.fechac = element.fechac.toLocaleDateString("es-ES", options)

      });
      // console.log(this.historyF)


    }, (error) => {
      this.notificacionService.showError()
      this.hideBarra()
      // console.log(error)
    })
  }

}
