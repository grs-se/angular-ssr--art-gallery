import { Component, Input } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { AppConfigService } from '../../../core/services/app-config.service';
import { BreakpointsService } from '../../../core/services/breakpoints.service';
import { EventService } from '../../../core/services/event.service';
import { SideNavService } from '../../../core/services/side-nav.service';
import { ButtonComponent } from '../../../shared/components/data-input/button/button.component';
import {
  ArtworkParams,
  SortOption,
} from '../../../shared/models/artworkParams';
import { ArtworkCategory } from '../../../shared/models/category';
import { ArtworkCollection } from '../../../shared/models/collection';
import { GalleryService } from '../../gallery.service';
import { ArtworkService } from '../../../core/services/artwork.service';

@Component({
  //imports: [ButtonComponent],
  selector: 'app-gallery-side-nav',
  templateUrl: './gallery-side-nav.component.html',
  styleUrls: ['./gallery-side-nav.component.scss'],
})
export class GallerySideNavComponent {
  @Input() categories: ArtworkCategory[] = [];
  @Input() collections: ArtworkCollection[] = [];
  @Input() totalCount: number = 0;
  @Input() showCategories = true;
  @Input() showCollections = false;

  artworkParams: ArtworkParams;
  sortOptions: SortOption[];
  // Component State
  isCollapsed = false;

  constructor(
    public galleryService: GalleryService,
    public artworkService: ArtworkService,
    private eventService: EventService,
    public sidenavService: SideNavService,
    public breakpointsService: BreakpointsService,
    public appConfigService: AppConfigService,
    public accountService: AccountService,
  ) {
    this.artworkParams = artworkService.getArtworkParams();
    this.sortOptions = this.galleryService.sortOptions;
  }

  onPageChange(event: any) {
    this.eventService.NewPageChangeEvent.next(event);
  }

  emitResetEvent() {
    // Reset search term
    this.eventService.NewSearchTermEvent.next('');
  }

  emitDoneEvent() {
    this.sidenavService.collapseGallerySidenav();
  }

  onCategorySelected(event: any) {
    this.eventService.categorySelected.next(event);
  }

  onCollectionSelected(event: any) {
    this.eventService.collectionSelected.next(event);
  }
}
