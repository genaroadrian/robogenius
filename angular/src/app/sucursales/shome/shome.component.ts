import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { SucursalService } from 'src/app/services/sucursal.service';
import {HttpClient} from '@angular/common/http';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import { SeditComponent } from '../sedit/sedit.component';
import { SaddComponent } from '../sadd/sadd.component';
import { SdeleteComponent } from '../sdelete/sdelete.component';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import delay, { delayReject, delayThen, delayCatch } from 'delay.ts';

@Component({
  selector: 'app-shome',
  templateUrl: './shome.component.html',
  styleUrls: ['./shome.component.css']
})
export class ShomeComponent implements OnInit {

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'idsuc',
    'nombre',
    'direccion',
    'encargado',
    'usuario',
    'psw',
    'icons'
   ];

  sucursal: Sucursal[];
  // dataSource: MatTableDataSource<Tipopersonal>;
  exampleDatabase: SucursalService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  SucursalService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public sucursalService: SucursalService ) { }


  ngOnInit()
  {
    // Llamado al metodo de getEscuelas
    this.getSucursal();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    this.getSucursal();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew(sucursal: Sucursal) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(SaddComponent, {
      data: {sucursal: sucursal }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==1){
        this.exampleDatabase.dataChange.value.push(this.sucursalService.getDialogData());
        this.exampleDatabase = new SucursalService(this.httpClient);
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        this.refreshTable();
      }
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getSucursal(){
    this.exampleDatabase = new SucursalService(this.httpClient);
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
  onUpdate(i: number, idsuc: number, nombre: string,  direccion: string, encargado: string, usuario: string, psw: string) {
    this.id = idsuc;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(SeditComponent, {
      data: {idsuc: idsuc, nombre: nombre, direccion: direccion, encargado: encargado, usuario: usuario, psw: psw}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idsuc === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.sucursalService.getDialogData();
        // And lastly refresh table
        delay(10 * 1000, 'some value').then(v => {
            // Executed in 7 seconds
            console.log(v);
        });
        this.refresh();
      }
    });
  }


  delete(i: number, idsuc:number, id: number) {
    this.index = i;
    this.id = idsuc;
    const dialogRef = this.dialog.open(SdeleteComponent, {
      data: {id: idsuc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idsuc === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

}

// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Sucursal> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Sucursal[] = [];
  renderedData: Sucursal[] = [];

  constructor(public _exampleDatabase: SucursalService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Sucursal[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getSucursal();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((sucursal: Sucursal) => {
          const searchStr = (sucursal.idsuc + sucursal.nombre + sucursal.direccion + sucursal.encargado + sucursal.usuario + sucursal.psw + sucursal.activo).toLowerCase();
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
  sortData(data:Sucursal[]):Sucursal[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idsuc': [propertyA, propertyB] = [a.idsuc, b.idsuc]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'direccion': [propertyA, propertyB] = [a.direccion, b.direccion]; break;
        case 'encargado': [propertyA, propertyB] = [a.encargado, b.encargado]; break;
        case 'usuario': [propertyA, propertyB] = [a.usuario, b.usuario]; break;
        case 'psw': [propertyA, propertyB] = [a.psw, b.psw]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
