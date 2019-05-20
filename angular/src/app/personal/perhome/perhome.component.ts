import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/interfaces/personal';
import {map} from 'rxjs/operators';
import { PeraddComponent } from '../peradd/peradd.component';
import { PerdeleteComponent } from '../perdelete/perdelete.component';
import { PereditComponent } from '../peredit/peredit.component';
@Component({
  selector: 'app-perhome',
  templateUrl: './perhome.component.html',
  styleUrls: ['./perhome.component.css']
})
export class PerhomeComponent implements OnInit {

  tableview = "none";
  
  // Columnas que se van a mostrar en la pagina
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
    'idtper',
    'icons'
   ];

  personal: Personal[];
  exampleDatabase: PersonalService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  PersonalService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public personalService: PersonalService ) { }


  ngOnInit() 
  {
    // Llamado al metodo de getTipopersonal
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

  // Metodo para abrir el modal para agrefar nuevo registro
  /* El componente que sera modal debera ser agregado en app.module.ts
  en la sección de entryComponents */
  addNew(personal: Personal) {
    const dialogRef = this.dialog.open(PeraddComponent, {
      data: {personal: personal }
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getPersonal(){
    this.exampleDatabase = new PersonalService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  
  // Metodo para abrir el modal para modificar
  onUpdate(i: number, idper: number) {
    this.id = idper;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(PereditComponent, {
      data: {idper: idper}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtper === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.personalService.getDialogData();
        // And lastly refresh table
        this.refresh();
      }
    });
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
          const searchStr = (personal.idper + personal.nombre + personal.apellidos + personal.fechaingreso).toLowerCase();
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
