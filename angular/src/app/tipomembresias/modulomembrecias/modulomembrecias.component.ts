import { Component, OnInit } from '@angular/core';
import { PmembresiaService } from 'src/app/services/pmembresia.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PerfilmemeditComponent } from '../../alumnos/perfilmemedit/perfilmemedit.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as jsPDF from 'jspdf';




@Component({
  selector: 'app-modulomembrecias',
  templateUrl: './modulomembrecias.component.html',
  styleUrls: ['./modulomembrecias.component.css']
})
export class ModulomembreciasComponent implements OnInit {

  datos:any;
  datosEditMem: any
  membresia: any;
  searchText;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options=[];
  nuevofiltro:any
  historial:any;

  

  sucursal=localStorage.getItem('sucursal')
  search=localStorage.getItem('busqueda')

  filtros:any
  fil:any
  model: any
  pagado:any

  nadelanto:any

  constructor(public pmem:PmembresiaService,
    public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager) { }

  ngOnInit() {
    if(this.search==null){
      this.search="";
    }
   if(this.search.length>0){
    setTimeout (() => {
      this.myControl.setValue(this.search.toLowerCase().slice(22, 28))
        this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.myControl.value))
    );
    this.model.trigger('click');
   },2000);

   setTimeout (() => {
     let element :HTMLElement=document.getElementById('busq')as HTMLElement;
     element.click();
    // console.log("saddsa")
 },2001);
   localStorage.removeItem('busqueda');
   }
   

 
    this.pmem.getHistorial().subscribe(dat=>{
      this.historial=dat
      this.historial=this.historial.filter(x=>x.idscu==this.sucursal)
    })
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.pmem.getHorarios().subscribe(data => {
      this.datos=data
      this.filtros=this.datos.filter(x=>x.idsuc==this.sucursal)
      this.fil=this.filtros
      this.pagado=this.fil
      console.log(this.fil)
      this.nuevofiltro=this.filtros
      let valor=[]

      this.nuevofiltro.forEach(function(value,index,array){
        valor.push(value.nomalu + " " + value.apealu)
      })

      this.options=valor

    });
  }

  fils(search){
    search=this.search
    if(search.length>=0){
      this.myControl.setValue(this.search.toLowerCase().slice(22, 30))
    }

  }
  // arrayOne(n: number): any[] {
  //   return Array(n);
  // }
  editMem(i: number, idmalu,mem, fechainicio, adelanto, restante, total,nommem,nombrealu,apealu) {
    // console.log(this.membresia)
    const dialogRef = this.dialog.open(PerfilmemeditComponent, {
      width: '500px',
      data:
      {
        i: i, idmalu: idmalu,nombre:mem, fechainicio: fechainicio, adelanto: adelanto, restante: restante, total: total,nommem:nommem,nombrealu:nombrealu,apealu:apealu
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == 1) {

        this.perfilService.putMembresias(this.perfilService.getDialogData()).subscribe((data) => {
          this.datosEditMem = this.perfilService.getDialogData()
          this.fil[i].adelanto = this.datosEditMem.adelanto
          this.fil[i].restante = this.datosEditMem.restante
          this.fil[i].total = this.datosEditMem.total
          this.nadelanto=this.datosEditMem.nadelanto
          this.showSuccessEdit()
          console.log(this.nadelanto)
          this.pdf(this.fil[i],this.nadelanto);

        }, (error) => {
          this.showErrorEdit()
        })
      }
    })
  }

    // Notificación de success al editar
    showSuccessEdit() {
      this.toastr.successToastr('Registro actualizado', 'Exito!');
    }
  
    // Notificacion de error al editar
    showErrorEdit() {
      this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
    }

    filtro(y){

      // this.filtros=this.datos.filter(x=>x.nomalu==y)
      // console.log(y)
    }
 
       

    onKey(event:string) { 
      this.fil=this.filtros.filter(element=>element.nomalu + " " + element.apealu==event)
    }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      console.log(filterValue)
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }


    deben(x){
      if(x==1){
        this.fil=this.pagado.filter(x=>x.restante==0)
      }else if(x==2){
        this.fil=this.pagado.filter(x=>x.restante>0)
      }else if(x==3){
        this.fil=this.pagado
      }
    }


    pdf(x,y){
      console.log(x)
      let docs = new jsPDF();

      var img = new Image()
      var rows1 = [];
      var rows2 = [];
      var rows3 = [];
      img.src = 'assets/images/rg.png'
      docs.addImage(img, 'png', 159,4, 40,20)
      docs.setFontSize(14);
      docs.addFont("Arimo-Regular.ttf", "Arimo", "normal");
      docs.setFontType("normal");
      docs.setFontSize(14);
      docs.text(10,20, 'Alumno '+x.nomalu+" " +x.apealu  );
      docs.text(10,30, 'Membrecia : '+ x.nombres  );
      docs.text(10,40, 'Numero de clases a la semana: ' + x.clases );
      docs.text(10,50, 'Fecha de inicio: '+x.fechainicio );
      docs.text(130,50, 'Fecha de termino: '+x.fechatermino);
      docs.setFontSize(12);
      docs.text(10,70, 'Tipo de pago: '+x.nombre);
      docs.text(10,80, 'Adelanto total: $'+x.adelanto+".00");
      docs.text(10,100,'Total: $'+x.total+".00")
      docs.text(10,90,'Restante: $'+x.restante+".00")
      docs.text(10,110,'Nuevo adelanto : $'+y+".00")
      docs.setFontSize(12);
      docs.setDrawColor(0, 0, 0);
      docs.line(10,93, 200, 93);
      docs.setFontSize(10);
      docs.save('.pdf');

    }

}
