import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent {
  @Input() header: string = '';
  //@Output('uniqueValues') uniqueValues: EventEmitter<any> = new EventEmitter();
  //@Input() isAccordian = false;
  //isCollapsed = false;

  //toggleCollapse() {
  //  this.isCollapsed = !this.isCollapsed;
  //}

  


}
