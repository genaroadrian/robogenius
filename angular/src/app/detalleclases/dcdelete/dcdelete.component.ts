import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dcdelete',
  templateUrl: './dcdelete.component.html',
  styleUrls: ['./dcdelete.component.css']
})
export class DcdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DcdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
