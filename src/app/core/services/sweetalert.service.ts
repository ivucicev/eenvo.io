import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  custom(title: string,text?:string,icon?: SweetAlertIcon): Promise<any> {
    const options: SweetAlertOptions = {
      title: title,
      showCancelButton: false,
      customClass:{
        confirmButton: 'btn btn-primary w-xs mt-2'
      },
      confirmButtonText: 'Ok',
    };
  
    if (icon) {
      options.icon = icon;
    }
    if (text) {
      options.text = text;
    }
  
    return Swal.fire(options);
  }
}
