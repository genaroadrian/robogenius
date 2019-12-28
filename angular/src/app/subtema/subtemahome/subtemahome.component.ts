import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubtemaService } from 'src/app/services/subtema.service';
import { HttpClient } from '@angular/common/http';
import { subtema } from 'src/app/interfaces/subtema';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog} from '@angular/material';
import { SubtemaaddComponent } from '../subtemaadd/subtemaadd.component';
import { SubtemadeletComponent } from '../subtemadelet/subtemadelet.component';
import { SubtemaeditComponent } from '../subtemaedit/subtemaedit.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-subtemahome',
  templateUrl: './subtemahome.component.html',
  styleUrls: ['./subtemahome.component.css']
})
export class SubtemahomeComponent implements OnInit {
  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'ids',
    'nombre',
    // 'idac',
    'icons'
  ];

  /* Visibilidad de la barra de carga */
  barra = "none"

  /* Variables para la visualizacin y configuracion de las tablas */
  exampleDatabase: SubtemaService | null;
  dataSource: ExampleDataSource | null;

  /* Index de las tablas */
  index: number;
  /* ID de las tablas */
  id: number;
  /* Servicio de escuelas */
  // EscuelasService: any;
  Temaservice: any;


  /* Variable para guardar los datos de add y update */
  temaadd: any

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public subtemaser: SubtemaService, private router: Router, public toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  // Metodo para recibir los datos y asignar la tabla
  getEscuelas() {
    this.exampleDatabase = new SubtemaService (this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnInit() {
    /* Llama al metodo para obtener escuelas */
    this.getEscuelas();

    // Traducir los label de la tabla
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

    this.getEscuelas();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /* Mensaje de ADD */
  showSuccessAdd() {
    this.toastr.successToastr('Registro agregado', 'Exito!');
  }

  /* Mensaje de UPDATE */
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  /* Mensaje de DELETE */
  showSuccessDelete() {
    this.toastr.successToastr('Registro eliminado','Exito!');
  }

  /* Mensaje de ERROR */
  showError() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew() {
    let tema: subtema
    // Abre la ventana modal
    const dialogRef = this.dialog.open(SubtemaaddComponent, {
      width: '600px',
      data: { tema: tema }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.subtemaser.add(this.subtemaser.getDialogData()).subscribe((data) => {
          this.temaadd = data
          this.exampleDatabase.dataChange.value.push(this.temaadd);
          this.refreshTable()
          this.showSuccessAdd();
          this.hideBarra()
        }, (error) => {
          this.showError();
          this.hideBarra()
        });

      }
    });
  }

  

  // Metodo para abrir el modal para modificar
  onUpdate(i: number, ids: number, nombre: string, idt: string) {
    this.id = ids;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(SubtemaeditComponent, {
      data: { ids: ids, nombre: nombre, idt: idt }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.subtemaser.put(this.subtemaser.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.ids === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.subtemaser.getDialogData();
          // And lastly refresh table
          this.refreshTable()
          this.hideBarra()
          this.showSuccessEdit()
        }, (error) => {
          this.showError()
          this.hideBarra()
        })

      }

    });
  }


  delete(i: number, idt: number, nombre: string) {
    this.index = i;
    this.id = idt;
    const dialogRef = this.dialog.open(SubtemadeletComponent, {
      data: { id: idt, nombre: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.subtemaser.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idt === this.id);
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable()
          this.showSuccessDelete()
          this.hideBarra()
        }, (error) => {
          this.showError()
          this.hideBarra()
        })
      }
    });
  }

}

// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<subtema> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: subtema[] = [];
  renderedData: subtema[] = [];

  constructor(public _exampleDatabase: SubtemaService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<subtema[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getsubtema();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((subtema: subtema) => {
        const searchStr = (subtema.nombre + subtema.ids ).toLowerCase();
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
  sortData(data: subtema[]): subtema[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'ids': [propertyA, propertyB] = [a.ids, b.ids]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'idt': [propertyA, propertyB] = [a.idt, b.idt]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
