import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PersonalService } from '../services/personal.service';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../interfaces/personal';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { FormPersonalComponent } from '../form-personal/form-personal.component';


@Component({
  selector: 'app-home-personal',
  templateUrl: './home-personal.component.html',
  styleUrls: ['./home-personal.component.css'],
})



export class HomePersonalComponent implements OnInit {
  personal: Personal[];
  dataSource: MatTableDataSource<Personal>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private personalService: PersonalService,
    private httpClient: HttpClient,
    public dialog: MatDialog) {

    this.getPersonal()

  }

  getPersonal(){
    this.personalService.get().subscribe((data: Personal[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
      this.dataSource.sort = this.sort;
    });
  }


  icons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }

  displayedColumns: string[] = [
    
    'idper',
    'nombre',
    'apellidos',
    'usuario',
    'sexo',
    'fechaingreso',
    'horaentrada',
    'horasalida',
    'perfilprofesional',
    'especialidad',
    'tareasasignadas',
    'salariomensual',
    'icons'
   ];

  ngOnInit() {

  }

  persona: Personal =  {
    idper: null,
    nombre: null,
    apellidos: null,
    usuario: null,
    contra: null,
    fechanac: null,
    sexo: null,
    curp: null,
    estadocivil: null,
    domicilio: null,
    fechaingreso: null,
    horasalida: null,
    horaentrada: null,
    perfilprofesional: null,
    especialidad: null,
    salariomensual: null,
    tareasasignadas: null,
    idtper: null,
    activo: null
  };
  personas : Personal[];
  editing: boolean = false;
  onUpdate(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height= "50%";
    this.dialog.open(FormPersonalComponent, dialogConfig);
    console.log(row);
  }

 

  delete(idper){
    if(confirm('Estas seguro?')){
      this.personalService.delete(idper).subscribe((data)=>{
        console.log(data);
        alert('Eliminado con exito');
        this.getPersonal();
      },(error)=>{
        console.log(error);
      });
    }
  }
}

