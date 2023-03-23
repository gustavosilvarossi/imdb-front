import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  async basicNotify(title: string, icon: 'success' | 'error' | 'warning' = 'success', position: 'top-end' = 'top-end') {
    await Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
