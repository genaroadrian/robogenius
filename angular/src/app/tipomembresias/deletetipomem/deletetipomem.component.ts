import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deletetipomem',
  templateUrl: './deletetipomem.component.html',
  styleUrls: ['./deletetipomem.component.css']
})
export class DeletetipomemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletetipomemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
