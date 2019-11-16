import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomefclasesService } from 'src/app/services/homefclases.service';
import { MatDialog } from '@angular/material';
import { EditsesionesComponent } from 'src/app/sesiones/editsesiones/editsesiones.component';
import { SesionesService } from 'src/app/services/sesiones.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import * as jsPDF from 'jspdf';
import { DeletesesionesComponent } from 'src/app/sesiones/deletesesiones/deletesesiones.component';
import { DceditComponent } from 'src/app/detalleclases/dcedit/dcedit.component';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent implements OnInit {

  aC = []
  sAC = []
  herra = []

  detalleClases: any
  folio: string
  planeaciones: any
  sesiones: any
  fecha: any
  plan: any
  barra: string = 'none'

  // tabs es la variable para pintar las tabs
  tabs = ['Clase 1', 'Clase 2', 'Clase 3'];
  selected = new FormControl(0);


  constructor(public homefclasesService: HomefclasesService, public dialog: MatDialog,
    public sesionesService: SesionesService, public notificationsService: NotificationsService,
    public moduloService: ModuloService) { }

  ngOnInit() {
    this.getData()
  }

  showBarra() {
    this.barra = ''
  }

  hideBarra() {
    this.barra = 'none'
  }

  getData() {
    this.plan = this.homefclasesService.returnData()
    this.homefclasesService.getDataSesion(this.homefclasesService.returnData()).subscribe((data) => {

      let datos: any
      datos = data
      this.detalleClases = datos[0]
      this.folio = this.detalleClases[0].folio
      this.planeaciones = datos[1]
      this.planeaciones = this.planeaciones[0]
      this.sesiones = datos[2]
      this.fecha = this.planeaciones.fecha
      this.fecha = new Date(this.fecha + 'T00:00:00')
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      this.fecha = this.fecha.toLocaleDateString("es-ES", options)

    })
  }

  editSes(idsesion, nombre, objetivo, apren_clave,
    introduccion, contenido, desarrollo, mat_necesario, ice_break,
    descanso, cierre, i) {
    const dialogRef = this.dialog.open(EditsesionesComponent, {
      data: {
        idsesion: idsesion, nombre: nombre, objetivo: objetivo, apren_clave: apren_clave, introduccion: introduccion, ice_break: ice_break, contenido: contenido, desarrollo: desarrollo, mat_necesario: mat_necesario, descanso: descanso,
        cierre: cierre
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.sesionesService.put(this.sesionesService.getDialogData()).subscribe((data) => {
          this.sesiones[i] = this.sesionesService.getDialogData()
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

  deleteSesion(id, nombre, i) {
    const dialogRef = this.dialog.open(DeletesesionesComponent, {
      data: { nombre: nombre }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.showBarra()
        this.sesionesService.delete(id).subscribe((data) => {
          this.sesiones.splice(i, 1)
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

  editDetalle() {
    let areac = []
    let subac = []
    let herramientas = []
    let n: string = ''
    this.detalleClases.forEach(function (element, index, array) {
      if (element.idac != null) {
        n = '' + element.idac + ''
        areac.push(n)
      }

      if (element.idsac != null) {
        n = '' + element.idsac + ''
        subac.push(n)
      }

      if (element.idherra != null) {
        n = '' + element.idherra + ''
        herramientas.push(n)
      }
    });

    const dialogRef = this.dialog.open(DceditComponent, {
      data: {
        ac: areac, subac: subac, herra: herramientas, idn: this.planeaciones.idn, idg: this.planeaciones.idg,
        idt: this.planeaciones.idt, ids: this.planeaciones.ids
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        let extras = this.moduloService.retExt()
        let folio = this.folio

        let data = []
        data.push(this.moduloService.getDialogData())
        data.push(this.moduloService.getPlan())
        this.moduloService.editDC(data, folio).subscribe((data) => {
          this.detalleClases = data
          this.plan.g = extras.grado
          this.plan.n = extras.nivel
          this.plan.ntema = extras.tema
          this.plan.nt = extras.subtema
          this.notificationsService.showSuccessEdit()
          this.hideBarra()
        }, (error) => {
          this.notificationsService.showError()
          this.hideBarra()
        })
      }
    })
  }

  pdf(info){
    
    let docs = new jsPDF();



    var img = new Image()
    var rows1 = [];
    var rows2 = [];
    var rows3 = [];
    img.src = 'assets/images/logola.png'
    docs.addImage(img, 'png', 159,4, 40,10)
    docs.setFontSize(14);
    docs.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    docs.setFontType("normal");
    docs.text(10,30, 'Tema: ' + this.plan.ntema );
    docs.text(10,40, 'Subtema: ' + this.plan.nt);
    docs.setFontSize(12);
    docs.text(10,60, 'Nivel: ' + this.plan.n );
    docs.text(170,60, 'Grado: ' + this.plan.g );
    docs.setFontSize(10);
    docs.text(10,10, 'Folio: ' + this.folio);
    docs.text(74,20,'*Clase recomendada para '+this.plan.no_alu+ ' alumnos')
    docs.setFontSize(12);
    docs.text(10,80, 'Area del Conocimiento: ');
    docs.setDrawColor(255, 0, 0);
    docs.line(10,82, 60, 82);
    docs.setFontSize(10);

    let l = 87;
    this.detalleClases.forEach(function(element,index){
      
      if(element.ac!=null){
        var temp = [element.ac];
        rows1.push(temp);
      docs.text(14,l,"*" + rows1[index])
      l=l+4;

      }

      
    }); 
    docs.setFontSize(12);

    docs.text(90,80, 'Sub-area del Conocimiento: ');
    docs.setDrawColor(255, 0, 0);
    docs.line(90,82,145, 82);
    docs.setFontSize(10);

    let sac = 87;
    this.detalleClases.forEach(function(element,index){
      if(element.sac!=null){
        var s = [element.sac];
        rows2.push(s);
      docs.text(94,sac,"*" + rows2[index])
      sac=sac+4;

      }

      
    }); 

    docs.setFontSize(12);

    docs.text(174,80, 'Herramientas: ');
    docs.setFontSize(10);
    docs.setDrawColor(255, 0, 0);

    docs.line(172,82,204,82);

    let x = 87;
    this.detalleClases.forEach(function(element,index){
      if(element.h!=null){
        var s = [element.h];
        rows3.push(s);
      docs.text(181,x,"*" + rows3[index])
      x=x+4;

      }

      
    }); 
    docs.setFontSize(13);
    docs.text(64,100, 'Nombre de la session: ' + info.nombre);
    docs.text(74,110, 'Objetivo: ' + info.objetivo);
    docs.setFontSize(12);
 
    var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=210;  // width of A4 in mm
	var paragraph="Introduccion: "+info.introduccion;
	var paragraph1="Desarrollo: "+info.desarrollo;
	var paragraph2="Contenido: "+info.contenido;
  var paragraph3="Material: "+info.mat_necesario;
	var paragraph4="Ice Break: "+info.ice_break;
	var paragraph7="Descanso: "+info.descanso;
	var paragraph8="Cierre: "+info.cierre;
		
   var lines =docs.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));
   var lines1 =docs.splitTextToSize(paragraph1, (pdfInMM-lMargin-rMargin));
   var lines2 =docs.splitTextToSize(paragraph2, (pdfInMM-lMargin-rMargin));
   var lines3 =docs.splitTextToSize(paragraph3, (pdfInMM-lMargin-rMargin));
   var lines4 =docs.splitTextToSize(paragraph4, (pdfInMM-lMargin-rMargin));
   var lines7 =docs.splitTextToSize(paragraph7, (pdfInMM-lMargin-rMargin));
   var lines8 =docs.splitTextToSize(paragraph8, (pdfInMM-lMargin-rMargin));

   docs.text(17,120, 'Aprendizaje clave: ' + info.apren_clave);

	docs.text(lMargin,140,lines);
	docs.text(lMargin,180,lines1);
	docs.text(lMargin,220,lines2);
  docs.text(lMargin,260,lines3);  
  docs.addPage();         
  docs.text(lMargin,20,lines4); 
	docs.text(lMargin,60,lines7);    
	docs.text(lMargin,90,lines8);    
   

    // docs.text(17,170, 'Ice break: ' + info.ice_break);
    // docs.text(17,180, 'Descanso: ' + info.descanso);
    // docs.text(17,190, 'CIerre: ' + info.cierre);


  

    docs.save(info.nombre +'.pdf');

   }


  

}
