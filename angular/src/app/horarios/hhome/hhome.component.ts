import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import {HttpClient} from '@angular/common/http';
import { Horario } from 'src/app/interfaces/horario';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog} from '@angular/material';
import { HeditComponent } from '../hedit/hedit.component';
import { HaddComponent } from '../hadd/hadd.component';
import { HdeleteComponent } from '../hdelete/hdelete.component';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-hhome',
  templateUrl: './hhome.component.html',
  styleUrls: ['./hhome.component.css']
})
export class HhomeComponent implements OnInit {

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    // 'idh',
    'hora',
    // 'idd',
    'icons'
   ];

    /* Visibilidad de la barra de carga */
  barra = "none"


  horario: Horario[];
  hora:any;
  // dataSource: MatTableDataSource<Tipopersonal>;
  exampleDatabase: HorariosService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  index: number;
  id: number;
  HorariosService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public horariosService: HorariosService,public notifications:NotificationsService ) { }


  ngOnInit() 
  {
    // Llamado al metodo de getEscuelas
    this.getHorarios();

    // Traducir los label de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel= 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel= 'Primera página';
    this.paginator._intl.lastPageLabel= 'Ultima página';
  }


  // Metodo para refrescar la pagina
  refresh() {
    
    this.getHorarios();
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
    addNew(horario: Horario) {
      // Abre la ventana modal
      const dialogRef = this.dialog.open(HaddComponent, {
        data: { horario: horario }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.showBarra()
          this.horariosService.add(this.horariosService.getDialogData()).subscribe((data) => {
            this.hora = data
            this.exampleDatabase.dataChange.value.push(this.hora);
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




  // Metodo para recibir los datos y asignar la tabla
  getHorarios(){
    this.exampleDatabase = new HorariosService(this.httpClient);
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
  onUpdate(i: number, idh: number, hora: string, idd: number) {
    this.id = idh;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(HeditComponent, {
      data: {idh: idh, hora: hora, idd: idd}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.horariosService.put(this.horariosService.getDialogData()).subscribe((data) => {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idh === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.horariosService.getDialogData();
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

  delete(i: number, idh:number, id: number) {
    this.index = i;
    this.id = idh;
    const dialogRef = this.dialog.open(HdeleteComponent, {
      data: {id: idh}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.horariosService.delete(this.id).subscribe((data) => {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idh === this.id);
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

export class ExampleDataSource extends DataSource<Horario> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Horario[] = [];
  renderedData: Horario[] = [];

  constructor(public _exampleDatabase: HorariosService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Horario[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getHorarios();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((horario: Horario) => {
          const searchStr = (horario.hora).toLowerCase();
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
  sortData(data:Horario[]):Horario[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idh': [propertyA, propertyB] = [a.idh, b.idh]; break;
        case 'hora': [propertyA, propertyB] = [a.hora, b.hora]; break;
        // case 'idd': [propertyA, propertyB] = [a.idd, b.idd]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
