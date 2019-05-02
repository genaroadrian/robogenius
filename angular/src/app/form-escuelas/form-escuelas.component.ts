import { Component, OnInit, Input } from '@angular/core';
import { EscuelasService } from '../services/escuelas.service';
import { HttpClient } from '@angular/common/http';
import {Escuelas} from '../interfaces/escuelas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-escuelas',
  templateUrl: './form-escuelas.component.html',
  styleUrls: ['./form-escuelas.component.css']
})

export class FormEscuelasComponent implements OnInit {

  @Input() row: [];

  escuela: Escuelas =  {
    idesc: null,
    nombre: null,
    representante: null,
    direccion: null,
    telefono: null,
    correo: null,
    activo: null
  };

  id: any;
  editing: boolean = false;
  escuelas: Escuelas[];
  constructor( 
    private httpClient: HttpClient,
    private escuelasService : EscuelasService,
    private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    if(this.id){
      this.editing = true;
      this.escuelasService.get().subscribe((data: Escuelas[])=>{
        this.escuelas = data;
        this.escuela = this.escuelas.find((m)=>{
          return m.idesc == this.id;
        });
        console.log(this.escuela);
      }, (error)=>{
        console.log(error)
      });
    } else {
      this.editing = false;
    }
   }

  ngOnInit() {
  }

  // Metodo para guardar escuelas
  saveEscuelas() {
    if(this.editing){
      this.escuelasService.put(this.escuela).subscribe((data) =>{
        alert('Registro Actualizado');
        console.log(data);
      },(error)=>{
        console.log(error);
        alert('Ocurrio un error');
      });
    }else{
      this.escuelasService.save(this.escuela).subscribe((data) =>{
        alert('Registro guardado');
        console.log(data);
      },(error)=>{
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    
  }
}
