import { Component, OnInit, Inject } from '@angular/core';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-tpadd',
  templateUrl: './tpadd.component.html',
  styleUrls: ['./tpadd.component.css']
})
export class TpaddComponent implements OnInit {

  cheked: boolean = false
  chekedM: boolean = false

 
  constructor(public dialogRef: MatDialogRef<TpaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tipopersonal,
    public dataService: TipopersonalService) {
     }

  ngOnInit() {
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
    /* Confirma la alta del registro */
    confirmAdd(): void 
    {
      this.data.permisos = this.cheked
      this.data.maestro = this.chekedM
      this.data.idsuc=localStorage.getItem("sucursal")
      this.dataService.addIssue(this.data)
    }

    permisos(event: MatSlideToggleChange)
    {
      this.cheked = event.checked
      
      if(this.cheked === false)
      {
        this.chekedM = false
      }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

    clases(event: MatSlideToggleChange)
    {
      this.chekedM = event.checked
    }
}
