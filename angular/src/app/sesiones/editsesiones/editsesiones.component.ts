import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SesionesService } from 'src/app/services/sesiones.service';

@Component({
  selector: 'app-editsesiones',
  templateUrl: './editsesiones.component.html',
  styleUrls: ['./editsesiones.component.css']
})
export class EditsesionesComponent implements OnInit {

  datos: any

  constructor(public dialogRef: MatDialogRef<EditsesionesComponent>, @Inject(MAT_DIALOG_DATA) public data,
  public sesionesService: SesionesService) { }

  ngOnInit() {
    // console.log(this.data)
  }

  onNoClick(): void 
  {
    this.dialogRef.close()
  }

  stopEdit(data):void
 {
  this.sesionesService.putSesion(this.data)
 }
}
