import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog} from '@angular/material';
import { CodigosService } from 'src/app/services/codigos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { Codigos } from 'src/app/interfaces/codigos';
import { CodigosaddComponent } from '../codigosadd/codigosadd.component';
import { CodmodificarComponent } from '../codmodificar/codmodificar.component';
import { CoddeleteComponent } from '../coddelete/coddelete.component';







@Component({
  selector: 'app-codigohome',
  templateUrl: './codigohome.component.html',
  styleUrls: ['./codigohome.component.css']
})
export class CodigohomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  
  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'id',
    'codigo',
    'porcentaje',
    'lugar',
    'fecha',
    'icons'
  ];
  exampleDatabase: CodigosService| null;
  dataSource: ExampleDataSource | null;
  Dialogadd: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public codigosService: CodigosService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.getcodigos();
  }
  getcodigos(){
    this.exampleDatabase = new CodigosService(this.httpClient);
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
  
//Para notificaciones
showSuccessEdit() {
  this.toastr.successToastr('Registro actualizado','Exito!');
}

showErrorEdit() {
  this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
}
refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
refresh() {
    
  this.getcodigos();
}

  agregar(cod: Codigos) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(CodigosaddComponent, {
      data: {cod: cod }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==1){
        this.codigosService.ade(this.codigosService.getDialogData()).subscribe((data)=>{
          this.Dialogadd=data
          this.exampleDatabase.dataChange.value.push(this.Dialogadd);
         this.showSuccessEdit()
        this.refreshTable();
        },(error)=>{
          this.showErrorEdit()
        })
      }
    });
  }

  
   // Metodo para abrir el modal para modificar
   modifica(i: number, id: number, codigo: string, porcentaje: string, lugar: string, fecha: number, activo: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(CodmodificarComponent, {
      data: {id: id, codigo: codigo, porcentaje: porcentaje, lugar: lugar, fecha: fecha, activo: activo}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.codigosService.getDialogData();
        // And lastly refresh table
      }
      this.refresh();
    });
  }
  delete(i: number, id:number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(CoddeleteComponent, {
      data: {id: id}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id=== this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        if (i% this.paginator.pageSize == 0) {
          this.getcodigos();
        }
        this.refreshTable();
      }
    });
  }


//Para mostrar datos

}
export class ExampleDataSource extends DataSource<Codigos> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Codigos[] = [];
  renderedData: Codigos[] = [];

  constructor(public _exampleDatabase: CodigosService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Codigos[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getcodigoss();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((codigos: Codigos) => {
          const searchStr = (codigos.id + codigos.codigo + codigos.porcentaje + codigos.lugar + codigos.fecha + codigos.activo).toLowerCase();
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
  sortData(data:Codigos[]):Codigos[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'codigo': [propertyA, propertyB] = [a.codigo, b.codigo]; break;
        case 'porcentaje': [propertyA, propertyB] = [a.porcentaje, b.porcentaje]; break;
        case 'lugar': [propertyA, propertyB] = [a.lugar, b.lugar]; break;
        case 'fecha': [propertyA, propertyB] = [a.fecha, b.fecha]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
       
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
  

}
