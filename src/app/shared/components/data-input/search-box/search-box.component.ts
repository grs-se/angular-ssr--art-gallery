import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @ViewChild('search') searchTerm?: ElementRef;
  //@Output('onSearch') onSearch: EventEmitter<string> = new EventEmitter();
  @Input() hasBtn = true;
  @Input() placeholder: string = 'Title';
  @Input() showSearchIcon: boolean = true;

  constructor(private evtSvc: EventService) {}

  //onClickEvent(event: any) {
  //  this.evtSvc.emitChildEvent(event);
  //  /*  this.onClick.emit(event);*/
  //}

  emitSearchEvent() {
    console.log(this.searchTerm?.nativeElement.value);
    this.evtSvc.NewSearchTermEvent.next(this.searchTerm?.nativeElement.value);
  }
}
