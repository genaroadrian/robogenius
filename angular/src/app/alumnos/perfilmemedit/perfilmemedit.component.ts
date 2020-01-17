import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormControl, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { contabilidad } from 'src/app/interfaces/contabilidad';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  pendiente:any;
  sucursal:any

  editar:contabilidad = {
  
    Concepto: null,
    fecha: null,
    tipo: 1,
    monto: null,
    idcate:null,
    iduser:null,
    nombre: null,
    activo: 1,
    status:null,
    adelanto:null,
    restante:null,
    suma:null,
    idscu:null,
    idsuc:null


  };


  constructor(public dialogRef: MatDialogRef<PerfilmemeditComponent>, @Inject(MAT_DIALOG_DATA) public data,
  public perfilService: PerfilService,  public categoriaservice: CategoriaService,public toastr: ToastrManager) { }

  ngOnInit() {
    this.rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

    this.restantes=this.data.restante
    this.adelantos=this.data.adelanto
    this.sucursal=localStorage.getItem('sucursal')

    this.categoriaservice.pendiente()
    .subscribe(data=>{
      this.pendiente=data;
      this.pendiente=this.pendiente.filter(x=>x.concepto =="Membrecia del alumno: "+this.data.nombrealu+" "+this.data.apealu)
      this.pendiente=this.pendiente[0];
      this.editar.Concepto=this.pendiente.concepto;
      this.editar.fecha=this.pendiente.fecha;
      this.editar.adelanto=this.pendiente.adelanto;
      this.editar.monto=this.pendiente.monto;
      this.editar.restante=this.pendiente.restante;
      this.editar.idCon=this.pendiente.idCont;
      // this.editar.idcate=idcate;
      this.editar.iduser=this.pendiente.iduser;
      this.editar.nombre=this.pendiente.nombre;
      this.editar.suma=this.pendiente.suma;
      console.log(this.editar)
    })
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


    this.editar.tipo=1;
    this.editar.adelanto=this.editar.adelanto+this.nadelanto;
    this.editar.restante=0;
    this.categoriaservice.put(this.editar)
    .subscribe((data) =>{
     this.showSuccessEdit();
     // this.personalService.tput(this.data);
   },(error)=>{
     this.showErrorEdit();
   });
    this.editar.idscu=this.sucursal
    this.editar.idsuc=this.sucursal
     this.editar.restante=this.data.restante
     this.editar.suma=this.nadelanto;
   
     this.categoriaservice.saves(this.editar)
     .subscribe((data) =>{
       this.showSuccessEdit();
       // this.personalService.tput(this.data);
     },(error)=>{
       this.showErrorEdit();
     }); 



  }

  adelanto(){
    if(this.data.restante - this.nadelanto<0){
      this.data.restante=this.restantes
      this.nadelanto=""
    }
    

  }

  
 showSuccessEdit() {
  this.toastr.successToastr('Registro actualizado','Exito!');
}

showSuccess() {
  this.toastr.successToastr('Registro insertado','Exito!');
}

// Notificacion de error al editar
showErrorEdit() {
  this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
}

}
