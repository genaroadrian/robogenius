import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-temadelet',
  templateUrl: './temadelet.component.html',
  styleUrls: ['./temadelet.component.css']
})
export class TemadeletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TemadeletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }

    /* Cuando se da clic afuera del modal, se cierra */
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  
    confirmDelete(): void {
    // Metodo vacio, solo confirma la eliminacion
    }

}