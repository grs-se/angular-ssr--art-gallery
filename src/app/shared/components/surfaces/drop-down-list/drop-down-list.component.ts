import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { SlugPipe } from 'src/app/shared/pipes/slug.pipe';
import { AppConfigService } from '../../../../core/services/app-config.service';

type DropDownOption = {
  id?: number;
  name?: string;
  count?: number;
};

@Component({
  standalone: true,
  imports: [SlugPipe, RouterLink, RouterLinkActive],
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent<TData extends DropDownOption>
  implements OnInit
{
  @Output('onClick') onClick: EventEmitter<string> = new EventEmitter();
  @Input() data: TData[] = [];
  @Input() routeParams? = '';

  constructor(
    //public artworkService: ArtworkService,
    public appConfigService: AppConfigService,
    public route: ActivatedRoute,
  ) {
    //this.selectedItemId = this.route.snapshot.params[]
  }

  ngOnInit() {}

  emitClickEvent(event: any) {
    this.onClick.emit(event);
  }
}
