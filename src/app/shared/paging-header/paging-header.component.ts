import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent {
  @Input() mode?: 'index' | 'paging' = 'paging';
  @Input() modeAmount?: 'less' | 'more' = 'less';
  @Input() pageNumber?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;
  @Input() index?: number;
  @Input() contentType?: string = 'works';
}
