import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edittipomem',
  templateUrl: './edittipomem.component.html',
  styleUrls: ['./edittipomem.component.css']
})
export class EdittipomemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EdittipomemComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public tmemService: TipomembresiaService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  /* Lanza los errores de las validaciones del formulario */
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'El campo es obligatorio' :
      this.formControl.hasError('email') ? 'Ingrese un corre valido' :
        '';
  }

  submit() {
    // emppty stuff
  }

  /* Cuando se da clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la actualizacion del registro */
  stopEdit(data): void {
    this.tmemService.putTmem(data);
  }

}
