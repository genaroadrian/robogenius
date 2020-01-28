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

  displayedColumns: string[] = [
    'name',
    'age',
    'sex',
    'icons'
  ];

  exampleDatabase: ExampleHttpDatabase | null
  data: InactiveStudents[] = []
  
  
  resultLength = 0
  isLoadingResults = true
  isRateLimitReached = false

  dataSource: MatTableDataSource<InactiveStudents>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public alumnosService: AlumnosService) {
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this.alumnosService)

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 0)

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(()=>{
        this.isLoadingResults = true
        return this.exampleDatabase!.getAlumnos(
          this.sort.active, this.sort.direction, this.paginator.pageIndex)
      }), map(data =>{
        console.log('la data es')
        console.log(data)
        // let d: any = data
        this.isLoadingResults = false
        this.isRateLimitReached = false
        this.resultLength = data.total_count

        return data.items
      }),
      catchError(()=>{
        this.isLoadingResults = false
        this.isRateLimitReached = true
        return observableOf([])
      })
    ).subscribe(data => this.data = data)
  }


}

export interface Api
{
  items: InactiveStudents[],
  total_count: number
}


export class ExampleHttpDatabase
{
  constructor(public alumnosService: AlumnosService)
  {

  }

  async getAlumnos(sort: string, order: string, page: number)
  {
    return await this.alumnosService.fetchInactive().toPromise()
  }

}