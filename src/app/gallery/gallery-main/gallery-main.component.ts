import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { NavigationService } from 'src/app/core/navigation/navigation.service';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { AccountService } from '../../account/account.service';
import { AppConfigService } from '../../core/services/app-config.service';
import { ArtworkService } from '../../core/services/artwork.service';
import { EventService } from '../../core/services/event.service';
import { ParamsService } from '../../core/services/params.service';
import { ResponsiveImageService } from '../../core/services/responsive-image.service';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkParams } from '../../shared/models/artworkParams';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkCollection } from '../../shared/models/collection';
import { ArtworkLocation } from '../../shared/models/location';
import { ArtworkTag } from '../../shared/models/tag';
import { ArtworkType } from '../../shared/models/type';
import { GalleryService } from '../gallery.service';
import Utils from './../../shared/utils/utils';

@Component({
  selector: 'app-gallery-main',
  templateUrl: './gallery-main.component.html',
  styleUrls: ['./gallery-main.component.scss'],
  providers: [ParamsService],
})
export class GalleryMainComponent implements OnInit, AfterViewInit {
  private urlParams$: Observable<Params> = new Observable<{}>();
  // private urlParams$: Observable<{ [x: string]: any }> = new Observable<{}>();
  private _subscriptions: Subscription[] = [];

  artworks: Artwork[] = [];
  selectedArtwork: Artwork;
  categories: ArtworkCategory[] = [];
  collections: ArtworkCollection[] = [];
  tags: ArtworkTag[] = [];
  types: ArtworkType[] = [];
  locations: ArtworkLocation[] = [];
  mediums: ArtworkMedium[] = [];
  artworkParams: ArtworkParams;
  //galleryMode: string = 'grid';
  totalCount = 0;
  searchTerm: string = '';
  currentCategory: number = 1;
  isPhonePortrait: boolean = true;
  currentCollection: number = 1;
  chosenCollectionIds: number[] = [5, 6];
  galleryMode: string = 'grid';

  // currentArtwork$: Observable<Artwork> = of(this.artworks[0]);
  // imagePath: string = '';
  // baseURL = '';
  // nextCat!: number;
  // prevCat!: number;
  // classificationId: string = 'categories';
  // navigationSubscription: any;

  constructor(
    public artworkService: ArtworkService,
    public galleryService: GalleryService,
    public accountService: AccountService,
    public appConfigService: AppConfigService,
    public breakpointObserver: BreakpointObserver,
    public navigationService: NavigationService,
    private evtSvc: EventService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responsiveImgService: ResponsiveImageService,
    private paramsService: ParamsService,
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content: 'temporary page description',
      },
      {
        name: 'keywords',
        content: 'temporary keywords',
      },
    ]);
    /*    name: "description", content: this.categories[this.currentCategory].description = !null ? this.categories[this.currentCategory].description! : 'page-content'*/
    //{
    //  name: "description", content: 'temporary page description';
    //},
    //{
    //  name: "keywords", content: this.categories[this.currentCategory].shortDescription!;
    //},

    this.artworkParams = artworkService.getArtworkParams();

    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletLandscape])
      .subscribe((result) => {
        this.isPhonePortrait = false;

        if (result.matches) {
          this.isPhonePortrait = true;
        }
      });

    // this.observeBreakpoints();

    this.selectedArtwork = this.artworks[0];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //this.chosenCollectionIds = [2, 3];
  }
  // private getArtworksByRoute(snapshot: ActivatedRouteSnapshot) {

  //

  ngOnInit(): void {
    // this.paramsService.observeCombinedParams(
    //   this.activatedRoute,
    //   this.urlParams$,
    // );
    this.observeCombinedRouteParams();

    this.title.setTitle('Gallery');

    this.getCategories();

    this.getCollections(this.chosenCollectionIds);

    this.getTags();

    this.getTypes();

    this.getLocations();

    this.getMediums();

    this.galleryRouter();

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(this.activatedRoute.snapshot);
    //     switch (
    //       this.activatedRoute.snapshot
    //       // case()
    //     ) {
    //     }
    //   }
    // });
    ////////////// ALTERNATIVE
    // if (
    //   this.categories.length > 0 &&
    //   this.collections.length > 0 &&
    //   this.mediums.length > 0 &&
    //   this.locations.length > 0
    // ) {
    //   this.activatedRoute.paramMap.subscribe((pm) => {
    //     if (pm.get('classificationId') === 'categories') {
    //       const route = this.parseNameFromRoute(
    //         this.categories,
    //         pm.get('galleryId')!.toLowerCase().trim(),
    //       );

    //       if (route) {
    //         this.onCategorySelected(route.id);
    //       }
    //     } else if (pm.get('classificationId') === 'collections') {
    //     } else if (pm.has('search')) {
    //       // if (routeParams[0] === 'search') {
    //       // if (routeParams[0].includes('search')) {
    //       const queryParams = this.activatedRoute.snapshot.queryParams;
    //       this.getArtworks('artworks/', queryParams, false);
    //       // this.getArtworks('artworks/', queryParams);
    //       // this.getArtworks('', params);
    //       // console.log('params', queryParams);
    //     }
    //   });
    // }
    ////////////// ALTERNATIVE

    // This if/else block is necessary for caching: DO NOT DELETE!

    // this.currentCategory = this.categories
    //   .map((x) => x.id)
    //   .indexOf(this.artworkParams.categoryId);
    // this.currentCollection = this.categories
    //   .map((x) => x.id)
    //   .indexOf(this.artworkParams.collectionId);

    // (this.selectedArtwork = this.artworks[0]),
  }

  ngAfterViewInit() {
    this.eventActionDispatcher();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  /// One reason this is messy is because I am referring to multiple different
  // types of route, it is not a consistent and simple function as it is handling multiple
  // different scenarios.
  private galleryRouter() {
    if (
      this.categories.length > 0 &&
      this.collections.length > 0 &&
      this.mediums.length > 0 &&
      this.locations.length > 0
    ) {
      let urlParamsSubscriber = this.urlParams$.subscribe((routeParams) => {
        if (routeParams['classificationId'] === 'categories') {
          this.onCategorySelected(
            this.paramsService.matchNameFromRoute(this.categories, routeParams)!
              .id,
          );
        } else if (routeParams['classificationId'] === 'collections') {
          this.onCollectionSelected(
            this.paramsService.matchNameFromRoute(
              this.collections,
              routeParams,
            )!.id,
          );
        } else if (this.activatedRoute.snapshot.url[0].path === 'search') {
          this.getArtworks(
            'artworks/',
            this.activatedRoute.snapshot.queryParams,
            false,
          );
        }
      });
      this._subscriptions.push(urlParamsSubscriber);
    } else {
      this.getArtworks(
        this.router.url.replace('/gallery', 'artworks').toString(),
        undefined,
        false,
      );
    }
  }

  private getArtworks(
    urlPath?: string | undefined,
    params?: Params | undefined,
    useCache = true,
  ) {
    // let useCache: boolean = true;

    // if (urlPath) useCache = false;

    // if (
    //   this.navigationService.galleryRoutePaths.some(
    //     (substring) => urlPath?.includes(substring),
    //   )
    // ) {
    //   useCache = false;
    // } else useCache = true;
    // console.log(urlPath, useCache);

    this.artworkService.getArtworks(urlPath, params, useCache).subscribe({
      next: (response) => {
        if (this.appConfigService.responsiveImagesEnabled) {
          response.data = this.responsiveImgService.setResponsiveGalleryImages(
            response.data,
          );
        }
        this.artworks = response.data;
        this.totalCount = response.count;
        this.selectedArtwork = response.data[0];
      },
      error: (error) => console.log(error),
    });
  }

  private getSelectedArtworks() {
    this.artworkService.getSelectedArtworks().subscribe({
      next: (response) => {
        this.artworks = response.data;
        //this.totalCount = response.count;
      },
      //next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
      error: (error) => console.log(error),
    });
  }

  private getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (response) => {
        this.categories = [{ id: 0, name: 'All' }, ...response];
        // console.log('this.categories', this.categories);
      },
      //next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
      error: (error) => console.log(error),
    });
  }

  private getCollections(ids?: number[]) {
    // console.log(ids);
    this.artworkService.getCollections(ids).subscribe({
      next: (response) => {
        this.collections = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error) => console.log(error),
    });
  }

  private getLocations() {
    this.artworkService.getLocations().subscribe({
      next: (response) => {
        // console.log([...response]);
        this.locations = [{ id: 0, name: 'All' }, ...response];
        //console.log('erd', response);
      },
      error: (error) => console.log(error),
    });
  }

  private getTags() {
    this.artworkService.getTags().subscribe({
      next: (response) => (this.tags = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  private getTypes() {
    this.artworkService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  private getMediums() {
    this.artworkService.getMediums().subscribe({
      next: (response) => {
        this.mediums = [{ id: 0, name: 'All' }, ...response];
        // console.log('this.mediums', this.mediums);
      },
      error: (error) => console.log(error),
    });
  }

  public onArtworkSelected(artworkId: number) {
    const selectedProdId = this.artworks.map((x) => x.id).indexOf(artworkId);
    this.selectedArtwork = this.artworks[selectedProdId];
    this.galleryService.expandGalleryAside();
    //console.log(this.selectedArtwork);
  }

  public onCategorySelected(catId: number) {
    const params = this.artworkService.getArtworkParams();
    params.categoryId = catId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    // this.router.navigate(['categegoryId=', params.categoryId]);
    this.getArtworks();
  }

  public onCollectionSelected(collId: number) {
    const params = this.artworkService.getArtworkParams();
    params.collectionId = collId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onLocationSelected(locId: number) {
    const params = this.artworkService.getArtworkParams();
    params.locationId = locId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onTagSelected(tagId: number) {
    const params = this.artworkService.getArtworkParams();
    params.tagId = tagId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onTypeSelected(typeId: number) {
    const params = this.artworkService.getArtworkParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onSortSelected(event: any) {
    const params = this.artworkService.getArtworkParams();
    params.sort = event.target.value;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onPageChanged(event: any) {
    const params = this.artworkService.getArtworkParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.artworkService.setArtworkParams(params);
      this.artworkParams = params;
      this.getArtworks();
    }
  }

  public onSearch(searchTerm: string) {
    const params = this.artworkService.getArtworkParams();
    params.search = searchTerm;
    // this.router.navigate(this.activatedRoute.root + ['title=' + params.search]);

    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    this.artworkParams = params;
    this.getArtworks();
  }

  public onReset() {
    //if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.artworkParams = new ArtworkParams();
    this.artworkService.setArtworkParams(this.artworkParams);
    this.getArtworks();
  }

  public prevCollection() {
    let prevId;
    const params = this.artworkService.getArtworkParams();

    if (params.categoryId === this.categories.map((x) => x.id)[0]) {
      prevId = this.categories.map((x) => x.id)[this.categories.length - 1];
    } else {
      prevId = Utils.getPrevInList(
        params.categoryId,
        this.categories.map((x) => x.id),
      );
    }

    //this.prevCat = prevId;

    params.categoryId = prevId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    //this.router.navigate(['/gallery/', this.categories[params.categoryId].name]);
    this.artworkParams = params;
    this.getArtworks();
  }

  public nextCollection() {
    let nextId;
    const params = this.artworkService.getArtworkParams();

    if (
      params.categoryId ===
      this.categories.map((x) => x.id)[this.categories.length - 1]
    ) {
      nextId = this.categories.map((x) => x.id)[0];
    } else {
      nextId = Utils.getNextInList(
        params.categoryId,
        this.categories.map((x) => x.id),
      );
    }

    //this.nextCat = nextId;

    params.categoryId = nextId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    //this.router.navigate(['/gallery/', this.categories[params.categoryId].name]);
    this.artworkParams = params;
    this.getArtworks();
  }

  public prevArtwork(event: number) {
    if (
      this.selectedArtwork &&
      this.categories.map((x) => x.id).indexOf(this.selectedArtwork.id) > 0
    ) {
      let prevId: number;
      const artworkIds = this.artworks.map((x) => x.id);

      // Loop: If first index go to last index
      if (this.selectedArtwork.id === artworkIds[0]) {
        prevId = artworkIds[artworkIds.length - 1];
      }
      // Get previous
      else {
        prevId = Utils.getPrevInList(this.selectedArtwork.id, artworkIds);
      }
      // Does this need to be an observable?
      this.selectedArtwork = this.artworks[prevId];
      console.log('prevId', prevId);
    } //this.loadArtwork(prevId);
  }

  public nextArtwork(event: number) {}

  public onGalleryModeSelected(galleryMode: string) {
    this.galleryMode = galleryMode;
  }

  private eventActionDispatcher(): void {
    this.evtSvc.galleryModeSelected.subscribe({
      next: (response) => {
        this.onGalleryModeSelected(response);
      },
    });
    this.evtSvc.categorySelected.subscribe({
      next: (response) => {
        this.onCategorySelected(response);
      },
    });
    this.evtSvc.collectionSelected.subscribe({
      next: (response) => {
        this.onCollectionSelected(response);
      },
    });
    this.evtSvc.sortSelected.subscribe({
      next: (response) => {
        this.onSortSelected(response);
      },
    });
    this.evtSvc.NewSearchTermEvent.subscribe((response) => {
      if (response === '') return this.onReset();
      else this.onSearch(response);
    });
  }

  private navigateToFoo() {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        newOrdNum: '123',
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: true,
      // do not trigger navigation
    });
  }

  private observeCombinedRouteParams() {
    if (this.activatedRoute.parent) {
      this.urlParams$ = combineLatest(
        this.activatedRoute.parent.url,
        this.activatedRoute.params,
        this.activatedRoute.queryParams,
        (parentParams, params, queryParams) => ({
          ...parentParams,
          ...params,
          ...queryParams,
        }),
      );
      this.activatedRoute.queryParams.subscribe((x) => console.log(x));
      // console.log('')
    }
  }

  private observeBreakpoints() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletLandscape])
      .subscribe((result) => {
        this.isPhonePortrait = false;

        if (result.matches) {
          this.isPhonePortrait = true;
        }
      });
  }

  public scrollUp(event?: any) {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
}
