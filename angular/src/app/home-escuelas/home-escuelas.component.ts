import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EscuelasService } from '../services/escuelas.service';
import { HttpClient } from '@angular/common/http';
import { Escuelas } from '../interfaces/escuelas';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { FormPersonalComponent } from '../form-personal/form-personal.component';

@Component({
  selector: 'app-home-escuelas',
  templateUrl: './home-escuelas.component.html',
  styleUrls: ['./home-escuelas.component.css']
})
export class HomeEscuelasComponent implements OnInit {

escuelas: Escuelas[];
  dataSource: MatTableDataSource<Escuelas>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private escuelasService: EscuelasService,
    private httpClient: HttpClient,
    public dialog: MatDialog) {

    this.getEscuelas()

    }


    getEscuelas(){
    this.escuelasService.get().subscribe((data: Escuelas[]) => {
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

  displayedColumns: string[] = [
    
    'idesc',
    'nombre',
    'representante',
    'direccion',
    'correo',
    'telefono',
    'icons'
    ];

  ngOnInit() {

  }

}
