import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-aludelet',
  templateUrl: './aludelet.component.html',
  styleUrls: ['./aludelet.component.css']
})
export class AludeletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AludeletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public AlumnosService: AlumnosService,
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
    this.AlumnosService.delete(this.data.id).subscribe((data)=>{
     this.showSuccesDelete();
    }, (error)=>{
      this.showErrorDelete();
    });
    }
}
