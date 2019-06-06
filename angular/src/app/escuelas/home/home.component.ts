import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { EscuelasService } from 'src/app/services/escuelas.service';
import {HttpClient} from '@angular/common/http';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import delay, { delayReject, delayThen, delayCatch } from 'delay.ts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'idesc',
    'nombre',
    'representante',
    'direccion',
    'telefono',
    'correo',
    'icons'
   ];

  escuelas: Escuelas[];
  // dataSource: MatTableDataSource<Tipopersonal>;
  exampleDatabase: EscuelasService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  EscuelasService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public escuelasService: EscuelasService ) { }


  ngOnInit() 
  {
    // Llamado al metodo de getEscuelas
    this.getEscuelas();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    
    this.getEscuelas();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew(escuelas: Escuelas) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(AddComponent, {
      data: {escuelas: escuelas }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==1){
        this.exampleDatabase.dataChange.value.push(this.escuelasService.getDialogData());
        this.exampleDatabase = new EscuelasService(this.httpClient);
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
      }this.refreshTable();
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getEscuelas(){
    this.exampleDatabase = new EscuelasService(this.httpClient);
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
  onUpdate(i: number, idesc: number, nombre: string, representante: string, direccion: string, telefono: number, correo: string) {
    this.id = idesc;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {idesc: idesc, nombre: nombre, representante: representante, direccion: direccion, telefono: telefono, correo: correo}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idesc === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.escuelasService.getDialogData();
        // And lastly refresh table
      }
      this.refresh();
    });
  }


  delete(i: number, idesc:number, id: number) {
    this.index = i;
    this.id = idesc;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: idesc}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idesc === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        if (i% this.paginator.pageSize == 0) {
          this.getEscuelas();
        }
        this.refreshTable();
      }
    });
  }

}

// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Escuelas> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Escuelas[] = [];
  renderedData: Escuelas[] = [];

  constructor(public _exampleDatabase: EscuelasService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Escuelas[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getEscuelas();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((escuelas: Escuelas) => {
          const searchStr = (escuelas.idesc + escuelas.nombre + escuelas.representante + escuelas.direccion + escuelas.telefono + escuelas.correo + escuelas.activo).toLowerCase();
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
  sortData(data:Escuelas[]):Escuelas[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idesc': [propertyA, propertyB] = [a.idesc, b.idesc]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'representante': [propertyA, propertyB] = [a.representante, b.representante]; break;
        case 'direccion': [propertyA, propertyB] = [a.direccion, b.direccion]; break;
        case 'telefono': [propertyA, propertyB] = [a.telefono, b.telefono]; break;
        case 'correo': [propertyA, propertyB] = [a.correo, b.correo]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
