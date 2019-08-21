import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-perfildemo-component',
  templateUrl: './perfildemo-component.component.html',
  styleUrls: ['./perfildemo-component.component.css']
})
export class PerfildemoComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.x;

// Scrolling Effect

$(window).on("scroll", function() {
      if($(window).scrollTop()) {
            $('nav').addClass('black');
      }

      else {
            $('nav').removeClass('black');
      }
})
  }


   x(){
            $("nav ul").toggleClass("showing");
  }
}
