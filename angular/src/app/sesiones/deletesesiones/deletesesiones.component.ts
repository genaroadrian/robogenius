import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SesionesService } from 'src/app/services/sesiones.service';

@Component({
  selector: 'app-deletesesiones',
  templateUrl: './deletesesiones.component.html',
  styleUrls: ['./deletesesiones.component.css']
})
export class DeletesesionesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletesesionesComponent>, @Inject(MAT_DIALOG_DATA) public data,
  public sesionesService: SesionesService) { }

  ngOnInit() {

  }

  onNoClick(): void 
  {
    this.dialogRef.close()
  }

}
