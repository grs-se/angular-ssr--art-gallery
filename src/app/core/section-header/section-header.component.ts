import { Component, Input } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  @Input() height = '';
  @Input() prefix = '';
  @Input() fontSize = '';
  @Input() padding = '';
  @Input() wrapperStyles = '';

  // public = accessible inside component template
  constructor(public bcService: BreadcrumbService) {
    bcService.breadcrumbs$
  };
}
