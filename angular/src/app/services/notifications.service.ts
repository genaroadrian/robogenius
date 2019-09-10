import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public toastr: ToastrManager) { }

  /* ------------------------------Notificaciones de CRUD------------------------------ */

    /* Mensaje de ADD */
  showSuccessAdd() {
    this.toastr.successToastr('Registro agregado', 'Exito!');
  }

  /* Mensaje de UPDATE */
  showSuccessEdit() {
    this.toastr.successToastr('Registro actualizado', 'Exito!');
  }

  /* Mensaje de DELETE */
  showSuccessDelete() {
    this.toastr.successToastr('Registro eliminado','Exito!');
  }

  /* Mensaje de ERROR */
  showError() {
    this.toastr.errorToastr('Ocurrio un error.', 'Oops!');
  }

  /* -----------------------------Notificaciones personalizadas----------------------------- */
  passwordChange()
  {
    this.toastr.successToastr('Contraseña restablecida','Exito!')
  }

    
}
