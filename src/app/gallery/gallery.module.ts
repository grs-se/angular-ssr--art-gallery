import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CoreModule } from '../core/core.module';
import { CustomRouteReuseStrategy } from '../core/utilities/custom-route-reuse-strategy';
import { SharedModule } from '../shared/shared.module';
import { ArchiveComponent } from './archive/archive.component';
import { CollectionOverviewComponent } from './collection-overview/collection-overview.component';
import { CollectionInformationComponent } from './components/collection-information/collection-information.component';
import { GalleryAsideComponent } from './components/gallery-aside/gallery-aside.component';
import { GalleryControlsComponent } from './components/gallery-controls/gallery-controls.component';
import { GalleryFooterComponent } from './components/gallery-footer/gallery-footer.component';
import { GalleryHeaderComponent } from './components/gallery-header/gallery-header.component';
//import { GridCardsV1Component } from './components/gallery-modes/grid-cards-v1/grid-cards-v1.component';
//import { GridCardsComponent } from './components/gallery-modes/grid-cards/grid-cards.component';
//import { GridImagesComponent } from './components/gallery-modes/grid-images/grid-images.component';
import { GridCardsComponent } from '../shared/components/data-display/cards/grid-cards/grid-cards.component';
import { GridGalleryCardsComponent } from '../shared/components/data-display/cards/grid-gallery-cards/grid-gallery-cards.component';
import { ButtonComponent } from '../shared/components/data-input/button/button.component';
import { SearchBoxComponent } from '../shared/components/data-input/search-box/search-box.component';
import { SortBoxComponent } from '../shared/components/data-input/sort-box/sort-box.component';
import { DropDownListComponent } from '../shared/components/surfaces/drop-down-list/drop-down-list.component';
import { GalleryAdvancedSearchFormComponent } from './components/gallery-advanced-search-form/gallery-advanced-search-form.component';
import { MasonryComponent } from './components/gallery-modes/masonry/masonry.component';
import { GallerySideNavComponent } from './components/gallery-side-nav/gallery-side-nav.component';
import { GalleryToolbarComponent } from './components/gallery-toolbar/gallery-toolbar.component';
import { ArtworkDetailsComponent } from './gallery-main/artwork-details/artwork-details.component';
import { ArtworkItemComponent } from './gallery-main/artwork-item/artwork-item.component';
import { GalleryMainComponent } from './gallery-main/gallery-main.component';
import { GalleryOverviewComponent } from './gallery-overview/gallery-overview.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SelectedWorkComponent } from './selected-work/selected-work.component';
//import { TooltipModule } from '../shared/components/tooltip/tooltip.module';

@NgModule({
  declarations: [
    GalleryComponent,
    ArtworkItemComponent,
    ArtworkDetailsComponent,
    MasonryComponent,
    //GridCardsComponent,
    //GridImagesComponent,
    //GridCardsV1Component,
    GalleryOverviewComponent,
    GalleryHeaderComponent,
    GalleryControlsComponent,
    GallerySideNavComponent,
    GalleryToolbarComponent,
    CollectionInformationComponent,
    GalleryAsideComponent,
    CollectionOverviewComponent,
    GalleryMainComponent,
    SelectedWorkComponent,
    ArchiveComponent,
    GalleryAdvancedSearchFormComponent,
    GalleryFooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GalleryRoutingModule,
    CoreModule,
    BreadcrumbModule,
    NgOptimizedImage,
    ButtonComponent,
    SearchBoxComponent,
    SortBoxComponent,
    GridGalleryCardsComponent,
    GridCardsComponent,
    DropDownListComponent,
    //TooltipModule
  ],
  exports: [
    /*GridCardsComponent*/
  ],
  //providers: [
  //  { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },

  //]
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
})
export class GalleryModule {}
