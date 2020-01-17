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

  constructor(public pmem:PmembresiaService,
    public alumnosService: AlumnosService
    , private perfilService: PerfilService, public dialog: MatDialog,
    public toastr: ToastrManager) { }

  ngOnInit() {
   
    setTimeout (() => {
      this.myControl.setValue(this.search.toLowerCase().slice(22, 28))
   }, 4000);

 
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
      width: '37%',
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
          this.showSuccessEdit()

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

}
