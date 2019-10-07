import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SesionesService } from 'src/app/services/sesiones.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DataSource } from '@angular/cdk/table';
import { Sesiones } from 'src/app/interfaces/sesiones';
import { BehaviorSubject, Observable, merge, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homesesiones',
  templateUrl: './homesesiones.component.html',
  styleUrls: ['./homesesiones.component.css']
})
export class HomesesionesComponent implements OnInit {

  barra: string = 'none'

  id: number
  index: number

  displayedColumns: string[] = [
    'nombre',
    'apren_clave',
    'objetivo',
    'contenido',
  ];

  exampleDatabase: SesionesService | null;
  dataSource: ExampleDataSource | null;

  constructor(private httpClient: HttpClient ,public dialog: MatDialog, public sesionesService: SesionesService, 
    public notificationsService: NotificationsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.getSesiones()
    this.traduccionTabla()
  }

  getSesiones()
  {
    this.exampleDatabase = new SesionesService(this.httpClient)
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    console.log(this.dataSource)
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        console.log(this.dataSource)
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  traduccionTabla()
  {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
  }

  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }

  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }

  // Metodo para refrescar la pagina
  refresh() {

    this.getSesiones()
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}


/* Example datasource */
export class ExampleDataSource extends DataSource<Sesiones> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
    
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Sesiones[] = [];
  renderedData: Sesiones[] = [];

  constructor(public _exampleDatabase: SesionesService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Sesiones[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getSesiones()


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((sesion: Sesiones) => {
        const searchStr = (sesion.nombre, sesion.objetivo, sesion.mat_necesario, sesion.introduccion,
          sesion.ice_break, sesion.descanso, sesion.desarrollo, sesion.contenido, sesion.cierre, sesion.apren_clave).toLowerCase();
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

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: Sesiones[]): Sesiones[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'apren_clave': [propertyA, propertyB] = [a.apren_clave, b.apren_clave]; break;
        case 'objetivo': [propertyA, propertyB] = [a.objetivo, b.objetivo]; break;
        case 'mat_necesario': [propertyA, propertyB] = [a.mat_necesario, b.mat_necesario]; break;
        case 'introduccion': [propertyA, propertyB] = [a.introduccion, b.introduccion]; break;
        case 'ice_break': [propertyA, propertyB] = [a.ice_break, b.ice_break]; break;
        case 'contenido': [propertyA, propertyB] = [a.contenido, b.contenido]; break;
        case 'descanso': [propertyA, propertyB] = [a.descanso, b.descanso]; break;
        case 'desarrollo': [propertyA, propertyB] = [a.desarrollo, b.desarrollo]; break;
        case 'cierre': [propertyA, propertyB] = [a.cierre, b.cierre]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}