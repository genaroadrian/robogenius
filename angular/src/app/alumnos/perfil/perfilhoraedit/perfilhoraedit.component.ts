import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfilhoraedit',
  templateUrl: './perfilhoraedit.component.html',
  styleUrls: ['./perfilhoraedit.component.css']
})
export class PerfilhoraeditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PerfilhoraeditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public alumnosService: AlumnosService, 
    public toastr: ToastrManager, fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.data);
  }

}
