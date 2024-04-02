import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() totalCount?: number;
  @Input() pageSize?: number;
  @Input() pageNumber?: number;
  @Output() pageChanged = new EventEmitter<number>();

  async onPagerChanged(event: any) {
    await this.pageChanged.emit(event.page);
    window.scroll({
      top: 0,
      left: 0,
      //behavior: 'smooth'
    });
  }
}
