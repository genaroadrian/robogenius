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
import { FilesdeleteComponent } from 'src/app/files/filesdelete/filesdelete.component';
import { FilesComponent } from 'src/app/files/files.component';
import { FilesmodalComponent } from 'src/app/files/filesmodal/filesmodal.component';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent implements OnInit {

  aC = []
  sAC = []
  herra = []
  filesProgra
  files: any
  detalleClases: any
  folio: string
  planeaciones: any
  sesiones: any
  fecha: any
  plan: any = this.homefclasesService.returnData()
  barra: string = 'none'

  // tabs es la variable para pintar las tabs
  tabs : any
  selected = new FormControl(0);


  constructor(public homefclasesService: HomefclasesService, public dialog: MatDialog,
    public sesionesService: SesionesService, public notificationsService: NotificationsService,
    public moduloService: ModuloService) { }

  ngOnInit() {
    this.getData()
  }

  deleteFile(id, ruta, tipo){
    console.log(id)
    console.log(ruta)
    const dialogRef = this.dialog.open(FilesdeleteComponent, {
      data: { id: id, ruta: ruta, tipo: tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
        this.moduloService.deleteFile(this.moduloService.getDialogData()).subscribe((data)=>{
         console.log(data)
         this.notificationsService.showSuccessDelete()
         this.getData()
        },(error)=>{
          console.log(error)
          this.notificationsService.showError()
        })
      }
    });
  }

  showBarra() {
    this.barra = ''
  }

  hideBarra() {
    this.barra = 'none'
  }

  getArchivos() {

  }

  getFileName() {

  }

  numerate(s)
  {
    let nTab = []
    let i = 1
    s.forEach(element => {
      nTab.push("Clase "+i)
      i++
    });
    return nTab
  }

  getData() {
    this.homefclasesService.getDataSesion(this.plan).subscribe((data) => {
      
      console.log(data)
      let datos: any
      datos = data
      this.detalleClases = datos[0]
      this.folio = this.detalleClases[0].folio
      this.planeaciones = datos[1]
      this.planeaciones = this.planeaciones[0]
      this.sesiones = datos[2]
      this.tabs = this.numerate(this.sesiones)
      this.files = datos[3]
      this.files.forEach(element => {
        element.forEach(archivo => {

          let ruta = archivo.ruta
          let resto = ruta.split('_', 1)
          resto = resto + '_'
          let filename = ruta.split(resto)
          filename = filename[1]
          archivo.filename = filename
          let extension = filename.split('.').reverse()
          extension = extension[0]
          archivo.ext = extension
          let vPrev
          switch (extension) {
            case 'png':
              vPrev = 'png.png'
              break

            case 'pdf':
              vPrev = 'pdf.png'
              break

            case 'css':
              vPrev = 'css.png'
              break

            case 'csv':
              vPrev = 'csv.png'
              break

            case 'doc':
              vPrev = 'doc.png'
              break

            case 'docx':
              vPrev = 'doc.png'
              break

            case 'xls':
              vPrev = 'xls.png'
              break

            case 'xlsx':
              vPrev = 'xls.png'
              break

            case 'mp3':
              vPrev = 'mp3.png'
              break

            case 'html':
              vPrev = 'html.png'
              break

            case 'mp4':
              vPrev = 'mp4.png'
              break

            case 'avi':
              vPrev = 'avi.png'
              break

            case 'ppt':
              vPrev = 'ppt.png'
              break

            case 'pptx':
              vPrev = 'ppt.png'
              break

            case 'php':
              vPrev = 'php.png'
              break

            case 'jpg':
              vPrev = 'jpg.png'
              break

            case 'pgn':
              vPrev = 'png.png'
              break

            case 'py':
              vPrev = 'piton.png'
              break

            case 'txt':
              vPrev = 'txt.png'
              break

            case 'zip':
              vPrev = 'zip.png'
              break

            case 'rar':
              vPrev = 'zip.png'
              break

            default:
              vPrev = 'file.png'
              break
          }

          archivo.vprev = vPrev
          console.log(archivo)
        });
      });
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
          this. tabs = this.numerate(this.sesiones)
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

  // downloadFile(file)
  // {
  //   this.moduloService.download(file).subscribe(response=>{
  //     window.location.href = response.url;
  //   }),error => console.log('Error downloading the file'),
  //   () => console.info('File downloaded successfully');
  // }
  downloadFile(file) {
    this.moduloService.downloadFile(file).subscribe(response => {
			//let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			//const url= window.URL.createObjectURL(blob);
			//window.open(url);
			window.location.href = response.url;
			//fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
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

   newFiles(id)
   {
     console.log(id)
     this.moduloService.getIdSesion(id)
     const dialogRef = this.dialog.open(FilesmodalComponent,{
       data: {}
     })
     dialogRef.afterClosed().subscribe(result=>{
       console.log(result)
       if(result === 1)
       {
        this.getData()
        // this.notificationsService.showSuccessAdd()
       }
     })
   }


}
