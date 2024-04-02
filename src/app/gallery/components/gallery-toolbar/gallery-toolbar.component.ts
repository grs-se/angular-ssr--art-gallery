import { Component, Input } from '@angular/core';
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
  selector: 'app-gallery-toolbar',
  templateUrl: './gallery-toolbar.component.html',
  styleUrls: ['./gallery-toolbar.component.scss'],
})
export class GalleryToolbarComponent {
  @Input() artworkParams?: ArtworkParams;
  @Input() totalCount: number = 0;
  TooltipPosition: typeof TooltipPosition = TooltipPosition;
  sortOptions: SortOption[];
  constructor(
    public sidenavService: SideNavService,
    public galleryService: GalleryService,
    private eventService: EventService,
    public accountService: AccountService,
    public appConfigService: AppConfigService,
  ) {
    if (!this.artworkParams) {
      this.artworkParams = galleryService.artworkParams;
    }
    this.sortOptions = this.galleryService.sortOptions;
  }

  toggleCollectionInformation(event?: any) {
    //this.eventService.ToggleCollectionInformation.next(event)
    this.galleryService.toggleCollectionInformation();
  }
}
