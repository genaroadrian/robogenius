import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-edit-mem',
  templateUrl: './edit-mem.component.html',
  styleUrls: ['./edit-mem.component.css']
})
export class EditMemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditMemComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public escuelasService: EscuelasService) { }

  ngOnInit() {
  }

}
