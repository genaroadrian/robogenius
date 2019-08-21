import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-perdelete',
  templateUrl: './perdelete.component.html',
  styleUrls: ['./perdelete.component.css']
})
export class PerdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PerdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalService: PersonalService) { }

    ngOnInit() {
    }

  onNoClick(): void {
  this.dialogRef.close();
  }


  // Confirmar la eliminacion de la tabla
  confirmDelete(): void {
  
  }

}
