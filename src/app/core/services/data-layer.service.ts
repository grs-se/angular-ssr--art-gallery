import { Injectable } from '@angular/core';
import { WindowReferenceService } from './window-reference.service';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  private window;

  constructor(private _windowRef: WindowReferenceService) {
    this.window = _windowRef.nativeWindow;
  }

  private pingHome(obj: Object) {
    if (obj) this.window.dataLayer.push(obj);
  }

  // list of all dataLayer methods
  logPageView(url: any) {
    const hit = {
      event: 'content-view',
      pageName: url
    };
    this.pingHome(hit);
  }

  logEvent(event: any, category: any, action: any, label: any) {
    const hit = {
      event,
      category,
      action,
      label
    };
    this.pingHome(hit);
  }

  logCustomDimensionTest(value: any) {
    const hit = {
      event: 'custom-dimension',
      value: value
    };
    this.pingHome(hit);
  }

  // .. add more custom methods as needed by your app.

}
