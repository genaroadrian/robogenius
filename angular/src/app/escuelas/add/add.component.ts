import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddComponent>,@Inject(MAT_DIALOG_DATA) public data: Escuelas, 
    public escuelasService: EscuelasService, public toastr: ToastrManager) { }

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
    this.escuelasService.add(this.data).subscribe((data) =>{
      this.showSuccessEdit();
      this.escuelasService.addIssue(this.data);
    },(error)=>{
      this.showErrorEdit();
    });
  }

}
