import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { GradoService } from 'src/app/services/grado.service';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-deleteg',
  templateUrl: './deleteg.component.html',
  styleUrls: ['./deleteg.component.css']
})
export class DeletegComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletegComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public gradosService: GradoService, public toastr: ToastrManager) { }

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


  confirmgrado(): void {
    this.gradosService.delete(this.data.id).subscribe((data)=>{
      // console.log(data);
      this.showSuccessEdit();
      this.gradosService.deleteg(this.data.id);
    },(error)=>{
      this.showErrorEdit();
      // console.log(error);
    });
  }

  }  


