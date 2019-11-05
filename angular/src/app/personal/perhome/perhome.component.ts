import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/interfaces/personal';
import {map} from 'rxjs/operators';
import { PeraddComponent } from '../peradd/peradd.component';
import { PerdeleteComponent } from '../perdelete/perdelete.component';
import { Router } from '@angular/router';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
// For MDB Angular Free



// import * as archivo from  'assets/js/jquery.min.js';
// import * as archivo1 from  'assets/js/bootstrap.bundle.min.js';
// import * as archivo11 from  'js/jquery.slimscroll.js';
// import * as archivo111 from  'assets/plugins/jquery-sparkline/jquery.sparkline.min.js';
// import * as archivo1111 from  'assets/js/app.js';
// import * as archivo11111 from  'assets/jquery/jquery.js';
// import * as archivo111111 from  'assets/jquery/codigo.js';

// declare const myTest: any;


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-perhome',
  templateUrl: './perhome.component.html',
  styleUrls: ['./perhome.component.css']
})
export class PerhomeComponent  {

  // onClick() {
  //   myTest();
  // }

  barra = "none";

  /* Datos de la funcion DialogRef edit */
  dialogEdit: any

  results: string

  
  tableview = "none";
  
  // Columnas que se van a mostrar en la tabla
  displayedColumns: string[] = [
    'idper',
    'nombre',
    'apellidos',
    'usuario',
    'contra',
    'fechanac',
    'sexo',
    'curp',
    'estadocivil',
    'domicilio',
    'fechaingreso',
    'horaentrada',
    'horasalida',
    'perfilprofesional',
    'especialidad',
    'tareasasignadas',
    'salariomensual',
    // 'idtper',
    'icons'
   ];

  //  Declaracion de la interfaz de personal
  personal: Personal[];

  // Declaracion de el servicio de personal
  exampleDatabase: PersonalService | null;

  // Los datos obtenidos se asignan a un datasource para que sean leidos por la tabla
  dataSource: ExampleDataSource | null;

  // Componentes para la paginacion y la barra de busqueda
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // Index de la tabla
  index: number;

  // ID de la tabla
  id: number;

  sucursal:any;

  // Declaracion del servico de personal
  PersonalService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public personalService: PersonalService,
    private router :Router, public toastr: ToastrManager,
    public personalPerfilService: PersonalperfilService) { }



    logout(){
      localStorage.removeItem('email');
      this.router.navigateByUrl('/login');
    }

  ngOnInit() 
  {
    // console.log(this.sucursal)
    // Llamado al metodo de que obtiene los datos
    this.getPersonal();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    this.getPersonal();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

   // Notificación de success al eliminar
   showSuccesDelete() {
    this.toastr.successToastr('Registro eliminado','Exito!');
   }


   // Notificación de success al editar
   showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado','Exito!');
  }

  // Notificacion de error al editar
  showErrorEdit() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  /* El componente que sera modal debera ser agregado en app.module.ts
  en la sección de entryComponents */
  addNew(personal: Personal) {
    const dialogRef = this.dialog.open(PeraddComponent, {
      data: {personal: personal }
    });
  }

  /*  Obtiene los datos de la base y se la asigna a el datasource y database example
  tambien se le asigna el filtro la barra de busqueda y la paginacion */
  public getPersonal() {
    this.exampleDatabase = new PersonalService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    if(this.dataSource.renderedData.length > 0)
      { 
        console.log(":v")
      }
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          console.log(this.dataSource)
          return;
          
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        console.log(this.dataSource)
      });
  }

  /* Metodo para eliminar un */
  delete(i:number, idper:number, nombre: string, apellidos:string){
    this.index = i;
    this.id = idper;
    const dialogRef = this.dialog.open(PerdeleteComponent, {
      data: {id: idper, nombre:nombre, apellidos:apellidos}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.barra = ""
        this.personalService.delete(idper).subscribe((data)=>{
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idper === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.barra = "none"
        this.showSuccesDelete();
        }, (error)=>{
        this.showSuccesDelete()
        this.barra = "none"
        })
        
      }
    });
  }


  perfil(row)
  {
    this.personalPerfilService.perfil(row)
  }


  
}



// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Personal> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Personal[] = [];
  renderedData: Personal[] = [];

  constructor(public _exampleDatabase: PersonalService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Personal[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getPersonal();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((personal: Personal) => {
          const searchStr = (personal.idper + personal.nombre + personal.apellidos).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Personal[]):Personal[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idper': [propertyA, propertyB] = [a.idper, b.idper]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'apellidos': [propertyA, propertyB] = [a.apellidos, b.apellidos]; break;
        case 'usuario': [propertyA, propertyB] = [a.usuario, b.usuario]; break;
        case 'contra': [propertyA, propertyB] = [a.contra, b.contra]; break;
        case 'fechanac': [propertyA, propertyB] = [a.fechanac, b.fechanac]; break;
        case 'curp': [propertyA, propertyB] = [a.curp, b.curp]; break;
        case 'sexo': [propertyA, propertyB] = [a.sexo, b.sexo]; break;
        case 'estadocivil': [propertyA, propertyB] = [a.estadocivil, b.estadocivil]; break;
        case 'domicilio': [propertyA, propertyB] = [a.domicilio, b.domicilio]; break;
        case 'fechaingreso': [propertyA, propertyB] = [a.fechaingreso, b.fechaingreso]; break;
        case 'horaentrada': [propertyA, propertyB] = [a.horaentrada, b.horaentrada]; break;
        case 'horasalida': [propertyA, propertyB] = [a.horasalida, b.horasalida]; break;
        case 'perfilprofesional': [propertyA, propertyB] = [a.perfilprofesional, b.perfilprofesional]; break;
        case 'especialidad': [propertyA, propertyB] = [a.especialidad, b.especialidad]; break;
        case 'tareasasignadas': [propertyA, propertyB] = [a.tareasasignadas, b.tareasasignadas]; break;
        case 'salariomensual': [propertyA, propertyB] = [a.salariomensual, b.salariomensual]; break;
        case 'idtper': [propertyA, propertyB] = [a.idtper, b.idtper]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
