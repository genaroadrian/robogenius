import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sadd',
  templateUrl: './sadd.component.html',
  styleUrls: ['./sadd.component.css']
})
export class SaddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SaddComponent>,@Inject(MAT_DIALOG_DATA) public data: Sucursal,
    public sucursalService: SucursalService, public toastr: ToastrManager) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  confirmAdd(data): void
  {
    console.log(this.data);
    this.sucursalService.add(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      this.sucursalService.addIssue(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }

}
