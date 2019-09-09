import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-subtemadelet',
  templateUrl: './subtemadelet.component.html',
  styleUrls: ['./subtemadelet.component.css']
})
export class SubtemadeletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SubtemadeletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  confirmDelete(): void {
  // Metodo vacio, solo confirma la eliminacion
  }

}
