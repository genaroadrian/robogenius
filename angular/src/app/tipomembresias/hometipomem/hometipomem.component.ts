import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Tipomembresia } from 'src/app/interfaces/Tipomembresia';
import { map } from 'rxjs/operators';
import { AddtipomemComponent } from '../addtipomem/addtipomem.component';
import { EdittipomemComponent } from '../edittipomem/edittipomem.component';
import { DeletetipomemComponent } from '../deletetipomem/deletetipomem.component';

@Component({
  selector: 'app-hometipomem',
  templateUrl: './hometipomem.component.html',
  styleUrls: ['./hometipomem.component.css']
})
export class HometipomemComponent implements OnInit {

  memAdd: any

  /* Columnas que se van a mostrar en la tabla */
  displayedColumns: string[] = [
    'nombre',
    'costo',
    'clases',
    'icons'
  ];

   /* Visibilidad de la barra de carga */
   barra = "none"

   /* Variables para la visualizacin y configuracion de las tablas */
  exampleDatabase: TipomembresiaService | null;
  dataSource: ExampleDataSource | null;

  /* Index de las tablas */
  index: number;
  /* ID de las tablas */
  id: number;
  /* Servicio de tmem */
  TipomembresiaService: any;

  constructor(public httpClient: HttpClient, public tmemService: TipomembresiaService,
    public notifications: NotificationsService, public dialog: MatDialog) { }

    @ViewChild(MatPaginator,) paginator: MatPaginator
    @ViewChild(MatSort,) sort: MatSort
    @ViewChild('filter',) filter: ElementRef

    getMembresias()
    {
      this.exampleDatabase = new TipomembresiaService(this.httpClient);
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
    this.getMembresias()
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

    this.getMembresias();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addNew(tmembresia: Tipomembresia) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(AddtipomemComponent, {
      data: { tmembresia: tmembresia }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.tmemService.add(this.tmemService.getDialogData()).subscribe((data) => {
          this.memAdd = data
          this.exampleDatabase.dataChange.value.push(this.memAdd);
          this.refreshTable()
          this.notifications.showSuccessAdd()
          this.hideBarra()
        }, (error) => {
          this.notifications.showError();
          console.log(error)
          this.hideBarra()
        });

      }
    });
  }

  onUpdate(i: number, idtmem: number, nombre: string, costo: number, clases: number) {
    this.id = idtmem;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EdittipomemComponent, {
      data: { idtmem: idtmem, nombre: nombre, costo: costo, clases: clases}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tmemService.put(this.tmemService.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtmem === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.tmemService.getDialogData();
          // And lastly refresh table
          this.refreshTable()
          this.hideBarra()
          this.notifications.showSuccessEdit()
        }, (error) => {
          this.notifications.showError()
          this.hideBarra()
          console.log(error)
        })

      }

    });
  }

  delete(i: number, idtmem: number, nombre: string) {
    this.index = i;
    this.id = idtmem;
    const dialogRef = this.dialog.open(DeletetipomemComponent, {
      data: { id: idtmem, nombre: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.tmemService.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idtmem === this.id);
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable()
          this.notifications.showSuccessDelete()
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

export class ExampleDataSource extends DataSource<Tipomembresia> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Tipomembresia[] = [];
  renderedData: Tipomembresia[] = [];

  constructor(public _exampleDatabase: TipomembresiaService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Tipomembresia[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getMembresias();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((tmem: Tipomembresia) => {
        const searchStr = (tmem.idtmem + tmem.nombre + tmem.costo + tmem.clases).toLowerCase();
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
  sortData(data: Tipomembresia[]): Tipomembresia[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idtmem': [propertyA, propertyB] = [a.idtmem, b.idtmem]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'costo': [propertyA, propertyB] = [a.costo, b.costo]; break;
        case 'clases': [propertyA, propertyB] = [a.clases, b.clases]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}

