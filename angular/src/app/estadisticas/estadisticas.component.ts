import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {GraficasService} from '../services/graficas.service';
import {Chart} from 'chart.js';
import { NgStyle } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria.service';
import { total } from 'src/app/interfaces/total';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { isNullOrUndefined } from 'util';


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
  utilidad2:any;
  mesingre:any;
  mesegre:any;
  utilidadres:any;
  utilidadrestan:any;
  sumaegre:total[];
  logutil:any;
  selectutil:any;
totalutil:any;
sucursal:any;
pendientesss:any;
pendientessss:any;
util:any;
ingresodelmes:any;


  constructor(private _graficas:GraficasService,
    public categoriaservice: CategoriaService) { }

  ngOnInit() {
    this.sucursal=localStorage.getItem('sucursal')

      this._graficas.utilidadrestan()
      
      .subscribe(data=>{
        this.utilidadrestan=data;
        // console.log(data)
        this.utilidadrestan=this.utilidadrestan.filter(d => d.idscu==this.sucursal);
        var total = 0;

        this.utilidadrestan.forEach(function(obj){
          if(obj.restante== null){
            obj.restante=0
          }
          total+=parseInt(obj.restante);
        })
        this.pendientesss=total;
      })
      // sssssssssssssssssssssssssssss      
      this._graficas.mesingreso()
      .subscribe(data=>{
        this.mesingre=data;
        this.mesingre=this.mesingre.filter(d => d.idscu==this.sucursal);
        var total13 = 0;
        this.mesingre.forEach(function(obj){
          if(obj.suma== null){
           obj.suma=0
          }
          total13+=parseInt(obj.suma);
        })
        this.ingresodelmes=total13
        this.util=this.ingresodelmes-this.pendientessss;

      })
      // sssssssssssssssssssssssssssss
      this._graficas.mesegreso()
      .subscribe(data=>{
        this.mesegre=data;
        this.mesegre=this.mesegre.filter(d => d.idscu==this.sucursal);
        var totals = 0;

        this.mesegre.forEach(function(obj){
          if(obj.monto== null){
           obj.monto=0
          }
          totals+=parseInt(obj.monto);
        })
        this.pendientessss=totals;
      this.util=this.ingresodelmes-this.pendientessss;

      })
      // ssssssssssssssssssssssssssss
    this._graficas.utilidad()
    // .subscribe(data=>{
    //   this.utilidad=data;
    //   this.utilidad2=data;
    //   this.utilidad=this.utilidad[0].filter(d => d.idscu==this.sucursal);
    //   this.utilidad2=this.utilidad2[1].filter(d => d.idscu==this.sucursal);
    //   var totals = 0;
    //   var totalss = 0;
    //   var result = 0;

    //   this.utilidad.forEach(function(obj){
    //     if(obj.monto== null){
    //      obj.monto=0
    //     }
    //     if(obj.suma== null){
    //       obj.suma=0
    //      }
    //     totals+=parseInt(obj.monto);
    //     totalss+=parseInt(obj.suma);
    //     result=totalss-totals

    //   })
      

    // })
      // sssssssssssssssssssssssssssss
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
      this.logss=this.logss.filter(d => d.idscu==this.sucursal)
      var diae = 0;
      
      this.logss = this.logss.map(a=>{
        if(a.monto == null){
          a.monto=0
         }
         diae+=a.monto;
      })
      var dians = diae.toString();
      var diacss = [dians, "0", "0"];
      this.selecionado = diacss
      this.totaless = this.selecionado;


      var temp_max=this.totaless;
    
    var x = this._graficas.ingresos()
    .subscribe(x=>{
      
      this.logs=x;

      this.logs=this.logs.filter(d => d.idscu==this.sucursal);

      var dia = 0;

      this.logs = this.logs.map(a=>{
        if(a.suma == null){
          a.suma=0
         }
         dia+=a.suma;
      })
      var dian = dia.toString();
      var diacs = [dian, "0", "0"];
      this.selecteds=diacs
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

  // // console.log(this.logsssemanaegresos)

  this.selecsemanaegresos=this.logsssemanaegresos.filter(d => d.idscu==this.sucursal);
  var semanae = 0;

  this.selecsemanaegresos = this.selecsemanaegresos.map(a=>{
    if(a.monto == null){
      a.monto=0
     }
     semanae+=a.monto;
  })
  var n = semanae.toString();
  var cars = [n, "0", "0"];
  this.selecsemanaegresos=cars
  this.totalessemanaegresos = this.selecsemanaegresos;
  // // console.log(this.totalessemanaegresos)


  var temp_min=this.totalessemanaegresos;


// falta poner el where en la consulta de laravel
  var semana = this._graficas.Semana()
  .subscribe(semana=>{
    this.logsssemana= semana;

    this.logsssemana=this.logsssemana.filter(d => d.idscu==this.sucursal);
    var nega = 0;

    this.selecsemana = this.logsssemana.map(a => {
      if(a.suma == null){
        a.suma=0
       }
       nega+=a.suma;

    });
    var aye = nega.toString();
    var mot = [aye, "0", "0"];
    this.selecsemana=mot
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
  this.logmes.filter(d => d.idscu==this.sucursal);

  this.selectmes = this.logmes.map(a => a.suma);
  // // console.log(this.selectmes)
  this.totalmes = this.selectmes;


  var temp_max=this.totalmes;
  

var mesegreso  = this._graficas.mesegreso()
.subscribe(mesegreso=>{
//   this.logmesegreso=mesegreso;
 
//   this.selectmesegreso = this.logmesegreso.map(y => y.egreso);
//   this.totalmesegreso = this.selectmesegreso;

// var temp_min=this.totalmesegreso;
//     // console.log(<HTMLCanvasElement>this.myCanvasmes);

//     this.contextmes = (<HTMLCanvasElement>this.myCanvasmes.nativeElement).getContext('2d');
//     this.chartmes = new Chart(this.contextmes, {
//         type: 'bar',
//         data: {
//           labels: ['Finanzas del mes'],
//           datasets: [
//             { 
//               data: temp_min,
//               label:"Gastos del mes",
//               backgroundColor:"#F16C69",
//             },
//             { 
//               data: temp_max,
//               label:"Ganancias del mes",
//               backgroundColor:"#35A989"
//             },
//           ]
//         },
//         options: {
//           title: {
//             display: true,
//             text: 'FINANZAS'
//           },
//           legend: {
//             display: true
//           },
//           scales: {
//             xAxes: [{
//               display: true
//             }],
//             yAxes: [{
//               display: true,
//               ticks: {
//                 min: 0,
//                 max:30000,
//                 stepSize: 2000
//             }
//             }],
//           }
//         }
//       });
    });


  });


// ----------------------------------grafica de pastel-------------------------------------------

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

var temp_min=[this.pendientessss,this.ingresodelmes,this.util];

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




