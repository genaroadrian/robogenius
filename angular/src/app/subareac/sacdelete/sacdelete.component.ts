import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubareacService } from 'src/app/services/subareac.service';

@Component({
  selector: 'app-sacdelete',
  templateUrl: './sacdelete.component.html',
  styleUrls: ['./sacdelete.component.css']
})
export class SacdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SacdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sacService: SubareacService) { }

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
