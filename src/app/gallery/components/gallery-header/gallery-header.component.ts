import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../../account/account.service';
import { AppConfigService } from '../../../core/services/app-config.service';
import { EventService } from '../../../core/services/event.service';
import { SideNavService } from '../../../core/services/side-nav.service';
import { TooltipPosition } from '../../../shared/components/data-display/tooltip/tooltip.enums';
import {
  ArtworkParams,
  SortOption,
} from '../../../shared/models/artworkParams';
import { GalleryService } from '../../gallery.service';

@Component({
  selector: 'app-gallery-header',
  templateUrl: './gallery-header.component.html',
  styleUrls: ['./gallery-header.component.scss'],
})
export class GalleryHeaderComponent {
  @Input() artworkParams?: ArtworkParams;
  @Input() totalCount: number = 0;
  @Input() showHeaderTitle: boolean = true;
  @Input() showNextPrevCollectionToggles: boolean = false;

  @Output('onNext') onNext: EventEmitter<string> = new EventEmitter();
  @Output('onPrev') onPrev: EventEmitter<string> = new EventEmitter();

  TooltipPosition: typeof TooltipPosition = TooltipPosition;
  sortOptions: SortOption[];

  constructor(
    public sidenavService: SideNavService,
    public galleryService: GalleryService,
    private eventService: EventService,
    public accountService: AccountService,
    public appConfigService: AppConfigService,
    public bcService: BreadcrumbService,
  ) {
    if (!this.artworkParams) {
      this.artworkParams = galleryService.artworkParams;
    }
    this.sortOptions = this.galleryService.sortOptions;
    bcService.breadcrumbs$;
  }

  toggleCollectionInformation(event?: any) {
    //this.eventService.ToggleCollectionInformation.next(event)
    this.galleryService.toggleCollectionInformation();
  }
  //@Input() collection?: Category;

  toggleInformation() {
    console.log('toggle info');
  }

  emitOnPrevEvent(event: any) {
    this.onPrev.next(event);
  }

  emitOnNextEvent(event: any) {
    this.onNext.next(event);
  }
}
