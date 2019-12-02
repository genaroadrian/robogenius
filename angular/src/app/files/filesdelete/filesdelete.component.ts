import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-filesdelete',
  templateUrl: './filesdelete.component.html',
  styleUrls: ['./filesdelete.component.css']
})
export class FilesdeleteComponent implements OnInit {

  constructor(public  dialogRef: MatDialogRef<FilesdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public filesService: ModuloService) { }

  ngOnInit() {
  }

  /* Cuando se da clic afuera del modal, se cierra */
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete()
  {
    this.filesService.deleteFile(this.data)
  }

}
