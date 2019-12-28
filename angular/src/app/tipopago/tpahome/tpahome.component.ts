import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TipopagoService } from 'src/app/services/tipopago.service';
import { HttpClient } from '@angular/common/http';
import { Tipopago } from 'src/app/interfaces/tipopago';
import { MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { TpaeditComponent } from '../tpaedit/tpaedit.component';
import { TpaaddComponent } from '../tpaadd/tpaadd.component';
import { TpadeleteComponent } from '../tpadelete/tpadelete.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tpahome',
  templateUrl: './tpahome.component.html',
  styleUrls: ['./tpahome.component.css']
})
export class TpahomeComponent implements OnInit {

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'nombre',
    'icons'
  ];

  tipopago: Tipopago[];
  // dataSource: MatTableDataSource<Tipopersonal>;
  exampleDatabase: TipopagoService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  TipopagoService: any;

  /* Variables de add  */
  Tpagoadd: any

  /* Barra de carga */
  barra = "none"

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public tipopagoService: TipopagoService, public toastr: ToastrManager) { }


  ngOnInit() {
    // Llamado al metodo de getEscuelas
    this.getTipopago();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
  }

  showSuccessAdd() {
    this.toastr.successToastr('Registro agregado', 'Exito!');
  }

  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  showSuccessDelete() {
    this.toastr.successToastr('Registro eliminado', 'Exito!');
  }

  showError() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
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
    this.getTipopago();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew() {
    let tipopago: Tipopago
    // Abre la ventana modal
    const dialogRef = this.dialog.open(TpaaddComponent, {
      data: { tipopago: tipopago }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.tipopagoService.add(this.tipopagoService.getDialogData()).subscribe((data) => {
          this.Tpagoadd = data
          this.exampleDatabase.dataChange.value.push(this.Tpagoadd);
          this.refreshTable();
          this.showSuccessAdd();
          this.hideBarra()
        }, (error) => {
          this.showError();
          this.hideBarra()
        });

      }
    });
  }

  // Metodo para recibir los datos y asignar la tabla
  getTipopago() {
    this.exampleDatabase = new TipopagoService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  onUpdate(i: number, idtipopago: number, nombre: string) {
    this.id = idtipopago;
    this.index = i;
    const dialogRef = this.dialog.open(TpaeditComponent, {
      data: { idtipopago: idtipopago, nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tipopagoService.put(this.tipopagoService.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtipopago === this.id);
          this.exampleDatabase.dataChange.value[foundIndex] = this.tipopagoService.getDialogData();
          this.refreshTable();
          this.showSuccessEdit();
          this.hideBarra()
        }, (error) => {
          this.showError();
          this.hideBarra()
        });
      }
    });
  }


  delete(i: number, idtipopago: number, nombre: string) {
    this.index = i;
    this.id = idtipopago;
    const dialogRef = this.dialog.open(TpadeleteComponent, {
      data: { id: idtipopago, nombre: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tipopagoService.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtipopago === this.id);
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showSuccessDelete()
          this.hideBarra()
        }, (error) => {
          this.hideBarra()
          this.showError()
        });
      }
    });
  }

}

// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Tipopago> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Tipopago[] = [];
  renderedData: Tipopago[] = [];

  constructor(public _exampleDatabase: TipopagoService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Tipopago[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getTipopago();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((tipopago: Tipopago) => {
        const searchStr = (tipopago.nombre + tipopago.activo).toLowerCase();
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
  sortData(data: Tipopago[]): Tipopago[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idtipopago': [propertyA, propertyB] = [a.idtipopago, b.idtipopago]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
