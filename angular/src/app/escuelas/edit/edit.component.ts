import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public escuelasService: EscuelasService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(data): void {
    this.escuelasService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      alert('Registro Actualizado');
      // console.log(this.data);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

}
