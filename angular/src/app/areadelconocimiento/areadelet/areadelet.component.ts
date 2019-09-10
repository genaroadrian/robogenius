import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-areadelet',
  templateUrl: './areadelet.component.html',
  styleUrls: ['./areadelet.component.css']
})
export class AreadeletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AreadeletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

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
