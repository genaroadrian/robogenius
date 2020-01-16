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
  nadelanto : any

  restantes:any;
  restantess:any;
  adelantos:any;
  adelantoss:any;
  total:any;

  rateControl:any


  constructor(public dialogRef: MatDialogRef<PerfilmemeditComponent>, @Inject(MAT_DIALOG_DATA) public data,
  public perfilService: PerfilService) { }

  ngOnInit() {
    this.rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

    this.restantes=this.data.restante
    this.adelantos=this.data.adelanto
    
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

  adelanto(){
    if(this.data.restante - this.nadelanto<0){
      this.data.restante=this.restantes
      this.nadelanto=""
    }

  }

}
