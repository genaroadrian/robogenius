import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import {HttpClient} from '@angular/common/http';

import { MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { Alumnos } from 'src/app/interfaces/alumnos';
import {map} from 'rxjs/operators';

import { AludeletComponent } from '../aludelet/aludelet.component';
import { AluaddComponent } from '../aluadd/aluadd.component';
import { AlueditComponent } from '../aluedit/aluedit.component';




@Component({
  selector: 'app-aluhome',
  templateUrl: './aluhome.component.html',
  styleUrls: ['./aluhome.component.css']
})
export class AluhomeComponent implements OnInit {

  tableview = "none";
  
  // Columnas que se van a mostrar en la tabla
  displayedColumns: string[] = [
    'idalu',
    'nombre',
    'correo',
    'fechanac',
    'edad',
    'iddom',
    'alergias',
    'cronica',
    'medicacion',
    'otro',
    'sexo',
    'domicilio',
    'idpadre',
    'tel1cm',
    'tel2cm',
    'nomb1cm',
    'nomb2cm',
    'ruta',
    'evaluacion',
    'psw',
    'idgrupo',
    'idcursos',
    'idsuc',
    'icons'
   ];
   //  Declaracion de la interfaz de personal
  alumnos: Alumnos[];

  // Declaracion de el servicio de personal
  exampleDatabase: AlumnosService | null;

  // Los datos obtenidos se asignan a un datasource para que sean leidos por la tabla
  dataSource: ExampleDataSource | null;

  // Componentes para la paginacion y la barra de busqueda
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // Index de la tabla
  index: number;

  // ID de la tabla
  id: number;
  
  // Declaracion del servico de personal
  PersonalService: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public alumnosService: AlumnosService ) { }

  ngOnInit() 
  {
     // Llamado al metodo de que obtiene los datos
     this.getAlumnos();

     // Traducir los label de la tabla
     this.paginator._intl.itemsPerPageLabel = 'Registros por página';
     this.paginator._intl.nextPageLabel= 'Página siguiente';
     this.paginator._intl.previousPageLabel = 'Página anterior';
     this.paginator._intl.firstPageLabel= 'Primera página';
     this.paginator._intl.lastPageLabel= 'Ultima página';
  }
  // Metodo para refrescar la pagina
  refresh() {
    this.getAlumnos();
  }

  // Metodo para refrescar la paginación (not use)
  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // Metodo para abrir el modal para agrefar nuevo registro
  /* El componente que sera modal debera ser agregado en app.module.ts
  en la sección de entryComponents */
  addNew(alumnos: Alumnos) {
    const dialogRef = this.dialog.open(AluaddComponent, {
      data: {persalonal: alumnos }
    });
  }

    /*  Obtiene los datos de la base y se la asigna a el datasource y database example
  tambien se le asigna el filtro la barra de busqueda y la paginacion */
  public getAlumnos() {
    this.exampleDatabase = new AlumnosService(this.httpClient);
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

  delete(i:number, idper:number, nombre: string, apellidos:string){
    this.index = i;
    this.id = idper;
    const dialogRef = this.dialog.open(AludeletComponent, {
      data: {id: idper, nombre:nombre, apellidos:apellidos}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idalu === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }
  // Metodo para abrir el modal para modificar
  onUpdate(i: number, idper: number, nombre: string,
    apellidos: string, usuario: string, contra: string,
    fechanac: string, sexo: string, curp: string, estadocivil:string,
    domicilio: string, fechaingreso: string, horaentrada: string,
    horasalida: string, perfilprofesional: string, especialidad: string,
    tareasasignadas: string, salariomensual: number, idtper: number ) {
    // A la variable index se le asigna el [index] recibido con la variable [i]
    this.index = i;
    // Se le asigna a la variable [id] el valor recibido de la variable [idper]
    this.id = idper;
    const dialogRef = this.dialog.open(AlueditComponent, {
      // Anchura de el modal
      width: '60%',
      /* Al modal se le envia la variable data, que contiene los datos de el registro
      de la tabla que se va a modificar */
      data: 
      {
        idper: idper, nombre: nombre, apellidos: apellidos,
        usuario: usuario, contra: contra, fechanac: fechanac,
        sexo: sexo, curp: curp, estadocivil: estadocivil,
        domicilio: domicilio, fechaingreso: fechaingreso, horaentrada: horaentrada,
        horasalida: horasalida, perfilprofesional: perfilprofesional, especialidad: especialidad,
        tareasasignadas: tareasasignadas, salariomensual: salariomensual, idtper: idtper
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Se busca el registro en la variable [exampleDatabase] de la tbla
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idalu === this.id);
        // Se actualiza el dato, pero solo en la tabla, no en la base de datos
        this.exampleDatabase.dataChange.value[foundIndex] = this.alumnosService.getDialogData();
        // Se refresca la tabla
        this.refreshTable();
      }
    });
  }
}



// Exporta la clase del datasource (datos de la tabla) y les asigna paginacion filtro etc.

export class ExampleDataSource extends DataSource<Alumnos> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Alumnos[] = [];
  renderedData: Alumnos[] = [];

  constructor(public _exampleDatabase: AlumnosService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Alumnos[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAlumnos();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((alumnos: Alumnos) => {
          const searchStr = (alumnos.idalu + alumnos.nombre).toLowerCase();
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
  sortData(data: Alumnos[]):Alumnos[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idalu': [propertyA, propertyB] = [a.idalu, b.idalu]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'ruta': [propertyA, propertyB] = [a.ruta, b.ruta]; break;

        case 'activo': [propertyA, propertyB] = [a.activo, b.activo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  
}











