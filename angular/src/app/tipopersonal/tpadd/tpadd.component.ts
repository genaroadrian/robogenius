import { Component, OnInit, Inject } from '@angular/core';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-tpadd',
  templateUrl: './tpadd.component.html',
  styleUrls: ['./tpadd.component.css']
})
export class TpaddComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<TpaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tipopersonal,
    public dataService: TipopersonalService) {

      console.log(data);
     }

  ngOnInit() {
    
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
