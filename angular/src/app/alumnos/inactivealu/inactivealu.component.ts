import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { InactiveStudents, Alumnos } from 'src/app/interfaces/alumnos';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError, observeOn } from 'rxjs/operators';

@Component({
  selector: 'app-inactivealu',
  templateUrl: './inactivealu.component.html',
  styleUrls: ['./inactivealu.component.css']
})
export class InactivealuComponent implements AfterViewInit {

 
  constructor(public alumnosService: AlumnosService) {
  }

  ngAfterViewInit() {
    
  }


}
