import { Component, OnInit, Inject, Directive } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';
import { HorariosService } from 'src/app/services/horarios.service';
import { Detallegrupos } from 'src/app/interfaces/detallegrupos';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';
import { PersonalService } from 'src/app/services/personal.service';



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
  hide = true;

  /* Opciones del formulario */
  options: FormGroup;
  myForm: FormGroup;
  email: any;

  n: number = 1

  /* Visualizacion de los horarios */
  horario = 'none'
  form = ''

  barra = 'none'

  /* Horarios */
  _allHoras: any

  /* Visiblidad de los botones */
  btn = ''
  fn = 'none'

  idesc: number

  tipoMembresia: Tipomembresia = 
  {
    nombre: null,
    costo: null,
    clases: null,
    idesc: null,
    idsuc:null
  }

  detalleGrupo: Detallegrupos =
  {
    idd: null,
    idh: null,
    idp: null,
    idesc: null
  }
  
  data: Escuelas = 
  {
    nombre: null,
    representante: null,
    direccion: null,
    telefono: null,
    correouno: null,
    idsuc: null,
    psw: null,
    activo: null
  }

  idescuela: number

  sucursal: number

  personal: any

  constructor(
    public escuelasService: EscuelasService, fb: FormBuilder, public horarioService: HorariosService,
    public tipomembresiaService: TipomembresiaService, public detallegruposService: DetallegruposService, public personalService: PersonalService) {
    this.options = fb.group({
      hideRequired: false
    });

    this.sucursal= Number(localStorage.getItem('sucursal'))
  }

  ngOnInit() {
    this.getHorarios()
    this.getPersonal()
  }

  getPersonal()
  {
    this.personalService.getMaestros().subscribe((data)=>{
      this.personal = data
      this.personal=this.personal.filter(data=>data.idsuc==this.sucursal);
    },(error)=>{
      console.log(error)
    })
  }


  createFormControls() {
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


  getHorarios()
  {
    this.horarioService.getHora().subscribe((data)=>{
    this._allHoras = data  
    this._allHoras=this._allHoras.filter(data=>data.idsuc==this.sucursal);
    },(error)=>{

    })
  }

  next()
  { 
    this.showBarra()
    this.data.idsuc = localStorage.getItem("sucursal")

    this.escuelasService.add(this.data).subscribe((data)=>{

      let escuelasAdd: any = data
      this.idescuela = escuelasAdd.idesc
      this.tipoMembresia.idesc = escuelasAdd.idesc
      this.detalleGrupo.idesc = escuelasAdd.idesc

      this.tipomembresiaService.add(this.tipoMembresia).subscribe((data)=>{
        this.hideBarra()
        this.form = 'none'
        this.horario = ''
      },(error)=>{
        this.hideBarra()
      })

    },(error)=>{
      this.hideBarra()
      console.log(error)
    })
    
    
  }

  /* Confirma la alta del registro */
  confirmAdd(): void {
    console.log(this.detalleGrupo)
    this.showBarra()
    this.detallegruposService.save(this.detalleGrupo).subscribe((data)=>{
      this.n ++
      if(this.n > Number(this.tipoMembresia.clases))
      {
        this.btn = 'none'
        this.horario = 'none'
        this.fn = ''

      }
      this.detalleGrupo.idd = null
      this.detalleGrupo.idh = null
      this.detalleGrupo.idp = null
      this.hideBarra()
    },(error)=>{
      this.hideBarra()
      console.log(error)
    })

  }

  showBarra()
  {
    this.barra = ''
  }

  hideBarra()
  {
    this.barra = 'none'
  }

}
