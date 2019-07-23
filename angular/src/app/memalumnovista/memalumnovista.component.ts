import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {MemalumnovistaService} from 'src/app/services/memalumnovista.service';
import { Memalumno } from 'src/app/interfaces/memalumno';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-memalumnovista',
  templateUrl: './memalumnovista.component.html',
  styleUrls: ['./memalumnovista.component.css']
})
export class MemalumnovistaComponent implements OnInit {

  tableview = "none";

  // Columnas que se van a mostrar en la tabla
  displayedColumns: string[] = [
    'Id',
    'Membrecia',
    'Alumno',
    'Pago',
    'Adelanto',
    'Restante',
    'Total',
    'InicioMembrecia',
    'idalu',
    'idtipopago',
    'idtmem',
    'activo'
   ];

  //  Declaracion de la interfaz de personal
  memalumno: Memalumno[];

  // Declaracion de el servicio de personal
  exampleDatabase:MemalumnovistaService | null;

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

  // Declaracion del servico de personal
  MemalumnovistaService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public memalumnovistaService: MemalumnovistaService,
    private router :Router  ) { }


    logout(){
      localStorage.removeItem('email');
      this.router.navigateByUrl('/login');
    }

  ngOnInit() 
  {
    // Llamado al metodo de que obtiene los datos
    this.getMemalumnos();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    this.getMemalumnos();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*  Obtiene los datos de la base y se la asigna a el datasource y database example
  tambien se le asigna el filtro la barra de busqueda y la paginacion */
  public getMemalumnos() {
    this.exampleDatabase = new MemalumnovistaService(this.httpClient);
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

 
}



// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Memalumno> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Memalumno[] = [];
  renderedData: Memalumno[] = [];

  constructor(public _exampleDatabase: MemalumnovistaService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Memalumno[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getMemalumno();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((memalumno: Memalumno) => {
          const searchStr = (memalumno.Membrecia + memalumno.Alumno + memalumno.Adelanto).toLowerCase();
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
  sortData(data: Memalumno[]):Memalumno[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.Id, b.Id]; break;
        case 'Membrecia': [propertyA, propertyB] = [a.Membrecia, b.Membrecia]; break;
        case 'Alumno': [propertyA, propertyB] = [a.Alumno, b.Alumno]; break;
        case 'Pago': [propertyA, propertyB] = [a.Pago, b.Pago]; break;
        case 'Adelanto': [propertyA, propertyB] = [a.Adelanto, b.Adelanto]; break;
        case 'Pago': [propertyA, propertyB] = [a.Pago, b.Pago]; break;
        case 'Adelanto': [propertyA, propertyB] = [a.Adelanto, b.Adelanto]; break;
        case 'Restante': [propertyA, propertyB] = [a.Restante, b.Restante]; break;
        case 'Total': [propertyA, propertyB] = [a.Total, b.Total]; break;
        case 'InicioMembrecia': [propertyA, propertyB] = [a.InicioMembrecia, b.InicioMembrecia]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
        case 'idalu': [propertyA, propertyB] = [a.idalu, b.idalu]; break;
        case 'idtipopago': [propertyA, propertyB] = [a.idtipopago, b.idtipopago]; break;
        case 'idtmem': [propertyA, propertyB] = [a.idtmem, b.idtmem]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

