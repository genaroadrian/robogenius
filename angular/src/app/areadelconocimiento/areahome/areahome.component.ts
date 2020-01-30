import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { AreadelconocimientoService } from 'src/app/services/areadelconocimiento.service';
import { areadelconocimiento } from 'src/app/interfaces/areadelconocimiento';
import {map} from 'rxjs/operators';
import {  AreaaddComponent } from '../areaadd/areaadd.component';
import { AreadeletComponent } from '../areadelet/areadelet.component';
import { AreaeditComponent } from '../areaedit/areaedit.component';
import { Router } from '@angular/router';
import { spinner } from 'src/app/services/global.service';
import { noResults } from 'src/app/services/global.service';

@Component({
  selector: 'app-areahome',
  templateUrl: './areahome.component.html',
  styleUrls: ['./areahome.component.css']
})
export class AreahomeComponent implements OnInit {

  spinner = spinner
  noResults = noResults

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [

    
    'nombre',
    'icons'
  ];

  /* Visibilidad de la barra de carga */
  barra = "none"

  /* Variables para la visualizacin y configuracion de las tablas */
  exampleDatabase: AreadelconocimientoService | null;
  dataSource: ExampleDataSource | null;

  /* Index de las tablas */
  index: number;
  /* ID de las tablas */
  id: number;
  /* Servicio de escuelas */
  AreaService: any;

  /* Variable para guardar los datos de add y update */
  areadd: any

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public  areadelconocimiento : AreadelconocimientoService, private router: Router, public toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  // Metodo para recibir los datos y asignar la tabla
  getac() {
    this.exampleDatabase = new AreadelconocimientoService(this.httpClient);
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
    this.getac();

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

    this.getac();
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
    let escuelas: areadelconocimiento
    // Abre la ventana modal
    const dialogRef = this.dialog.open(AreaaddComponent, {
      width: '600px',
      data: { escuelas: escuelas }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.areadelconocimiento.save(this.areadelconocimiento.getDialogData()).subscribe((data) => {
          this.areadd = data
          this.exampleDatabase.dataChange.value.push(this.areadd);
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
  onUpdate(i: number, idac: number, nombre: string) {
    this.id = idac;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(AreaeditComponent, {
      data: { idac: idac, nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.areadelconocimiento.put(this.areadelconocimiento.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idac === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.areadelconocimiento.getDialogData();
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


  delete(i: number, idac: number, nombre: string) {
    this.index = i;
    this.id = idac;
    const dialogRef = this.dialog.open(AreadeletComponent, {
      data: { id: idac, nombre: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.areadelconocimiento.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idac === this.id);
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

export class ExampleDataSource extends DataSource<areadelconocimiento> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: areadelconocimiento[] = [];
  renderedData: areadelconocimiento[] = [];

  constructor(public _exampleDatabase: AreadelconocimientoService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<areadelconocimiento[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getareadelconocimiento();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((areadelconoc: areadelconocimiento) => {
        const searchStr = (areadelconoc.idac + areadelconoc.nombre).toLowerCase();
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
  sortData(data: areadelconocimiento[]): areadelconocimiento[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idac': [propertyA, propertyB] = [a.idac, b.idac]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
