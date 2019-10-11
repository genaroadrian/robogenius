import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent implements OnInit {
  // tabs es la variable para pintar las tabs
  tabs = ['Clase 1', 'Clase 2', 'Clase 3'];
    selected = new FormControl(0);


  constructor() { }

  ngOnInit() {

  }

}
