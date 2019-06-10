import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aluedit',
  templateUrl: './aluedit.component.html',
  styleUrls: ['./aluedit.component.css']
})
export class AlueditComponent implements OnInit {

  options: FormGroup;

  constructor(public dialogRef: MatDialogRef<AlueditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public alumnosService: AlumnosService, 
    public toastr: ToastrManager, fb: FormBuilder) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'never',
      });
     }

  ngOnInit() {
  }

  // Validaciones del formulario
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

}
