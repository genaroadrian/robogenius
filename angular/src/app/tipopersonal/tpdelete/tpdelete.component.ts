import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';

@Component({
  selector: 'app-tpdelete',
  templateUrl: './tpdelete.component.html',
  styleUrls: ['./tpdelete.component.css']
})
export class TpdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.tipopersonalService.deleteIssue(this.data.id);
  }

}
