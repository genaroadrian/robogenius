import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-sdelete',
  templateUrl: './sdelete.component.html',
  styleUrls: ['./sdelete.component.css']
})
export class SdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sucursalService: SucursalService,
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

    this.sucursalService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.showSuccessEdit();
      this.sucursalService.deleteIssue(this.data.id);
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }

}
