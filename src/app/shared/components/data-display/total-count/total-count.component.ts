import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent {
  @Input() pageNumber?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;
  @Input() index?: number;
}
