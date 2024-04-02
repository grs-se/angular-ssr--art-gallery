import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtworkCategory } from '../../../shared/models/category';

@Component({
  selector: 'app-overview-cards',
  templateUrl: './overview-cards.component.html',
  styleUrls: ['./overview-cards.component.scss'],
})
export class OverviewCardsComponent {
  @Output('onClick') onClick: EventEmitter<number> = new EventEmitter();
  @Input() categories: ArtworkCategory[] = [];
  @Input() categoryCount: number = 0;
  @Input() showTitle: boolean = true;
  constructor() {}

  emitClickEvent(event: number) {
    this.onClick.emit(event);
  }
}
