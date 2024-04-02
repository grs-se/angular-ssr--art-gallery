import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOption } from 'src/app/shared/models/artworkParams';
import { EventService } from '../../../../core/services/event.service';

@Component({
  standalone: true,
  selector: 'app-sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.scss'],
})
export class SortBoxComponent {
  @Output('sortSelected') sortSelected: EventEmitter<string> =
    new EventEmitter();
  // @Input() sortOptions: SortOption[] | string[] = [];
  @Input() sortOptions: SortOption[] = [];
  //@Input() sortOptions: SortOption[] | { text: string, value: number; }[] = [];
  @Input() sort: string = '';
  public isCollapsed: boolean = false;
  //SortOption!: SortOption;

  constructor(private evtSvc: EventService) {
  }

  //onClickEvent(event: any) {
  //  this.evtSvc.emitChildEvent(event);
  //  /*  this.onClick.emit(event);*/
  //}

  emitSortSelectedEvent(event: any) {
    this.evtSvc.sortSelected.next(event);
  }

  //public isSortOption(val: any): boolean {
  //  return typeof val === this.SortOption;
  //}
}
