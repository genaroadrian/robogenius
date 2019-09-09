import { Component, OnInit, Inject } from '@angular/core';
import { areadelconocimiento } from 'src/app/interfaces/areadelconocimiento';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-areaadd',
  templateUrl: './areaadd.component.html',
  styleUrls: ['./areaadd.component.css']
})
export class AreaaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AreaaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: areadelconocimiento,
    public dataService: AreadelconocimientoService, public toastr: ToastrManager) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }





  confirmAdd(data): void 
  {    
    

    this.dataService.addIssue(this.data);
  }

}
