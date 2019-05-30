import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Padres } from 'src/app/interfaces/padres';
import { PadresService } from 'src/app/services/padres.service';
// import { ExampleDataSource } from 'src/app/escuelas/home/home.component';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-padhome',
  templateUrl: './padhome.component.html',
  styleUrls: ['./padhome.component.css']
})
export class PadhomeComponent implements OnInit {

  /* ----------------------- Configuracion de la tabla ----------------------- */

  // Ocultar algunos campos de la tabla 
  tableview = "none";

  // Columnas que se van a mostrar en la tabla
  displayedColumns: string[]= [
    'idpadres',
    'nombrepad',
    'apellidospad',
    'domiciliopad',
    'telefonopad',
    'correopad',
    'ocupacionpad',
    'nombremad',
    'apellidosmad',
    'domiciliomad',
    'telefonomad',
    'correomad',
    'ocupacionmad',
    'usuario',
    'contra',
    'icons'
  ];

  // Declaracion de la interfaz de padres
  padres: Padres[];

  // Declaracion de el servicio de padres
  exampleDatabase: PadresService | null;

  // Los datos obtenidos se asignan a un datasource
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
  // Index y id de la fila de la tabla seleccionada
  index : number;
  id: number;

  // Declaracion del servicio de personal
  PadresService: any;

  constructor(public httpClient: HttpClient, public dialog: MatDialog,
    public padresService: PadresService) { }

  ngOnInit() 
  {

    // Funcion de obtener los datos de la base
    this.getPadres();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }

  // Vuelve a obtener la base de datos
  refresh()
  {
    this.getPadres();
  }

  // Refrescar la paginacion de la tabla
  refreshTable()
  {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public getPadres()
  {
    this.exampleDatabase = new PadresService(this.httpClient);
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

export class ExampleDataSource extends DataSource<Padres>
{
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Padres[] = [];
  renderedData: Padres[] = [];

  constructor(public _exampleDatabase: PadresService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Padres[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getPadres();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((padres: Padres) => {
          const searchStr = 
          (
            padres.nombrepad + padres.apellidospad + padres.nombremad + padres.apellidosmad +
            padres.correomad + padres.correopad + padres.telefonomad + padres.telefonopad
          ).toLowerCase();
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
  sortData(data: Padres[]):Padres[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {

        case 'idpadres': [propertyA, propertyB] = [a.idpadres, b.idpadres]; break;
        case 'nombrepad': [propertyA, propertyB] = [a.nombrepad, b.nombrepad]; break;
        case 'apellidospad': [propertyA, propertyB] = [a.apellidospad, b.apellidospad]; break;
        case 'domiciliopad': [propertyA, propertyB] = [a.domiciliopad, b.domiciliopad]; break;
        case 'telefonopad': [propertyA, propertyB] = [a.telefonopad, b.telefonopad]; break;
        case 'correopad': [propertyA, propertyB] = [a.correopad, b.correopad]; break;
        case 'ocupacionpad': [propertyA, propertyB] = [a.ocupacionpad, b.ocupacionpad]; break;
        case 'nombremad': [propertyA, propertyB] = [a.nombremad, b.nombremad]; break;
        case 'apellidosmad': [propertyA, propertyB] = [a.apellidosmad, b.apellidosmad]; break;
        case 'domiciliomad': [propertyA, propertyB] = [a.domiciliomad, b.domiciliomad]; break;
        case 'telefonomad': [propertyA, propertyB] = [a.telefonomad, b.telefonomad]; break;
        case 'correomad': [propertyA, propertyB] = [a.correomad, b.correomad]; break;
        case 'ocupacionmad': [propertyA, propertyB] = [a.ocupacionmad, b.ocupacionmad]; break;
        }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}