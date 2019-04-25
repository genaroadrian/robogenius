import { Component, OnInit, APP_ID } from '@angular/core';
import { TipopersonalService } from '../services/tipopersonal.service';
import { HttpClient } from '@angular/common/http';
import {Tipopersonal} from '../interfaces/tipopersonal';

@Component({
  selector: 'app-home-tipopersonal',
  templateUrl: './home-tipopersonal.component.html',
  styleUrls: ['./home-tipopersonal.component.css']
})
export class HomeTipopersonalComponent implements OnInit {
  tipopersonal: Tipopersonal[];
  constructor(private tipopersonalService: TipopersonalService, private httpClient: HttpClient) {
    // Mostrar el tipo de personal de la base de datos
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
