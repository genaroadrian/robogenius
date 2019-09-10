import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { NivelService } from 'src/app/services/nivel.service';
import {DataSource} from '@angular/cdk/collections';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Niveles } from 'src/app/interfaces/niveles';
import { AddnivelComponent } from '../addnivel/addnivel.component';
import { UpdatenivelComponent } from '../updatenivel/updatenivel.component';
import { DeletenComponent } from '../deleten/deleten.component';


@Component({
  selector: 'app-nivelhome',
  templateUrl: './nivelhome.component.html',
  styleUrls: ['./nivelhome.component.css']
})
export class NivelhomeComponent implements OnInit {
  displayedColumns: string[] = [
    'idn',
    'nombre',
    'icons'
   ];
   /*-------------------------------------------------------------------*/
   barra = "none"
   exampleDatabase: NivelService | null;
   dataSource: ExampleDataSource | null;
   index: number;
   niveladd: any;
   id: number;
   /*---------------------------------------------------------------------*/

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild('filter') filter: ElementRef;

   /*-------------------------------------------------------------------*/

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public nivelService: NivelService, public toastr: ToastrManager) { }

    /*-------------------------------------------------------------------*/
    
  ngOnInit() {
    this.getNivel();
  }
   /*-------------------------------------------------------------------*/
   
  /* Mostrar la barra de carga */
  showBarra() {
    this.barra = ""
  }
  /* Ocultar la barra de carga */
  hideBarra() {
    this.barra = "none"
  }
  refresh() {
    this.getNivel();
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

 
  /*-------------------------------------------------------------------*/

   // Metodo para abrir el modal para agregar nuevo registro
 addnivel(niveles: Niveles) {
  // Abre la ventana modal
  const dialogRef = this.dialog.open(AddnivelComponent, {
    width: '600px',
    data: { niveles: niveles }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result == 1) {
      this.nivelService.agregar(this.nivelService.getDialogData()).subscribe((data) => {
        this.niveladd = data
        this.exampleDatabase.dataChange.value.push(this.niveladd);
        this.refreshTable()
        this.showSuccessAdd();
       
      }, (error) => {
        this.showError();
       
      });

    }
  });
}
/*-------------------------------------------------------------------*/

 // Metodo para abrir el modal para modificar
 modif(i: number, idn: number, nombre: string) {
  this.id = idn;
  // index row is used just for debugging proposes and can be removed
  this.index = i;
  const dialogRef = this.dialog.open(UpdatenivelComponent, {
    data: { idn: idn, nombre: nombre }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.showBarra()
      this.nivelService.put(this.nivelService.getDialogData()).subscribe((data) => {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idn === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.nivelService.getDialogData();
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

    /*---------------------------------------------------------------------*/


    borrar(i: number, idn:number, nombre: string) {
      this.index = i;
      this.id = idn;
      const dialogRef = this.dialog.open(DeletenComponent, {
        data: {id: idn}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idn=== this.id);
          // for delete we use splice in order to remove single object from DataService
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          if (i% this.paginator.pageSize == 0) {
            this.getNivel();
          }
          this.refreshTable();
        }
      });
    }

/*-------------------------------------------------------------------*/

  getNivel(){
    this.exampleDatabase = new NivelService(this.httpClient);
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
}

/*-------------------------------------------------------------------*/

export class ExampleDataSource extends DataSource<Niveles> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Niveles[] = [];
  renderedData: Niveles[] = [];

  constructor(public _exampleDatabase: NivelService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Niveles[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getNivel();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((nivel: Niveles) => {
        const searchStr = (nivel.nombre + nivel.activo).toLowerCase();
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
  sortData(data: Niveles[]): Niveles[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idn': [propertyA, propertyB] = [a.idn, b.idn]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}


 