import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-sdelete',
  templateUrl: './sdelete.component.html',
  styleUrls: ['./sdelete.component.css']
})
export class SdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sucursalService: SucursalService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    

  }

}
