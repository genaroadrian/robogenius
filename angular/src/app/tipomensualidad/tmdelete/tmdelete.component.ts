import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TipomensualidadService } from 'src/app/services/tipomensualidad.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tmdelete',
  templateUrl: './tmdelete.component.html',
  styleUrls: ['./tmdelete.component.css']
})
export class TmdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TmdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipomensualidadService: TipomensualidadService,
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
    
    this.tipomensualidadService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.tipomensualidadService.deleteIssue(this.data.id);
      this.showSuccessEdit();
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }

}
