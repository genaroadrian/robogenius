import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { HttpClient } from '@angular/common/http';
import { Escuelas } from 'src/app/interfaces/escuelas';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog} from '@angular/material';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TipomembresiaService } from 'src/app/services/tipomembresia.service';
import { spinner } from 'src/app/services/global.service';
import { noResults } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    spinner = spinner
  noResults = noResults

  // Columnas que se van a mostrar en la pagina
  displayedColumns: string[] = [
    'nombre',
    'representante',
    'direccion',
    'telefono',
    'correouno',
    'icons'
  ];

  /* Visibilidad de la barra de carga */
  barra = "none"

  /* Variables para la visualizacin y configuracion de las tablas */
  exampleDatabase: EscuelasService | null;
  dataSource: ExampleDataSource | null;

  /* Index de las tablas */
  index: number;
  /* ID de las tablas */
  id: number;
  /* Servicio de escuelas */
  EscuelasService: any;

  /* Variable para guardar los datos de add y update */
  escuelasAdd: any

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public escuelasService: EscuelasService, private router: Router, public toastr: ToastrManager,
    public notifications:NotificationsService, public tipomembresiaService: TipomembresiaService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // Metodo para recibir los datos y asignar la tabla
  getEscuelas() {
    this.exampleDatabase = new EscuelasService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    console.log(this.dataSource)
    fromEvent(this.filter.nativeElement, 'keyup')
    
      .subscribe(() => {
        console.log(this.dataSource)
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

  // Metodo para abrir el modal para agrefar nuevo registro
  addNew(escuelas: Escuelas) {
    // Abre la ventana modal
    const dialogRef = this.dialog.open(AddComponent, {
      data: { escuelas: escuelas }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.escuelasService.add(this.escuelasService.getDialogData()).subscribe((data) => {
          this.escuelasAdd = data
          this.exampleDatabase.dataChange.value.push(this.escuelasAdd);
          let membresia = this.escuelasService.getMembresiaData()
          membresia.idesc = this.escuelasAdd.idesc
          this.tipomembresiaService.add(membresia).subscribe((data)=>{
            console.log(data)
          },(error)=>{
            console.log(error)
          })
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

  viewProfile(i: number, idesc: number, nombre: string, representante: string, 
    direccion: string, telefono: number, correouno: string)
  {
    let data=  { idesc: idesc, nombre: nombre, representante: representante, direccion: direccion, telefono: telefono, correouno: correouno }
    // this.EscuelasService.profile(data)
    this.escuelasService.profile(data)
  }

  

  // Metodo para abrir el modal para modificar
  onUpdate(i: number, idesc: number, nombre: string, representante: string, direccion: string, telefono: number, correouno: string) {
    this.id = idesc;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditComponent, {
      data: { idesc: idesc, nombre: nombre, representante: representante, direccion: direccion, telefono: telefono, correouno: correouno }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.escuelasService.put(this.escuelasService.getDialogData()).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idesc === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.escuelasService.getDialogData();
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


  delete(i: number, idesc: number, nombre: string) {
    this.index = i;
    this.id = idesc;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: idesc, nombre: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showBarra()
        this.escuelasService.delete(this.id).subscribe((data) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idesc === this.id);
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

export class ExampleDataSource extends DataSource<Escuelas> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
    
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Escuelas[] = [];
  renderedData: Escuelas[] = [];

  constructor(public _exampleDatabase: EscuelasService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Escuelas[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getEscuelas();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((escuelas: Escuelas) => {
        const searchStr = (escuelas.idesc + escuelas.nombre + escuelas.representante + escuelas.direccion + escuelas.telefono + escuelas.correouno).toLowerCase();
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
  sortData(data: Escuelas[]): Escuelas[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idesc': [propertyA, propertyB] = [a.idesc, b.idesc]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'representante': [propertyA, propertyB] = [a.representante, b.representante]; break;
        case 'direccion': [propertyA, propertyB] = [a.direccion, b.direccion]; break;
        case 'telefono': [propertyA, propertyB] = [a.telefono, b.telefono]; break;
        case 'correouno': [propertyA, propertyB] = [a.correouno, b.correouno]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
