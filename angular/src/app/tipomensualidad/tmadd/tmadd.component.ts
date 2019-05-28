import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipomensualidadService } from 'src/app/services/tipomensualidad.service';
import { Tipomensualidad } from 'src/app/interfaces/tipomensualidad';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tmadd',
  templateUrl: './tmadd.component.html',
  styleUrls: ['./tmadd.component.css']
})
export class TmaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TmaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Tipomensualidad, 
    public tipomensualidadService: TipomensualidadService, public toastr: ToastrManager) { }

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
    
    this.tipomensualidadService.add(this.data).subscribe((data) =>{
      this.showSuccessEdit();
    },(error)=>{
      this.showErrorEdit();
    });

    this.tipomensualidadService.addIssue(this.data);
  }

}
