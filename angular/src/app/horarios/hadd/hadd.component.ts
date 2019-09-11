import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { HorariosService } from 'src/app/services/horarios.service';
import { Horario } from 'src/app/interfaces/horario';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-hadd',
  templateUrl: './hadd.component.html',
  styleUrls: ['./hadd.component.css']
})



export class HaddComponent implements OnInit {
  selected:any;
  selecteds:any;

  constructor(public dialogRef: MatDialogRef<HaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Horario, 
    public horariosService: HorariosService, public toastr: ToastrManager) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




    /* Confirma la alta del registro */
    confirmAdd(data): void 
    {
     this.data.hora=this.selected+" - "+this.selecteds;

      this.horariosService.addIssue(this.data)
    }
  

}
