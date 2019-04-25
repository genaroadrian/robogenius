import { Component, OnInit } from '@angular/core';
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import {Tipopersonal} from '../interfaces/tipopersonal';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css']
})
export class FormPersonalComponent implements OnInit {
  tipopersonal: Tipopersonal[];
  constructor(private tipopersonalService: TipopersonalService, private httpClient: HttpClient) {
    this.tipopersonalService.get().subscribe((data: Tipopersonal[])=>{
      this.tipopersonal = data;
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
   }

  ngOnInit() {
  }

}
