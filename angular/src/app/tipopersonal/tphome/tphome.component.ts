import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { TipopersonalService } from 'src/app/services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import { Tipopersonal } from 'src/app/interfaces/tipopersonal';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatDialog, MatDialogConfig, MatIconRegistry } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TpaddComponent } from '../tpadd/tpadd.component';
import { TpdeleteComponent } from '../tpdelete/tpdelete.component';
import { TpeditComponent } from '../tpedit/tpedit.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { spinner } from 'src/app/services/global.service';
import { noResults } from 'src/app/services/global.service';



@Component({
  selector: 'app-tphome',
  templateUrl: './tphome.component.html',
  styleUrls: ['./tphome.component.css']
})
export class TphomeComponent implements OnInit {
    spinner = spinner
  noResults = noResults

  disp = "none"

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    // 'idtper',
    'tipo',
    'permisos',
    'maestro',
    'icons'
  ];

  /* Variable para guardar los datos de add y update */
  tipopadd: any

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


  /* Visibilidad de la barra de carga */
  barra = "none"

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public tipopersonalService: TipopersonalService,
    public notifications: NotificationsService, public toastr: ToastrManager) {

  }

   /* Mensaje de ERROR */
   showErrors(error) {
    this.toastr.errorToastr(error, 'Oops!');
  }

  ngOnInit() {
    // Llamado al metodo de getTipopersonal
    this.getTipopersonal();
    console.log(this.dataSource._exampleDatabase.dataChange)

    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    this.getTipopersonal();
  }
  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }

  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew() {
    let tpersonal: Tipopersonal
    // Abre la ventana modal
    const dialogRef = this.dialog.open(TpaddComponent, {

      data: { tpersonal: tpersonal }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // this.notifications.showBarra()
        this.showBarra()
        this.tipopersonalService.add(this.tipopersonalService.getDialogData()).subscribe((data) => {
          this.tipopadd = data
          this.exampleDatabase.dataChange.value.push(this.tipopadd);
          this.refreshTable()
          this.notifications.showSuccessAdd();
          // this.notifications.hideBarra();
          this.hideBarra();
        }, (error) => {
          // this.notifications.showError();

          this.showErrors(error.error.tipo[0]);

          // this.notifications.hideBarra();
          this.hideBarra();

        });

      }
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getTipopersonal() {
    this.exampleDatabase = new TipopersonalService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        console.log(this.dataSource._exampleDatabase.dataChange)
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;

      });

  }


  // Metodo para abrir el modal para modificar
  onUpdate(i: number, idtper: number, tipo: string, permisos: number, maestro: number) {
    this.id = idtper;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(TpeditComponent, {
      data: { idtper: idtper, tipo: tipo, permisos:permisos, maestro:maestro }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tipopersonalService.put(this.tipopersonalService.getDialogData()).subscribe((data) => {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtper === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.tipopersonalService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.notifications.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notifications.showError()
          this.hideBarra()
        })

      }

    });
  }

  delete(i: number, idtper: number) {
    this.index = i;
    this.id = idtper;
    const dialogRef = this.dialog.open(TpdeleteComponent, {
      data: { id: idtper }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tipopersonalService.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtper === this.id);
          // for delete we use splice in order to remove single object from DataService
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          // this.notifications.showSuccessDelete();
          this.hideBarra()
        }, (error) => {
          this.notifications.showError()
          this.hideBarra()
        })
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


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((tipoPersonal: Tipopersonal) => {
        const searchStr = (tipoPersonal.idtper + tipoPersonal.tipo + tipoPersonal.activo).toLowerCase();
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
  sortData(data: Tipopersonal[]): Tipopersonal[] {
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