import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog} from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GradoService } from 'src/app/services/grado.service';
import { Grados } from 'src/app/interfaces/grados';
import { DataSource } from '@angular/cdk/table';
import { UpdategComponent } from '../updateg/updateg.component';
import { DeletegComponent } from '../deleteg/deleteg.component';




@Component({
  selector: 'app-homeg',
  templateUrl: './homeg.component.html',
  styleUrls: ['./homeg.component.css']
})
export class HomegComponent implements OnInit {
  

    // Columnas que se van a mostrar en la pagina
    displayedColumns: string[] = [
      'idg',
      'nombre',
     
      'icons'
    ];
     /*-------------------------------------------------------------------*/

    exampleDatabase: GradoService | null;
    dataSource: ExampleDataSource | null;
    barra= 'none';
    index: number;
    id: number;
    idg: number;

    /*---------------------------------------------------------------------*/
    constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public gradoService: GradoService,  public toastr: ToastrManager) { }
  /*---------------------------------------------------------------------*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef; 
  /*---------------------------------------------------------------------*/

  
  // Metodo para recibir los datos y asignar la tabla
  getgrados() {
    this.exampleDatabase = new GradoService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  

  
  /*---------------------------------------------------------------------*/

  ngOnInit() {
    this.getgrados();
     // Traducir los label de la tabla
     this.paginator._intl.itemsPerPageLabel = 'Registros por página';
     this.paginator._intl.nextPageLabel = 'Página siguiente';
     this.paginator._intl.previousPageLabel = 'Página anterior';
     this.paginator._intl.firstPageLabel = 'Primera página';
     this.paginator._intl.lastPageLabel = 'Ultima página';

  }
   /*---------------------------------------------------------------------*/
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
  
      this.getgrados();
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

    /*---------------------------------------------------------------------*/


    borrar(i: number, idg:number, nombre: string) {
      this.index = i;
      this.id = idg;
      const dialogRef = this.dialog.open(DeletegComponent, {
        data: {id: idg}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idg=== this.id);
          // for delete we use splice in order to remove single object from DataService
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          if (i% this.paginator.pageSize == 0) {
            this.getgrados();
          }
          this.refreshTable();
        }
      });
    }

 /*---------------------------------------------------------------------*/
    // Metodo para abrir el modal para modificar
    modi(i: number, idg: number, nombre: string) {
      this.id = idg;
      // index row is used just for debugging proposes and can be removed
      this.index = i;
      const dialogRef = this.dialog.open(UpdategComponent, {
        data: { idg: idg, nombre: nombre }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.showBarra()
          this.gradoService.put(this.gradoService.getDialogData()).subscribe((data) => {
            const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idg === this.id);
            // Then you update that record using data from dialogData (values you enetered)
            this.exampleDatabase.dataChange.value[foundIndex] = this.gradoService.getDialogData();
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
  }

    
  
   /*---------------------------------------------------------------------*/

    export class ExampleDataSource extends DataSource<Grados> {
      _filterChange = new BehaviorSubject('');
    
      get filter(): string {
        return this._filterChange.value;
      }
    
      set filter(filter: string) {
        this._filterChange.next(filter);
      }
    
      filteredData: Grados[] = [];
      renderedData: Grados[] = [];
    
      constructor(public _exampleDatabase: GradoService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
      }
    
      /** Connect function called by the table to retrieve one stream containing the data to render. */
      connect(): Observable<Grados[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
          this._exampleDatabase.dataChange,
          this._sort.sortChange,
          this._filterChange,
          this._paginator.page
        ];
    
        this._exampleDatabase.getgrados();
    
    
        return merge(...displayDataChanges).pipe(map(() => {
          // Filter data
          this.filteredData = this._exampleDatabase.data.slice().filter((grados: Grados) => {
            const searchStr = (grados.nombre+ grados.activo ).toLowerCase();
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
      sortData(data: Grados[]): Grados[] {
        if (!this._sort.active || this._sort.direction === '') {
          return data;
        }
    
        return data.sort((a, b) => {
          let propertyA: number | string = '';
          let propertyB: number | string = '';
    
          switch (this._sort.active) {
            case 'idg': [propertyA, propertyB] = [a.idg, b.idg]; break;
            case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;

            
          }
    
          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    
          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
      }
    

}
