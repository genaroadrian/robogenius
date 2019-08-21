import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-aluedit',
  templateUrl: './aluedit.component.html',
  styleUrls: ['./aluedit.component.css']
})
export class AlueditComponent implements OnInit {


  options: FormGroup;

  constructor(public dialogRef: MatDialogRef<AlueditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public alumnosService: AlumnosService, 
    fb: FormBuilder, public perfilService: PerfilService) {
      
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'never',
      });
     }

  ngOnInit() {
    console.log(this.data)
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

  onNoClick(): void {
    this.dialogRef.close();
  }
stopEdit(data): void {
    this.perfilService.putAlumno(data);
  }

}
