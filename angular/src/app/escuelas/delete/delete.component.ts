import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public escuelasService: EscuelasService) { }

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
