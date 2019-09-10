import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CodigosService } from 'src/app/services/codigos.service';



@Component({
  selector: 'app-coddelete',
  templateUrl: './coddelete.component.html',
  styleUrls: ['./coddelete.component.css']
})
export class CoddeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoddeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public codigosService: CodigosService,
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
    
    this.codigosService.delete(this.data.id).subscribe((data)=>{
      console.log(data);
      this.showSuccessEdit();
      this.codigosService.deletecod(this.data.id);
    },(error)=>{
      this.showErrorEdit();
      console.log(error);
    });
  }
}
