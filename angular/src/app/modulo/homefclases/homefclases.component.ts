import { Component, OnInit } from '@angular/core';
import { HomefclasesService } from 'src/app/services/homefclases.service';

@Component({
  selector: 'app-homefclases',
  templateUrl: './homefclases.component.html',
  styleUrls: ['./homefclases.component.css']
})
export class HomefclasesComponent implements OnInit {

  result: any

  constructor(public homefclasesService: HomefclasesService) { }

  ngOnInit() {
    this.getFilter()
  }

  getFilter()
  {
    this.homefclasesService.getFilt().subscribe((data)=>{
      this.result = data
      console.log(data)
    },(error)=>{
      console.log(error)
    })
  }

  applyFilter()
  {
    this.result  = this.result.filter(element => element.folio == '111511161307')
    console.log(this.result.filter(element => element.folio == '111511161307'))
  }

}
