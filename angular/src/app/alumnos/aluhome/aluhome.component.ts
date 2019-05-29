
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/interfaces/personal';
import {map} from 'rxjs/operators';
import { PeraddComponent } from '../peradd/peradd.component';
import { PerdeleteComponent } from '../perdelete/perdelete.component';
import { PereditComponent } from '../peredit/peredit.component';


@Component({
  selector: 'app-aluhome',
  templateUrl: './aluhome.component.html',
  styleUrls: ['./aluhome.component.css']
})
export class AluhomeComponent implements OnInit {

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public alumnoService: AlumnosService ) { }

  ngOnInit() {
  }

}
