import { Component, OnInit, Inject } from '@angular/core';
import { HerramientasService } from 'src/app/services/herramientas.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-deleteh',
  templateUrl: './deleteh.component.html',
  styleUrls: ['./deleteh.component.css']
})
export class DeletehComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletehComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public herramientasService: HerramientasService, public toastr: ToastrManager) { }

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
  
  
    deletep(): void {
      this.herramientasService.deletee(this.data.id).subscribe((data)=>{
        console.log(data);
        this.showSuccessEdit();
        this.herramientasService.deleten(this.data.id);
      },(error)=>{
        this.showErrorEdit();
        console.log(error);
      });
    }

}
