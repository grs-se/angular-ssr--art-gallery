import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {
  }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-clip-rotate',
      //bdColor: 'rgba(255,255,255,0.3)',
      bdColor: 'rgba(51,51,51,0.3)',
      //color: '#333333',
      color: '#fff',
      size: 'small',
      //template: "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif/>'",
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
