import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ModuloService } from 'src/app/services/modulo.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/services/notifications.service';
import {globalVar} from '../../services/global.service'


@Component({
  selector: 'app-filesmodal',
  templateUrl: './filesmodal.component.html',
  styleUrls: ['./filesmodal.component.css']
})
export class FilesmodalComponent implements OnInit {

  API_ENDPOINT = globalVar.url

  constructor(private http: HttpClient, public moduloService: ModuloService
    , public notifications: NotificationsService, public dialogRef: MatDialogRef<FilesmodalComponent>) { }

  ngOnInit() {
  }

  idSesion: number
  barraC: string = 'none'
  
  errors: Array<string> =[];
  response = [];

  files: File[] = [];
  progra: File[] = [];
  presen: File[] = [];
  plane: File[] = [];
  general: [];
  
  archivo = {
    nombre: null,
    ruta: null,
    tipo: null,
    base: null
  }
  
  base : string[];
 
  onSelectMa(event) {
    this.idSesion = this.moduloService.retIdSesion()
    //// console.log(event);
    this.files.push(...event.addedFiles);

  }
  
  onRemoveMa(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    // console.log(this.files);
  }

  onSelectPro(event) {
    this.idSesion = this.moduloService.retIdSesion()
    //// console.log(event);
    this.progra.push(...event.addedFiles);
    //this.saveFile(this.progra,'','','');
  }
  
  onRemovePro(event) {
    // console.log(event);
    this.progra.splice(this.progra.indexOf(event), 1);
    // console.log(this.progra);
  }

  onSelectPre(event) {
    this.idSesion = this.moduloService.retIdSesion()
    //// console.log(event);
    this.presen.push(...event.addedFiles);
    //this.saveFile(this.presen,'','','');
  }
  
  onRemovePre(event) {
    // console.log(event);
    this.presen.splice(this.presen.indexOf(event), 1);
    // console.log(this.presen);
  }

  onSelectPla(event) {
    this.idSesion = this.moduloService.retIdSesion()
    //// console.log(event);
    this.plane.push(...event.addedFiles);
    //this.saveFile(this.plane,'','','');
  }
  
  onRemovePla(event) {
    // console.log(event);
    this.plane.splice(this.plane.indexOf(event), 1);
    // console.log(this.plane);
  }

  saveFile(){
    
    // console.log(this.idSesion)
    this.barraC = ''
    var f = this.saveFiles(this.files,1) ? this.saveFiles(this.files,1) : '';
    var p = this.saveFiles(this.progra,2) ? this.saveFiles(this.progra,2): '';
    var pr = this.saveFiles(this.presen,3) ? this.saveFiles(this.presen,3) : '';
    var pl = this.saveFiles(this.plane,4) ? this.saveFiles(this.plane,4) : '';

    const requestArray = []; 
    if(f != ''){

      const request1 = this.http.post(this.API_ENDPOINT+'/files', f);

      requestArray.push(request1);
    }

    if(p != ''){
      // console.log(p)
      const request2 = this.http.post(this.API_ENDPOINT+'/files', p);
      requestArray.push(request2);
    }
    if(pr != ''){
      const request3 = this.http.post(this.API_ENDPOINT+'/files', pr);
      requestArray.push(request3);
    }
    if(pl != ''){
      const request4 = this.http.post(this.API_ENDPOINT+'/files', pl);
      requestArray.push(request4);
    }
    
    forkJoin(requestArray).subscribe(results => {
      this.barraC = 'none'
      this.notifications.showSuccessAdd()
      this.dialogRef.close()
      // console.log(results);
      this.response = results;
      this.response.forEach(element => {
        // console.log(element.id);
        var all = element.id;
        if(all.length > 1){
          all.forEach(el => {
            // console.log(el);
          });
        }
      });
    },(error)=>{
      this.barraC = 'none'
      // console.log(error)
      this.notifications.showError()
    });
  }

  uploadFile(data: FormData): Observable<any> {
    // console.log(data);
    const headers = new HttpHeaders({"Content-Type":"application/json;multipart/form-data"});
    return this.http.post<any>(this.API_ENDPOINT+'/files', data,{headers: headers});
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    // console.log(btoa(binaryString));
    this.archivo.ruta = btoa(binaryString);
       
   }

   saveFiles(files,idt){
           
    if (files.length > 0) {
          let formData: FormData = new FormData();
          for (var j = 0; j < files.length; j++) {
              formData.append("file[]", files[j], files[j].name);
              formData.append("idt", idt);
              formData.append("ids", ""+this.idSesion+"")
          }
          return formData;
      } 
  }

   fileService(files): Observable<any> {
    // console.log(files);
    const headers = new HttpHeaders({"Content-Type":"application/json;multipart/form-data"});
    return this.http.post<any>(this.API_ENDPOINT+'/files', files);

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
