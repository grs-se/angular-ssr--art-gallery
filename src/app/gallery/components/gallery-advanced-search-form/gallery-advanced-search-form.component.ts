import { Component, Input, OnInit } from '@angular/core';
import { AppConfigService } from '../../../core/services/app-config.service';
//import { SearchBoxComponent } from '../../../shared/components/data-input/search-box/search-box.component';
//import { SortBoxComponent } from '../../../shared/components/data-input/sort-box/sort-box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { ArtworkCategory } from 'src/app/shared/models/category';
import { ArtworkService } from '../../../core/services/artwork.service';
import {
  AdvancedSearchFormValues,
  ArtworkParams,
  SortOption,
} from '../../../shared/models/artworkParams';
import { ArtworkCollection } from '../../../shared/models/collection';
import { ArtworkLocation } from '../../../shared/models/location';
import { GalleryService } from '../../gallery.service';

@Component({
  //standalone: true,
  //imports: [SortBoxComponent, SearchBoxComponent],
  selector: 'app-gallery-advanced-search-form',
  templateUrl: './gallery-advanced-search-form.component.html',
  styleUrls: ['./gallery-advanced-search-form.component.scss'],
})
export class GalleryAdvancedSearchFormComponent implements OnInit {
  // @Output('onLocationSelected') onLocationSelected: EventEmitter<any> =
  //   new EventEmitter();
  @Input() sortOptions1: SortOption[] = [];
  @Input() sortOptions2: SortOption[] = [];
  @Input() sortOptions3: SortOption[] = [];
  @Input() showMoreOptions?: boolean = true;
  @Input() locations: ArtworkLocation[] = [];
  @Input() collections: ArtworkCollection[] = [];
  @Input() categories: ArtworkCategory[] = [];
  @Input() mediums: ArtworkMedium[] = [];
  @Input() advancedSearchFormValues?: AdvancedSearchFormValues;
  //@Input() locations?: Location[];
  artworkParams: ArtworkParams;
  moreOptionsIsOpen: boolean = false;

  constructor(
    public artworkService: ArtworkService,
    public galleryService: GalleryService,
    public appConfigService: AppConfigService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.sortOptions1 = this.galleryService.sortOptions;
    this.artworkParams = this.artworkService.artworkParams;
    this.advancedSearchFormValues = new AdvancedSearchFormValues();
  }

  ngOnInit(): void {
    // console.log('cc', this.locations);
    // if (this.locations) {
    //   console.log(this.locations);
    //   this.mapToSortOptionsArray(this.locations, this.sortOptions2);
    // }

    this.mapToSortOptionsArray(this.collections, this.sortOptions3);

    console.log(this.sortOptions2);

    this.loadSearchFormValues();
  }

  public loadSearchFormValues() {
    // this.advancedSearchFormValues = {
    //   // categoryId,
    //   // tagsId,
    //   // typeId,
    //   // collectionId,
    // };
  }

  public toggleOptions() {
    this.moreOptionsIsOpen = !this.moreOptionsIsOpen;
  }

  mapToSortOptionsArray(array: any, sortOptions: SortOption[]) {
    array.forEach((x: any) => {
      var location: SortOption = {
        name: x.name,
        value: x.id.toString(),
        //value: x.id
      };
      /*console.log('location', location);*/
      sortOptions.push(location);
      console.log(sortOptions);
    });
    //console.log('ser', this.sortOptions2);
    //this.sortOptions2 = this.locations
  }

  // public emitLocationSelected(event: string) {
  //   this.onLocationSelected.next(event);
  // }

  public onDatesSelected() {}

  public onPriceSelected() {}

  // public onLocationSelected() {}

  // public onSubmit2(searchValues: AdvancedSearchFormValues) {
  //   const id = this._activatedRoute.snapshot.paramMap.get('id');
  //   if (this._activatedRoute.snapshot.url[0].path === 'gallery') {
  //     this._router.navigate([], {
  //       relativeTo: this._activatedRoute,

  //       // queryParams: {
  //       //   categoryId: '2',
  //       // },
  //       queryParamsHandling: 'merge',
  //       // preserve the existing query params in the route
  //       skipLocationChange: true,
  //       // do not trigger navigation
  //     });
  //     const search = {
  //       ...this.advancedSearchFormValues,
  //       ...searchValues,
  //       // price: +searchValues.price,
  //     };
  //     // if (id)
  //     // this.adminService
  //     //   .updateArtwork(updatedArtwork, +id)
  //     //   .subscribe((response: any) => {
  //     //     this.router.navigate(['/admin']);
  //     //   });
  //     // } else {
  //     //   const newArtwork = { ...artwork, price: +artwork.price };
  //     //   this.adminService.createArtwork(newArtwork).subscribe((response: any) => {
  //     //     this.router.navigate(['/admin']);
  //     //   });
  //   }
  // }
  // may have to rethink artworkService.getArtworks() to accomodate advanced search
  // public onMediumSelected(id: number) {
  //   const params = this.artworkService.getArtworkParams();
  //   params.mediumId = id;
  //   this.artworkService.setArtworkParams(params);
  //   this.artworkParams = params;
  //   // params.pageNumber = 1;
  //   // this.router.navigate(['categegoryId=', params.categoryId]);
  //   // this.getArtworks();
  //   // this._router.navigate([], {
  //   //   relativeTo: this._activatedRoute,
  //   //   queryParams: {
  //   //     categoryId: id,
  //   //   },
  //   //   queryParamsHandling: 'merge',
  //   //   // preserve the existing query params in the route
  //   //   skipLocationChange: true,
  //   //   // do not trigger navigation
  //   // });
  // }

  // public onCollectionSelected(id: number) {
  //   const params = this.artworkService.getArtworkParams();
  //   params.collectionId = id;
  //   this.artworkService.setArtworkParams(params);
  //   this.artworkParams = params;
  // }

  // public onCategorySelected(id: number) {
  //   const params = this.artworkService.getArtworkParams();
  //   params.categoryId = id;
  //   this.artworkService.setArtworkParams(params);
  //   this.artworkParams = params;
  // }

  // public onLocationSelected(id: number) {
  //   const params = this.artworkService.getArtworkParams();
  //   params.locationId = id;
  //   this.artworkService.setArtworkParams(params);
  //   this.artworkParams = params;
  // }
  // private navigateTo(
  //   params?: ArtworkParams,
  //   // category?: string,
  //   // collection?: string,
  //   // location?: string,
  //   // medium?: string,
  // ) {
  //   // changes the route without moving from the current view or
  //   // triggering a navigation event,
  //   this._router.navigate([], {
  //     relativeTo: this._activatedRoute,
  //     queryParams: {
  //       categoryId: '2',
  //     },
  //     queryParamsHandling: 'merge',
  //     // preserve the existing query params in the route
  //     skipLocationChange: true,
  //     // do not trigger navigation
  //   });
  // }

  public onSubmit(searchValues: AdvancedSearchFormValues) {
    // const params = this.artworkService.getArtworkParams();
    // //  params.mediumId = id;
    // params.mediumId = searchValues.artworkMediumId!;
    // console.log(params);
    // this.artworkService.setArtworkParams(params);
    // this.artworkParams = params;
    // this.navigateTo();
    // this.artworkParams.categoryId = searchValues.artworkCategoryId;

    const queryParams = {
      ...(searchValues.categoryId > 0 && {
        categoryId: searchValues.categoryId,
      }),
      ...(searchValues.mediumId > 0 && {
        mediumId: searchValues.mediumId,
      }),
      ...(searchValues.locationId > 0 && {
        locationId: searchValues.locationId,
      }),
      ...(searchValues.sort
        ? { sort: searchValues.sort }
        : { sort: this.advancedSearchFormValues?.sort }),
      ...(searchValues.pageSize
        ? { pageSize: searchValues.pageSize }
        : { pageSize: this.advancedSearchFormValues?.pageSize }),
      pageNumber: searchValues.pageNumber,
      search: searchValues.search,
    };

    // console.log('queryParams', queryParams);

    this._router.navigate(['gallery/search'], {
      // queryParams: this.artworkParams,
      queryParams: queryParams,
      // queryParamsHandling: 'merge',
    });

    // this.artworkService.
    // queryParams: {
    //   categoryId: this.artworkParams.categoryId,
    //   collectionId: this.artworkParams.collectionId,
    //   locationId: this.artworkParams.locationId,
    //   mediumId: this.artworkParams.mediumId,
    //   tagId: this.artworkParams.tagId,
    //   rating: this.artworkParams.rating,
    //   sort: this.artworkParams.sort,
    //   pageIndex: this.artworkParams.pageNumber,
    //   pageSize: this.artworkParams.pageSize,
    //   search: this.artworkParams.search,
    // },
    //   queryParams = {
    //     categoryId : searchValues.artworkCategoryId,
    //     mediumId: searchValues.artworkMediumId,
    //     locationId: searchValues.locationProducedId,
    // });
    // if (this._activatedRoute.snapshot.url[0].path === 'search') {
    //   this.advancedSearchFormValues = {
    //     // categoryId,
    //     // tagsId,
    //     // typeId,
    //     // collectionId,
    //   };

    // ...this.artwork,
    // ...artwork,
    // price: +artwork.price,
    //   const id = this.activatedRoute.snapshot.paramMap.get('id');
    //   if (id)
    //     this.adminService
    //       .updateArtwork(updatedArtwork, +id)
    //       .subscribe((response: any) => {
    //         this.router.navigate(['/admin']);
    //       });
    // } else {
    //   //this.uploadFile()
    //   const newArtwork = { ...artwork, price: +artwork.price };
    //   this.adminService.createArtwork(newArtwork).subscribe((response: any) => {
    //     this.router.navigate(['/admin']);
    //   });
    // }
    // }
  }
}
