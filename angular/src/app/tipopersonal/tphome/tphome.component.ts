import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import {HttpClient} from '@angular/common/http';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import { TpeditComponent } from '../tpedit/tpedit.component';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { TpaddComponent } from '../tpadd/tpadd.component';
import { TpdeleteComponent } from '../tpdelete/tpdelete.component';


@Component({
  selector: 'app-tphome',
  templateUrl: './tphome.component.html',
  styleUrls: ['./tphome.component.css']
})
export class TphomeComponent implements OnInit {

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'idtper',
    'tipo',
    'icons'
   ];

  tipoPersonal: Tipopersonal[];
  // dataSource: MatTableDataSource<Tipopersonal>;
  exampleDatabase: TipopersonalService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  TipopersonalService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public tipopersonalService: TipopersonalService ) {
      
     }


  ngOnInit() 
  {
    // Llamado al metodo de getTipopersonal
    this.getTipopersonal();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    this.getTipopersonal();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew(tipoPersonal: Tipopersonal) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(TpaddComponent, {
      data: {tipoPersonal: tipoPersonal }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.tipopersonalService.getDialogData());
        this.refreshTable();
      }
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getTipopersonal(){
    this.exampleDatabase = new TipopersonalService(this.httpClient);
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
  onUpdate(i: number, idtper: number, tipo: string) {
    this.id = idtper;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(TpeditComponent, {
      data: {idtper: idtper, tipo: tipo}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtper === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.tipopersonalService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
    
  }

  
  delete(i: number, idper:number, id: number) {
    this.index = i;
    this.id = idper;
    const dialogRef = this.dialog.open(TpdeleteComponent, {
      data: {id: idper}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtper === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

}

// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Tipopersonal> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Tipopersonal[] = [];
  renderedData: Tipopersonal[] = [];

  constructor(public _exampleDatabase: TipopersonalService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Tipopersonal[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getTipopersonal();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((tipoPersonal: Tipopersonal) => {
          const searchStr = (tipoPersonal.idtper + tipoPersonal.tipo+ tipoPersonal.activo).toLowerCase();
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
  sortData(data:Tipopersonal[]):Tipopersonal[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idtper': [propertyA, propertyB] = [a.idtper, b.idtper]; break;
        case 'tipo': [propertyA, propertyB] = [a.tipo, b.tipo]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}