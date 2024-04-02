import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public categorySelected: Subject<number> = new Subject<number>();
  public collectionSelected: Subject<number> = new Subject<number>();
  public sortSelected: Subject<number> = new Subject<number>();
  public galleryModeSelected: Subject<string> = new Subject<string>();
  // functionality same as above, different syntax
  ToggleCollectionInformation = new EventEmitter();
  NewSearchTermEvent = new EventEmitter();
  NewPageChangeEvent = new EventEmitter();
  NewResetEvent = new EventEmitter();

  constructor() { }

  //emitChildEvent(data: any) {
  //  this.childClickedEvent.next(data);
  //}

  //childEventListener() {
  //  return this.childClickedEvent.asObservable();
  //}
}
