import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-perfilhoradelete',
  templateUrl: './perfilhoradelete.component.html',
  styleUrls: ['./perfilhoradelete.component.css']
})
export class PerfilhoradeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PerfilhoradeleteComponent>,
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
