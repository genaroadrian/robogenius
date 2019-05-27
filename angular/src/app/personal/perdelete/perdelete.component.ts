import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { PersonalService } from 'src/app/services/personal.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-perdelete',
  templateUrl: './perdelete.component.html',
  styleUrls: ['./perdelete.component.css']
})
export class PerdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PerdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public personalService: PersonalService,
    public toastr: ToastrManager) { }

    ngOnInit() {
    }

  onNoClick(): void {
  this.dialogRef.close();
  }

  // Notificación de success al eliminar
  showSuccesDelete() {
    this.toastr.successToastr('Registro eliminado','Exito!');
  }

  // Notificacion de error al eliminar
  showErrorDelete() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Confirmar la eliminacion de la tabla
  confirmDelete(): void {
  this.personalService.delete(this.data.id).subscribe((data)=>{
   this.showSuccesDelete();
  }, (error)=>{
    this.showErrorDelete();
  });
  }

}
