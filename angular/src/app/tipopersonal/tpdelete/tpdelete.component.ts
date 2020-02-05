import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tpdelete',
  templateUrl: './tpdelete.component.html',
  styleUrls: ['./tpdelete.component.css']
})
export class TpdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService, 
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
    this.tipopersonalService.delete(this.data.id).subscribe((data)=>{
      // console.log(data);
      this.tipopersonalService.deleteIssue(this.data.id);
      this.showSuccessEdit();
    },(error)=>{
      this.showErrorEdit();
      // console.log(error);
    });
  }
}
