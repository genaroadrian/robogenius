import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }

  constructor(private uploadService: FileuploadService,private router:Router) { }

                  seleccionarArchivo(event) {
                    var files = event.target.files;
                    var file = files[0];
                    this.archivo.nombreArchivo = file.name;

                    if(files && file) {
                      var reader = new FileReader();
                      reader.onload = this._handleReaderLoaded.bind(this);
                      reader.readAsBinaryString(file);
                    }
                  }

                  _handleReaderLoaded(readerEvent) {
                    var binaryString = readerEvent.target.result;
                    this.archivo.base64textString = btoa(binaryString);
                  }

                  upload() {
                    // console.log(this.archivo);
                    this.uploadService.uploadFile(this.archivo).subscribe(
                      datos => {
                        if(datos['resultado'] == 'OK') {
                          alert(datos['mensaje']);
                          this.router.navigate(['alumnos']);

                        }
                      }
                    );
                  }



  ngOnInit() {
  }

}
