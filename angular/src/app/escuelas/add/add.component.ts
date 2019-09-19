import { Component, OnInit, Inject, Directive } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';



function emailDomainValidator(control: FormControl) { 
  let email = control.value; 
  if (email && email.indexOf("@") != -1) { 
    let [_, domain] = email.split("@"); 
    if (domain !== "codecraft.tv") { 
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null; 
}

@Directive({
  selector: '[emailDomain][ngModel]', 
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: emailDomainValidator,
      multi: true 
    }
  ]
})
class EmailDomainValidator {
}



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /* Opciones del formulario */
  options: FormGroup;
  myForm: FormGroup;
  email: any;



  constructor(public dialogRef: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public data: Escuelas, 
    public escuelasService: EscuelasService,fb: FormBuilder) {
      this.options = fb.group({
        hideRequired: false
      });
     }

  ngOnInit() {
  }
  createFormControls(){
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
  }

  /* Validaciones de los formularios */
  fControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  /* Mensajes de error de las validaciones */
  getErrorMessage() {
    return this.fControl.hasError('required') ? 'El campo es obligatorio' :
   
        '';
  }

  /* Cuando se da clic afuera del modal, lo cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Confirma la alta del registro */
  confirmAdd(): void 
  {
    this.escuelasService.addEscuela(this.data)
  }

}
