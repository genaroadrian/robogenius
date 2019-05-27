import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public escuelasService: EscuelasService,
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
    
    this.escuelasService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.escuelasService.deleteIssue(this.data.id);
      this.showSuccessEdit();
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }
}
