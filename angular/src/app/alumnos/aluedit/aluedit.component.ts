import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-aluedit',
  templateUrl: './aluedit.component.html',
  styleUrls: ['./aluedit.component.css']
})
export class AlueditComponent implements OnInit {

  hide: boolean = false

  options: FormGroup;

  escuelas: any

  escuelaSelected: string

  constructor(public dialogRef: MatDialogRef<AlueditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public alumnosService: AlumnosService, 
    fb: FormBuilder, public perfilService: PerfilService,
    private escuelasService: EscuelasService) {
      
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'never',
      });
     }

  ngOnInit() {
    this.escuelaSelected = ''+this.data.idesc+''
    this.getEscuelas()
    
    console.log(this.escuelaSelected)
  }

  getEscuelas()
  {
    this.escuelasService.get().subscribe((data)=>{
      this.escuelas = data
      
    },(error)=>{

    })
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
  data.idesc = this.escuelaSelected
    this.perfilService.putAlumno(data);
  }

}
