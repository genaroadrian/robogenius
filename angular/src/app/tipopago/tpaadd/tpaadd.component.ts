import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipopagoService } from 'src/app/services/tipopago.service';
import { Tipopago } from 'src/app/interfaces/tipopago';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tpaadd',
  templateUrl: './tpaadd.component.html',
  styleUrls: ['./tpaadd.component.css']
})
export class TpaaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpaaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Tipopago,
    public tipopagoService: TipopagoService, public toastr: ToastrManager) { }

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
    console.log(this.data);
    this.tipopagoService.add(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      this.tipopagoService.addIssue(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }


}
