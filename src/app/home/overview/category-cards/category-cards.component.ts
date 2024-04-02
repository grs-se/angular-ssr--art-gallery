import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtworkCategory } from '../../../shared/models/category';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.scss'],
})
export class CategoryCardsComponent {
  @Output('onClick') onClick: EventEmitter<number> = new EventEmitter();
  @Input() categories: ArtworkCategory[] = [];
  @Input() categoryCount: number = 0;
  constructor() {}

  emitClickEvent(event: number) {
    this.onClick.emit(event);
  }
}
