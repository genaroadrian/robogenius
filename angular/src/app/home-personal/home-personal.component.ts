import { Component, OnInit } from '@angular/core';
import {PersonalService} from '../services/personal.service';
import {HttpClient} from '@angular/common/http';
import {Personal} from '../interfaces/personal';
@Component({
  selector: 'app-home-personal',
  templateUrl: './home-personal.component.html',
  styleUrls: ['./home-personal.component.css']
})
export class HomePersonalComponent implements OnInit {
	
	API_ENDPOINT = 'http://localhost:8000/api';
	personal: Personal[];
  constructor(private personalService: PersonalService, private httpClient:HttpClient){
	httpClient.get(this.API_ENDPOINT + '/personal').subscribe((data: Personal[])=>{
		this.personal = data;
	});
  }
  
  ngOnInit() {
  }

}
