import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TipopagoService } from 'src/app/services/tipopago.service';

@Component({
  selector: 'app-tpadelete',
  templateUrl: './tpadelete.component.html',
  styleUrls: ['./tpadelete.component.css']
})
export class TpadeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpadeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopagoService: TipopagoService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  confirmDelete(): void {

  }

}
