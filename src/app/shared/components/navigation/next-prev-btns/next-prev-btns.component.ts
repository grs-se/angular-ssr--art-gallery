import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-next-prev-btns',
  templateUrl: './next-prev-btns.component.html',
  styleUrls: ['./next-prev-btns.component.scss'],
})
export class NextPrevBtnsComponent {
  @Output('getPrev') emitGetPrev: EventEmitter<any> = new EventEmitter();
  @Output('getNext') emitGetNext: EventEmitter<any> = new EventEmitter();
  @Input() style = 1;
  @Input() totalCount?: number;
  @Input() index?: number;
  @Input() showCountAndIndex = false;

  getPrev(event: any) {
    this.emitGetPrev?.emit(event);
  }

  getNext(event: any) {
    this.emitGetNext?.emit(event);
  }

  constructor() {
    if (this.style === 1) {
    }
  }
}
