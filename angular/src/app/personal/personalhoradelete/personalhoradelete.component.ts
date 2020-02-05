import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonalperfilService } from 'src/app/services/personalperfil.service';
import { DetallegruposService } from 'src/app/services/detallegrupos.service';

@Component({
  selector: 'app-personalhoradelete',
  templateUrl: './personalhoradelete.component.html',
  styleUrls: ['./personalhoradelete.component.css']
})
export class PersonalhoradeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PersonalhoradeleteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public personalPerfilService: PersonalperfilService,
    public detalleGruposService: DetallegruposService) { }

  ngOnInit() {
    // // console.log(this.data.id)
  }

  confirmDelete()
  {
    this.detalleGruposService.add(this.data.id)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
