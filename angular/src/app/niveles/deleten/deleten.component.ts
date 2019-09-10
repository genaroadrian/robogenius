import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NivelService } from 'src/app/services/nivel.service';

@Component({
  selector: 'app-deleten',
  templateUrl: './deleten.component.html',
  styleUrls: ['./deleten.component.css']
})
export class DeletenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public nivelService: NivelService, public toastr: ToastrManager) { }

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


  confirmnivel(): void {
    this.nivelService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.showSuccessEdit();
      this.nivelService.deleten(this.data.id);
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }

}
