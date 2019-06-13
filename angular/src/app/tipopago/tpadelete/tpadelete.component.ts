import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TipopagoService } from 'src/app/services/tipopago.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-tpadelete',
  templateUrl: './tpadelete.component.html',
  styleUrls: ['./tpadelete.component.css']
})
export class TpadeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpadeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopagoService: TipopagoService,
    public toastr: ToastrManager) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro eliminado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  confirmDelete(): void {

    this.tipopagoService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.showSuccessEdit();
      this.tipopagoService.deleteIssue(this.data.id);
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }

}
