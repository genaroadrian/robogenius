import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubareacService } from 'src/app/services/subareac.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'src/app/services/notifications.service';
import { HttpClient } from '@angular/common/http';
import { fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Subareac } from 'src/app/interfaces/subareac';
import { map } from 'rxjs/operators';
import { SacaddComponent } from '../sacadd/sacadd.component';
import { SaceditComponent } from '../sacedit/sacedit.component';
import { SacdeleteComponent } from '../sacdelete/sacdelete.component';
import { spinner } from 'src/app/services/global.service';
import { noResults } from 'src/app/services/global.service';

@Component({
  selector: 'app-sachome',
  templateUrl: './sachome.component.html',
  styleUrls: ['./sachome.component.css']
})
export class SachomeComponent implements OnInit {
    spinner = spinner
  noResults = noResults

  id: number
  index: number

  displayedColumns: string[] = [
    'nombre',
    'icons',
  ];

  barra = "none"

  exampleDatabase: SubareacService | null;
  dataSource: ExampleDataSource | null;

  constructor(private httpClient: HttpClient ,public dialog: MatDialog, public subareaService: SubareacService, 
    public notificationsService: NotificationsService) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  getSubareas()
  {
    this.exampleDatabase = new SubareacService(this.httpClient)
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
    this.getSubareas()

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

    this.getSubareas();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addNew()
  {
    let subarea: Subareac
  
    const dialogRef = this.dialog.open(SacaddComponent,{
      data: {dubarea: subarea}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
      {
        console.log(this.subareaService.getDialogData())
        // this.showBarra()
        // this.subareaService.add(this.subareaService.getDialogData()).subscribe((data)=>{
        //   let subareaAdd: any = data
        //   this.exampleDatabase.dataChange.value.push(subareaAdd)
        //   this.refreshTable()
        //   this.notificationsService.showSuccessAdd()
        //   this.hideBarra()
        // },(error)=>{
        //   this.notificationsService.showError()
        //   this.hideBarra()

        // })
      }
    })
  }

  onUpdate(i:number, idsac: number, nombre: string)
  {
    this.id = idsac
    this.index = i
    const dialogRef = this.dialog.open(SaceditComponent,{
      data: {idsac: idsac, nombre:nombre}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
      {
        this.showBarra()
        this.subareaService.put(this.subareaService.getDialogData()).subscribe((data)=>{
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idsac === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.subareaService.getDialogData()
          // And lastly refresh table
          this.refreshTable()
          this.hideBarra()
          this.notificationsService.showSuccessEdit()
        },(error)=>{
          this.notificationsService.showError()
          console.log(error)
          this.hideBarra()
        })
      }
    })
  }

  delete(i: number, idsac: number, nombre: string)
  {
    this.index = i
    this.id = idsac
    const dialogRef = this.dialog.open(SacdeleteComponent,{
      data: {idsac: idsac, nombre: nombre}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
      {
        this.showBarra()
        this.subareaService.detele(this.id).subscribe((data)=>{
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idsac === this.id);
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable()
          this.notificationsService.showSuccessDelete()
          this.hideBarra()
        },(error)=>{
          this.hideBarra()
          this.notificationsService.showError()
        })
      }
    })
  }

}



export class ExampleDataSource extends DataSource<Subareac> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
    
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Subareac[] = [];
  renderedData: Subareac[] = [];

  constructor(public _exampleDatabase: SubareacService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subareac[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getSubareas();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((subarea: Subareac) => {
        const searchStr = (subarea.nombre).toLowerCase();
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
  sortData(data: Subareac[]): Subareac[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idesc': [propertyA, propertyB] = [a.idsac, b.idsac]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
