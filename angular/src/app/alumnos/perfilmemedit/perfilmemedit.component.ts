import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfilmemedit',
  templateUrl: './perfilmemedit.component.html',
  styleUrls: ['./perfilmemedit.component.css']
})
export class PerfilmemeditComponent implements OnInit {
  nadelanto : number = 0;

  constructor(public dialogRef: MatDialogRef<PerfilmemeditComponent>, @Inject(MAT_DIALOG_DATA) public data,
  public perfilService: PerfilService) { }

  ngOnInit() {
    console.log(this.data)
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  /* Lanza los errores de las validaciones del formulario */
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
        '';
  }

  submit() {
    // emppty stuff
  }

  /* Cuando se da clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(data)
  {
    this.data.adelanto += this.nadelanto
    this.data.restante -= this.nadelanto
    this.perfilService.putMem(data)
  }

}
