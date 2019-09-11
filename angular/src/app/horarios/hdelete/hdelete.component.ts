import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-hdelete',
  templateUrl: './hdelete.component.html',
  styleUrls: ['./hdelete.component.css']
})
export class HdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public horariosService: HorariosService,
    public toastr: ToastrManager) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  confirmDelete(): void {
    
  //   this.horariosService.delete(this.data.id).subscribe((data)=>{
  //     this.horariosService.deleteIssue(this.data.id);
  //   },(error)=>{
    
  //   });
  // }
  }
}
