import { Component, ElementRef, OnInit, ViewChild, ɵConsole  } from '@angular/core';
import * as jsPDF from 'jspdf';

import { CategoriaService } from 'src/app/services/categoria.service';
import {HttpClient} from '@angular/common/http';
import { categorias } from 'src/app/interfaces/categorias';
import { contabilidad } from 'src/app/interfaces/contabilidad';
import { total } from 'src/app/interfaces/total';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { ToastrManager } from 'ng6-toastr-notifications';




import * as $ from 'jquery'; 

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit {
  public  emai = localStorage.getItem("email");


  Categorias  ='';
  sucursal:any;




selected: any;
selecteds: any;
adelanto:number;
nuevoadelanto:number;
restante:number;
restantess:any;


  cat:categorias = {
    Categoria :null,
    activo: 1,
    idsuc: null,
    suma:null,
    monto:null

  };

  cont:contabilidad = {
  
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

  egres:contabilidad = {
  
    Concepto: null,
    fecha: null,
    tipo: 2,
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

  editar:contabilidad = {
  
    Concepto: null,
    fecha: null,
    tipo: 2,
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
  
  log:categorias[];
  pendiente:contabilidad[];
  pendientes:contabilidad[];
  activo:any;
  ingresos:contabilidad[];
  egresos:contabilidad[];
  sumaingre:total[];
  sumaegre:total[];
  resultado:any
  // logs:Login[];
  logs: any;
total:any

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public categoriaservice: CategoriaService, private router :Router ,private service:LoginService,public toastr: ToastrManager) { }

  

  ngOnInit() {
    this.sucursal=localStorage.getItem('sucursal')
    this.editar.idscu=this.sucursal;
    this.egres.idscu=this.sucursal;
    this.cont.idscu=this.sucursal;


    this.restantess=this.cont.monto-this.adelanto;  
    this.cont.adelanto=this.adelanto;
    this.cont.restante=this.restantess;


    this.categoria;


    this.service.getPersonas()
    .subscribe(data=>{
      this.logs=data;
      this.selected = this.logs.filter(x => x.email == this.emai)
      this.selecteds = this.logs.filter(x => x.email == this.emai)
      
      this.cont.iduser = this.selected[0].id
      this.egres.iduser = this.selected[0].id
      this.cont.nombre= this.selecteds[0].subname
      this.egres.nombre= this.selecteds[0].subname
      

      // this.datos=data;
      // this.imagen=this.datos.avatar;
      // x:this.datos;
    })
  

    this.categoriaservice.getPersonas()
    .subscribe(data=>{
      data=data.filter(x=>x.idsuc==this.sucursal)
      this.log=data;
    })

  this.categoriaservice.getingresos()
  .subscribe(data=>{
    data=data.filter(x=>x.idscu==this.sucursal)
    data=data.filter(x=>x.idsuc==this.sucursal)
    // console.log(data)
    this.ingresos=data;

  })

  this.categoriaservice.getegresos()
  .subscribe(data=>{
    data=data.filter(x=>x.idscu==this.sucursal)
    data=data.filter(x=>x.idsuc==this.sucursal)
    this.egresos=data;

  })

  this.categoriaservice.sumaingreeso()
  .subscribe(data=>{
    data=data.filter(x=>x.idscu==this.sucursal)
    this.sumaingre=data;
    var resultado=0
    this.sumaingre.forEach(function(obj){
      resultado+=obj.suma
    })
    this.resultado=resultado;
    // console.log(resultado)


  })

  this.categoriaservice.sumaegreso()
  .subscribe(data=>{
    
    this.sumaegre=data;
    this.sumaegre=this.sumaegre.filter(x=>x.idscu==this.sucursal)
    // foreach de suma
    var total = 0;
    this.sumaegre.forEach(function(obj){
      console.log(obj)
      total+=obj.monto;
    })
    this.total=total;

  })

  this.categoriaservice.pendiente()
  .subscribe(data=>{
    data=data.filter(x=>x.idscu==this.sucursal)
    this.pendiente=data;
  })


 


}


categoria()
{
  this.cat.idsuc=this.sucursal
  this.categoriaservice.save(this.cat)
  .subscribe((data) =>{
    this.showSuccess();
    this.categoriaservice.getPersonas()
    .subscribe(data=>{
      data=data.filter(x=>x.idsuc==this.sucursal)
      this.log=data;
    })
    // this.personalService.tput(this.data);
  },(error)=>{
    this.showErrorEdit();
  }); 
  this.cat.Categoria=null;
}


contabilidad()
{
  if(this.adelanto==null){
    this.cont.restante=0;
    this.cont.adelanto=this.cont.monto;
    this.cont.suma=this.cont.monto;
  }else{
  this.restantess=this.cont.monto-this.adelanto;  
  this.cont.restante=this.restantess;
  this.cont.adelanto=this.adelanto;
  this.cont.suma=this.cont.adelanto;

  }
  
  this.categoriaservice.saves(this.cont)
  .subscribe((data) =>{
    this.showSuccess();
    // this.personalService.tput(this.data);
  },(error)=>{
    this.showErrorEdit();
  });
  let doc = new jsPDF();
  doc.text('Robogenius',15,14);
  doc.text(150,14, 'Fecha: ' + this.cont.fecha);

  if (this.cont.restante==0){
    doc.text(15,50, 'Responsable: ' + this.cont.nombre);
    doc.text(15,30, 'Concepto : ' + this.cont.Concepto);
    doc.text(15,40, 'Total: $' + this.cont.monto);
  }else{
  doc.text(15,50, 'Responsable: ' + this.cont.nombre);
  doc.text(15,30, 'Concepto : ' + this.cont.Concepto);
  doc.text(15,40, 'Total: $' + this.cont.monto);
  doc.text(15,60, 'Adelanto: $' + this.cont.adelanto);
  doc.text(15,70, 'Restante: $' + this.cont.restante);
  }
  doc.save(' '+this.cont.fecha +'.pdf');

  this.cont.Concepto=null;  
  this.cont.fecha=null;
  this.cont.idcate=null;
  this.cont.monto=null;
  this.cont.adelanto=null;
  this.cont.restante=null;
  this.adelanto=null;

//saco el valor accediendo a un input de tipo text y name = nombre2 y lo asigno a uno con name = nombre3
// $("#nombre3").val($("#nombre2").val());

}


egreso()
{
  this.categoriaservice.saves(this.egres)
  .subscribe((data) =>{
    this.showSuccess();
    // this.personalService.tput(this.data);
  },(error)=>{
    this.showErrorEdit();
  });
  this.egres.Concepto=null;  
  this.egres.fecha=null;
  this.egres.idcate=null;
  this.egres.monto=null;
  this.egres.adelanto=null;
  this.egres.restante=null;
//saco el valor accediendo a un input de tipo text y name = nombre2 y lo asigno a uno con name = nombre3
// $("#nombre3").val($("#nombre2").val());

}


x(){
  $("#aca").css({'color':'white','background':'#F16C69'})

}

y(){
  $("#aca").css({'color':'white','background':'#35A989'})

}
 

 update(i: number, concepto: string, fecha: string,
  adelanto: number, monto: number, restante: number,idcate:number,iduser:number,nombre:string,suma:number){
  
  this.editar.Concepto=concepto;
  this.editar.fecha=fecha;
  this.editar.adelanto=adelanto;
  this.editar.monto=monto;
  this.editar.restante=restante;
  this.editar.idCon=i;
  this.editar.idcate=idcate;
  this.editar.iduser=iduser;
  this.editar.nombre=nombre;
  this.editar.suma=suma;

 }

 actualizar(){

 this.editar.tipo=1;
 this.editar.adelanto=this.editar.adelanto+this.nuevoadelanto;
 this.editar.restante=0;
 this.categoriaservice.put(this.editar)
 .subscribe((data) =>{
  this.showSuccessEdit();
  // this.personalService.tput(this.data);
},(error)=>{
  this.showErrorEdit();
});

  this.editar.restante=this.editar.monto-this.editar.adelanto;
  this.editar.suma=this.nuevoadelanto;

  this.categoriaservice.saves(this.editar)
  .subscribe((data) =>{
    this.showSuccessEdit();
    // this.personalService.tput(this.data);
  },(error)=>{
    this.showErrorEdit();
  }); 
   
  let doc = new jsPDF();
  doc.text('Robogenius',15,14);
  doc.text(150,14, 'Fecha: ' + this.editar.fecha);
  doc.text(15,50, 'Responsable: ' + this.editar.nombre);
  doc.text(15,30, 'Concepto : ' + this.editar.Concepto);
  doc.text(15,40, 'Total: $' + this.editar.monto);
  doc.text(15,60, 'Adelanto: $' + this.editar.adelanto);
  doc.text(15,70, 'Restante: $' + this.editar.restante);
  doc.save(' '+this.editar.fecha +'.pdf');
  
 
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
