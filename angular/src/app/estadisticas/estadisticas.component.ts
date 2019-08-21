import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {GraficasService} from '../services/graficas.service';
import {Chart} from 'chart.js';
import { NgStyle } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria.service';
import { total } from 'src/app/interfaces/total';
import { analyzeAndValidateNgModules } from '@angular/compiler';


 @Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  @ViewChild('myCanvass') myCanvass: ElementRef;
  @ViewChild('myCanvasmes') myCanvasmes: ElementRef;
  @ViewChild('pastel') pastel: ElementRef;
  public context: CanvasRenderingContext2D;
  public contexts: CanvasRenderingContext2D; 
  public contextmes: CanvasRenderingContext2D; 
  public pasteles: CanvasRenderingContext2D; 
  selecteds: any;
  selecsemana: any;
  selecsemanaegresos: any;
  selecionado: any;
  selectmes: any;
  logmes: any
  totalmes:any; 
  pastelselectmes: any;
  pastellogmes: any
  asteltotalmes:any;
  selectmesegreso: any;
  logmesegreso: any
  totalmesegreso:any;
  chartmes:any= [];
  chartpastel:any= [];
  logs: any;
  logss:any;
  logsssemana:any;
  logsssemanaegresos:any;
  totales:any;
  totaless:any;
  totalessemana:any;
  totalessemanaegresos:any;
  chart:any= [];
  charts:any= [];
  sumaingre:total[];
  utilidad:any;
  mesingre:any;
  mesegre:any;
  utilidadres:any;
  utilidadrestan:any;
  sumaegre:total[];
  logutil:any;
  selectutil:any;
totalutil:any;


  constructor(private _graficas:GraficasService,
    public categoriaservice: CategoriaService) { }

  ngOnInit() {
      this._graficas.utilidadrestan()
      .subscribe(data=>{
        this.utilidadrestan=data;
      })
      this._graficas.mesingreso()
      .subscribe(data=>{
        this.mesingre=data;
      })
      this._graficas.mesegreso()
      .subscribe(data=>{
        this.mesegre=data;
      })
    this._graficas.utilidad()
    .subscribe(data=>{
      this.utilidad=data;
    })
    this.categoriaservice.sumaingreeso()
    .subscribe(data=>{
      this.sumaingre=data;
    })
    this.categoriaservice.sumaegreso()
    .subscribe(data=>{
      this.sumaegre=data;
    })

    var a = this._graficas.egresos()
    .subscribe(a=>{
      this.logss= a;

      this.selecionado = this.logss.map(a => a.total);
      this.totaless = this.selecionado;


      var temp_max=this.totaless;
    
    var x = this._graficas.ingresos()
    .subscribe(x=>{
      this.logs=x;
     
      this.selecteds = this.logs.map(y => y.total);
      this.totales = this.selecteds;


    
    var temp_min=this.totales;

        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
            type: 'bar',
            data: {
              labels: ['Finanzas del dia'],
              datasets: [
                { 
                  data: temp_max,
                  label:"Gastos del dia",
                  backgroundColor:"#F16C69",
                },
                { 
                  data: temp_min,
                  label:"Ganancias del dia",
                  backgroundColor:"#35A989"
                },
              ]
            },
            options: {
              title: {
                display: true,
                text: 'FINANZAS'
              },
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true,
                  ticks: {
                    min: 0,
                    max:20000,
                    stepSize: 1000
                }
                }],
              }
            }
          });
        });
  

      });

  
// ---------------------------------------------------semana------------------------------------------



var semanegresos = this._graficas.SemanaEgresos()
.subscribe(semanegresos=>{
  this.logsssemanaegresos= semanegresos;

  this.selecsemanaegresos = this.logsssemanaegresos.map(a => a.sumaegreso);
  this.totalessemanaegresos = this.selecsemanaegresos;


  var temp_min=this.totalessemanaegresos;


// falta poner el where en la consulta de laravel
  var semana = this._graficas.Semana()
  .subscribe(semana=>{
    this.logsssemana= semana;

    this.selecsemana = this.logsssemana.map(semana => semana.suma);
    this.totalessemana = this.selecsemana;

    var temp_max=this.totalessemana;

        this.contexts = (<HTMLCanvasElement>this.myCanvass.nativeElement).getContext('2d');
        this.charts = new Chart(this.contexts, {
            type: 'bar',
            data: {
              labels: ['Finanzas de la semana'],
              datasets: [
                { 
                  data: temp_min,
                  label:"Gastos de la semena",
                  backgroundColor:"#F16C69",
                },
                { 
                  data: temp_max,
                  label:"Ganancias de la semana",
                  backgroundColor:"#35A989"
                },
              ]
            },
            options: {
              title: {
                display: true,
                text: 'FINANZAS'
              },
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true,
                  ticks: {
                    min: 0,
                    max:20000,
                    stepSize: 1000
                }
                }],
              }
            }
          });
        });
      });
  
// ----------------------------mes-------------------------------------------------




var mesingreso = this._graficas.mesingreso()
.subscribe(mesingreso=>{
  this.logmes= mesingreso;

  this.selectmes = this.logmes.map(a => a.suma);
  this.totalmes = this.selectmes;


  var temp_max=this.totalmes;
  

var mesegreso  = this._graficas.mesegreso()
.subscribe(mesegreso=>{
  this.logmesegreso=mesegreso;
 
  this.selectmesegreso = this.logmesegreso.map(y => y.egreso);
  this.totalmesegreso = this.selectmesegreso;

var temp_min=this.totalmesegreso;

    this.contextmes = (<HTMLCanvasElement>this.myCanvasmes.nativeElement).getContext('2d');
    this.chartmes = new Chart(this.contextmes, {
        type: 'bar',
        data: {
          labels: ['Finanzas del mes'],
          datasets: [
            { 
              data: temp_min,
              label:"Gastos del mes",
              backgroundColor:"#F16C69",
            },
            { 
              data: temp_max,
              label:"Ganancias del mes",
              backgroundColor:"#35A989"
            },
          ]
        },
        options: {
          title: {
            display: true,
            text: 'FINANZAS'
          },
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                min: 0,
                max:30000,
                stepSize: 2000
            }
            }],
          }
        }
      });
    });


  });


// ----------------------------------grafica de pastel-------------------------------------------


// var graficautilidad = this._graficas.utilidad()
// .subscribe(mesingreso=>{
//   this.utilidad= mesingreso;

//   this.selectmes = this.logmes.map(a => a.suma);
//   this.totalmes = this.selectmes;
var graficautilidad = this._graficas.utilidad()
.subscribe(graficautilidad=>{

 
  this.logutil= graficautilidad;
  this.selectutil = this.logutil.map(a => a.utilidad);
  this.totalutil = this.selectutil;

var mesingreso = this._graficas.mesingreso()
.subscribe(mesingreso=>{
  this.logmes= mesingreso;

  this.selectmes = this.logmes.map(a => a.suma);
  this.totalmes = this.selectmes;


var mesegreso  = this._graficas.mesegreso()
.subscribe(mesegreso=>{
  this.logmesegreso=mesegreso;
 
  this.selectmesegreso = this.logmesegreso.map(y => y.egreso);
  this.totalmesegreso = this.selectmesegreso;

var temp_min=[this.totalmesegreso,this.totalmes,this.totalutil];

    this.pasteles = (<HTMLCanvasElement>this.pastel.nativeElement).getContext('2d');
    this.chartpastel = new Chart(this.pasteles, {
        type: 'doughnut',
        data: {
          labels: ['Egresos del mes','Ingresos del mes','Utilidad'],
          datasets: [
            { 
              data: temp_min,
              backgroundColor:["#F16C69","#35A989","#fec40f"]
            },
          ]
        }
      });
    });


  });
});

}

}




