import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { ArtworkParams, SortOption } from '../shared/models/artworkParams';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  artworkParams = new ArtworkParams();
  //galleryRoutes: {
  //  collectionName: string;
  //  galleryName: string;
  //} = {
  //    collectionName: 'collection',
  //    galleryName: 'drawing',
  //  };
  getArtworksByCollection = true;
  getArtworksByCategory = false;
  allArtworksCount!: number;
  collectionInformationIsExpanded = true;
  galleryAsideIsEnabled = false;
  galleryAsideIsExpanded: boolean = false;
  imagePath: string = '';
  classificationIdRoutePaths:
    | 'categories'
    | 'collections'
    | 'selected-work'
    | 'archive' = 'categories';

  public sortOptions: SortOption[] = [
    //{ name: 'Alphabetical', value: 'name' },
    //{ name: 'Price: Low to high', value: 'priceAsc' },
    //{ name: 'Price: High to low', value: 'priceDesc' },
    { name: 'Oldest to newest', value: 'dateAsc' },
    { name: 'Newest to oldest', value: 'dateDesc' },
  ];

  //public locationSearchOptions: SortOption[] = [
  //  { name: 'London', value: 'london' },
  //  { name: 'Alton', value: '' },
  //];

  locationOptions: SortOption[] = [];
  //artworkParams: ArtworkParams;

  private currentCollection = new BehaviorSubject<number | null>(null);
  currentCollection$ = this.currentCollection.asObservable();
  urlParams$: Observable<{ [x: string]: any; }> = new Observable<{}>();
  navigationSubscription: any;
  //private _subscriptions: Subscription[] = [];

  constructor(
  ) {
    this.currentCollection.next(this.artworkParams.categoryId);
    this.galleryAsideIsExpanded = false;

  }

  public toggleCollectionInformation() {
    this.collectionInformationIsExpanded =
      !this.collectionInformationIsExpanded;
  }

  public expandCollectionInformation() {
    this.collectionInformationIsExpanded = true;
  }

  public collapseCollectionInformation() {
    this.collectionInformationIsExpanded = false;
  }

  public toggleGalleryAside() {
    this.galleryAsideIsExpanded = !this.galleryAsideIsExpanded;
  }

  public expandGalleryAside() {
    this.galleryAsideIsExpanded = true;
  }

  public collapseGalleryAside() {
    this.galleryAsideIsExpanded = false;
  }

  //public getGalleryParams() {
  //  if (this.activatedRoute.parent) {
  //    this.urlParams$ = combineLatest(
  //      this.activatedRoute.parent.url,
  //      this.activatedRoute.params,
  //      this.activatedRoute.queryParams,
  //      (parentParams, params, queryParams) => ({
  //        ...parentParams,
  //        ...params,
  //        ...queryParams,
  //      }),
  //    );
  //    // Subscribe to the single observable, giving us both
  //    let subscriber = this.urlParams$.subscribe((routeParams) => {
  //      // routeParams containing both the query and route params
  //      //console.log('this.urlParams$', this.urlParams$);
  //      //console.log('routeParms',routeParams[0] + '/' + routeParams['galleryId']);

  //      this.getArtworks(routeParams[0] + '/' + routeParams['galleryId']);
  //    });
  //    this._subscriptions.push(subscriber);
  //  }
  //}
}
