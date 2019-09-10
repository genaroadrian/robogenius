import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { NivelService } from 'src/app/services/nivel.service';




@Component({
  selector: 'app-updatenivel',
  templateUrl: './updatenivel.component.html',
  styleUrls: ['./updatenivel.component.css']
})
export class UpdatenivelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NivelService>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public nivelService: NivelService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la actualizacion del registro */
  modi(data): void {
    this.nivelService.putnivel(data);
  }

   
  


}
