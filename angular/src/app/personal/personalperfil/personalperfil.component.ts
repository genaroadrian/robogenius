import { Component, OnInit } from '@angular/core';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';

@Component({
  selector: 'app-personalperfil',
  templateUrl: './personalperfil.component.html',
  styleUrls: ['./personalperfil.component.css']
})
export class PersonalperfilComponent implements OnInit {

  datos: any;

  constructor(public personalPerfilService: PersonalperfilService) { }

  ngOnInit() {
    this.datos = this.personalPerfilService.returnPerfil()
  }


}
