import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { Herramientas } from 'src/app/interfaces/herramientas';
import { AddHerramientasComponent } from '../add-herramientas/add-herramientas.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UpdatehComponent } from '../updateh/updateh.component';

@Component({
  selector: 'app-home-herramientas',
  templateUrl: './home-herramientas.component.html',
  styleUrls: ['./home-herramientas.component.css']
})
export class HomeHerramientasComponent implements OnInit {

  barra = "none"
  addherramientas: any;
  index: number;
  id: number;

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'nombre',
    'icons'
  ];

  exampleDatabase: HerramientasService | null;
  dataSource: ExampleDataSource | null;




  
  constructor(public httpClient: HttpClient, public dialog: MatDialog, public herramientasService: HerramientasService, public notifications: NotificationsService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  showBarra() {
    this.barra = ""
  }
  
  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }
  
  // Metodo para refrescar la pagina
  refresh() {
  
    this.getHerramientas();
  }
  
  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  

  getHerramientas() {
    this.exampleDatabase = new HerramientasService(this.httpClient);
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
    this.getHerramientas();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
  
  }
  addH( herramientas: Herramientas){
    const dialogRef = this.dialog.open(AddHerramientasComponent, {
      data: { herramientas: herramientas }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.herramientasService.herramienta(this.herramientasService.getDialogData()).subscribe((data) => {
          this.addherramientas = data
          this.exampleDatabase.dataChange.value.push(this.addherramientas);
          this.refreshTable()
          this.notifications.showSuccessAdd()
          this.hideBarra()
        }, (error) => {
          this.notifications.showError();
          this.hideBarra()
        });

      }
    });
    
  }
   // Metodo para abrir el modal para modificar
   onUpdate(i: number, idherra: number, nombre: string) {
    this.id = idherra;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(UpdatehComponent, {
      data: { idherra: idherra, nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.herramientasService.put(this.herramientasService.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idherra === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.herramientasService.getDialogData();
          // And lastly refresh table
          this.refreshTable()
          this.hideBarra()
          this.notifications.showSuccessEdit()
        }, (error) => {
          this.notifications.showError()
          this.hideBarra()
        })

      }

    });
  }
}


// Metodo para abrir el modal para agrefar nuevo registro

 

  export class ExampleDataSource extends DataSource<Herramientas> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: Herramientas[] = [];
    renderedData: Herramientas[] = [];
  
    constructor(public _exampleDatabase: HerramientasService,
      public _paginator: MatPaginator,
      public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Herramientas[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this._exampleDatabase.getHerramientas();
  
  
      return merge(...displayDataChanges).pipe(map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((herramientas: Herramientas) => {
          const searchStr = (herramientas.nombre + herramientas.activo).toLowerCase();
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
    sortData(data: Herramientas[]): Herramientas[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
  
        switch (this._sort.active) {
          case 'idherra': [propertyA, propertyB] = [a.idherra, b.idherra]; break;
          case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  
}
