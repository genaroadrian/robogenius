import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Padres } from 'src/app/interfaces/padres';
import { PadresService } from 'src/app/services/padres.service';
// import { ExampleDataSource } from 'src/app/escuelas/home/home.component';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { PadeditComponent } from '../padedit/padedit.component';
import { Dias } from 'src/app/interfaces/dias';
import { Horas } from 'src/app/interfaces/horas';

@Component({
  selector: 'app-padhome',
  templateUrl: './padhome.component.html',
  styleUrls: ['./padhome.component.css']
})
export class PadhomeComponent implements OnInit {

  private _allHoras: Observable<Horas[]>;
  SelCountryId:string="0"; 

  dia: Dias = {
    iddia: null,
    dia: null
  }


  constructor(public httpClient: HttpClient, public dialog: MatDialog,
    public padresService: PadresService) { }

    dias(dia)
  {
    this._allHoras=this.padresService.getHora(dia);  
  }

  ngOnInit() 
  {
  }

  
}