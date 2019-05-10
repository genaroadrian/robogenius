import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';

@Component({
  selector: 'app-tpedit',
  templateUrl: './tpedit.component.html',
  styleUrls: ['./tpedit.component.css']
})
export class TpeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TpeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tipopersonalService: TipopersonalService) { }

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
    this.tipopersonalService.put(this.data).subscribe((data) =>{
      // console.log(this.data);
      alert('Registro Actualizado');
      // console.log(this.data);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

}
