import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { ArtworkCategory } from 'src/app/shared/models/category';
import { ArtworkCollection } from 'src/app/shared/models/collection';
import { ArtworkLocation } from 'src/app/shared/models/location';

@Injectable()
//   {
//   providedIn: 'root',
// }
// PARAMS STRATEGY:
// What is the purpose of ArtworkParams?
// ArtworkParams enable 'private' parameterization, i.e. organisation, sorting, filtering, rating, etc.
// The benefit of 'private' parameterization is that parameterization is not dependent on a public, visible routeUrl string
// but can be manipulated privately behind the scenes, as not all parameters are supposed to be visible, for instance,
// a user should not know or does not need to know what the default organisational decisions are.

// What is the purpose of RouteParams?
// The purpose of RouteParams is that they are public, the user is in control of public parameters, can can requst what they want.
// These public parameters are made visible and referable to in the Browser URL bar.
// One benefit of routeParams is that they can be called upon on page refresh, meaning those parameters that were previously requested
// by the user can be 'preserved' without having to use the application GUI (i.e. pressing buttons and inputting data).

// So overall, it is desirable to have both private and public paramterization capabilites in a more advanced app.
// Perhaps an app or website in its simplest form might do best with public parameters.
export class ParamsService {
  constructor(public router: Router) {}

  getAllParams() {
    let params: Params = {};
    let route: ActivatedRouteSnapshot | null =
      this.router.routerState.snapshot.root;

    do {
      for (let key in route.params) {
        params[key] = route.params[key];
      }

      route = route.firstChild;
    } while (route);

    return params;
  }

  getParam(key: string) {
    return this.getAllParams()[key];
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private findLastFirstChild(
    snapshot: ActivatedRouteSnapshot,
  ): ActivatedRouteSnapshot {
    return snapshot.firstChild
      ? this.findLastFirstChild(snapshot.firstChild)
      : snapshot;
  }

  // May be best left to component
  public observeCombinedParams(
    activatedRoute: ActivatedRoute,
    urlParams$: Observable<Params>,
  ) {
    if (activatedRoute.parent) {
      urlParams$ = combineLatest(
        activatedRoute.parent.url,
        activatedRoute.params,
        activatedRoute.queryParams,
        (parentParams, params, queryParams) => ({
          ...parentParams,
          ...params,
          ...queryParams,
        }),
      );
      activatedRoute.queryParams.subscribe((x) => console.log(x));
      // console.log('')
    }
  }

  public matchNameFromRoute(
    categories:
      | ArtworkCategory[]
      | ArtworkCollection[]
      | ArtworkLocation[]
      | ArtworkMedium[],
    routeParams: Params,
    classificationId: string = 'galleryId',
  ) {
    return categories.find(
      (x) =>
        x.name &&
        x.name.toLowerCase().trim() ===
          routeParams[classificationId].toLowerCase().trim(),
    );
  }

  // this.activatedRoute.root.url.subscribe((x) => {
  //   const activeRoute = x.entries.toString().replace('/gallery', 'artworks');
  //   this.getArtworks(activeRoute);
  // });

  // this.router.events.subscribe((event) => {
  //   this.getArtworks(
  //     this.router.url.replace('/gallery', 'artworks').toString(),
  //   );
  // * RoutesRecognized: When the router parses the URL and the routes are recognized.
  // ! This is the earliest event in the navigation lifecycle that you can begin to update the breadcrumbs
  // if (event instanceof RoutesRecognized) {
  //   // console.log('event.state.root', event.state.root);
  //   const parsedUrl = event.url.replace('/gallery', 'artworks');
  //   console.log('acsd', this.activatedRoute.snapshot.params);

  //   console.log('parsedUrl', parsedUrl);

  //   // this.getArtworks;
  //   // console.log(event.url);
  //   // this.getArtworks(parsedUrl);
  // }
  // if (event instanceof NavigationEnd) {
  //   // console.log('event.state.root', event.state.root);
  //   const parsedUrl = event.url.replace('/gallery', 'artworks');
  //   console.log('acsd', this.activatedRoute.snapshot.params);

  //   console.log('parsedUrl', parsedUrl);

  //   event.urlAfterRedirects;
  //   // const parsedUrl = event.url.replace('gallery', 'artworks');
  //   // console.log('parsedUrl', parsedUrl);
  //   // // this.getArtworks;
  //   // console.log(event.url);
  //   // console.log(
  //   //   'this.activatedRoute.snapshot.url[0].path',
  //   //   this.activatedRoute.snapshot.url[0].path,
  //   // );
  // }
  // });
  // this.router.events
  //   .pipe(
  //     // identify navigation end
  //     filter((event) => event instanceof NavigationEnd),
  //     // now query the activated route
  //     map(() => this.rootRoute(this.activatedRoute)),
  //     filter((route: ActivatedRoute) => route.outlet === 'primary'),
  //   )
  //   .subscribe((route: ActivatedRoute) => {
  //     console.log('route', route);
  //     // console.log(route.component);
  //   });

  // this.router.events
  //   .pipe(filter((event) => event instanceof NavigationEnd))
  //   .subscribe((event) => {
  //     console.log(
  //       'this.activatedRoute.snapshot.url[0].path',
  //       // this.activatedRoute.snapshot.url[0].path,
  //     );
  //     this.activatedRoute.params.subscribe((x) => console.log(x));
  //   });

  // switch(this.urlParams$.subscribe) {
  //   case()
  // }

  // this.activatedRoute.queryParamMap.subscribe((params) => {
  //   const searchQuery = params.get('search');
  //   const category = params.get('categoryId');
  //   const collection = params.get('collectionId');
  //   const location = params.get('locationId');
  //   const medium = params.get('mediumId');

  //   console.log(searchQuery, category, collection, location, medium);
  //   // const minPrice = params.get('minPrice');
  //   // const maxPrice = params.get('maxPrice');

  //   // Perform search logic based on query parameters
  //   // this.performSearch(searchQuery, category, minPrice, maxPrice);
  // });

  // let urlParamsSubscriber = this.urlParams$.subscribe((routeParams) => {
  //   if (routeParams['galleryId']) {
  //     const matchedCategoryFromRoute = this.categories.find(
  //       (x) =>
  //         x.name.toLowerCase().trim() ===
  //         routeParams['galleryId'].toLowerCase().trim(),
  //     );
  //     if (matchedCategoryFromRoute) {
  //       // console.log('asd', matchedCategoryFromRoute.id);
  //       this.onCategorySelected(matchedCategoryFromRoute.id);
  //     }
  //     // console.log(routeParams);
  //     // console.log('routeParams["galleryId"]', routeParams['galleryId']);
  //   }

  //   if (routeParams['search']) {
  //     console.log("routeParams['search']", routeParams['search']);
  //   }
  // });
  // switch (routeParams) {
  //   case routeParams['galleryId']:
  //     {
  //       console.log(routeParams['galleryId']);
  //     }
  //     break;

  //   case routeParams['search']:
  //     {
  //       console.log('search', routeParams['search']);
  //     }
  //     break;
  // }
  // this.getArtworks(routeParams);
  // console.log(routeParams[0], routeParams[1], routeParams[3]);
  // this.getArtworks(routeParams[0]);
  // console.log(...routeParams[0]);
  // const matchedCategoryFromRoute = this.categories.find(
  //   (x) =>
  //     x.name.toLowerCase().trim() ===
  //     routeParams['galleryId'].toLowerCase().trim(),
  // );
  // if (matchedCategoryFromRoute) {
  //   // console.log('asd', matchedCategoryFromRoute.id);
  //   this.onCategorySelected(matchedCategoryFromRoute.id);
  // }
  // if (routeParams[0] === 'search') {
  //   console.log('SEARCH');
  //   this.getArtworks(...routeParams.toString());
  // }
  // } else {
  //   this.onCategorySelected(1);
  // }
  // });
  // this._subscriptions.push(urlParamsSubscriber);

  // SURELY ALL I WANT IS A ROUTE PARAMS STRING TO BE SENT TO THE ARTWORKSERVICE

  // SHOULDN'T THIS ALWAYS BE GET ARTWORKS BY ROUTE PATH?

  /**
   * Get artworks by selected category based on route params
   */
  // console.log('19mr439');
  // let url;
  // this.router.events.subscribe((event) => {
  //   this.getArtworks(
  //     this.router.url.replace('/gallery', 'artworks').toString(),
  //   );

  // this isn't right as categories exist during GET ARTWORKS BASED ON ADVACNED SEARCH

  // This if else block is necessary for caching: DO NOT DELETE!

  // public matchStringFromRoute(array: any[], RouteParams: Params) {
  //   = this.categories.find(
  //   (x) =>
  //     x.name.toLowerCase().trim() ===
  //     routeParams['galleryId'].toLowerCase().trim(),
  // );
}

//import { AfterViewInit, Component, OnInit } from '@angular/core';
//import { Title } from '@angular/platform-browser';
//import { ActivatedRoute, Data, NavigationEnd, Params, PRIMARY_OUTLET, Route, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
//import { combineLatest, concat, filter, first, map, merge, Observable, of, Subject, Subscription } from 'rxjs';
//import { AccountService } from '../../account/account.service';
//import { AppConfigService } from '../../core/services/app-config.service';
//import { EventService } from '../../core/services/event.service';
//import { ResponsiveImageService } from '../../core/services/responsive-image.service';
//import { Artwork } from '../../shared/models/artwork';
//import { Category } from '../../shared/models/category';
//import { Collection } from '../../shared/models/collection';
//import { ArtworkParams } from '../../shared/models/artworkParams';
//import { Tag } from '../../shared/models/tag';
//import { Type } from '../../shared/models/type';
//import { ArtworkService } from '../gallery.service';
//import { HttpParams } from '@angular/common/http';
//import { ParamsService } from '../../core/services/params.service';
//import { OnChange } from 'ngx-bootstrap/utils';

//@Component({
//  selector: 'app-gallery-main',
//  templateUrl: './gallery-main.component.html',
//  styleUrls: ['./gallery-main.component.scss']
//})
//export class GalleryMainComponent implements OnInit, AfterViewInit {
//  artworks: Artwork[] = [];
//  selectedArtwork: Artwork;
//  categories: Category[] = [];
//  collections: Collection[] = [];
//  tags: Tag[] = [];
//  types: Type[] = [];
//  artworkParams: ArtworkParams;
//  galleryMode: string = 'grid';
//  totalCount = 0;
//  searchTerm: string = '';
//  currentCategory: number = 1;
//  currentCollection: number = 1;
//  currentArtwork$: Observable<Artwork> = of(this.artworks[0]);
//  imagePath: string = '';
//  baseURL = "";
//  nextCat!: number;
//  prevCat!: number;
//  classificationId: string = 'categories';
//  galleryId: string = '';
//  galleryName: string;
//  //urlPath$: Subject<string> = new Subject();
//  //urlPath$: Observable<string>;
//  classificationId$: Observable<string>;
//  galleryId$: Observable<string>;
//  urlSegments: { classificationId: string; galleryId: string; artworkId: string; };
//  urlParams$: Observable<{ [x: string]: any; }> = new Observable<{}>;
//  //urlParams$: Subscription = new Subscription;
//  //urlPath: string;

//  //urlPath: UrlSegment;
//  //categoryName: string = 'Drawing';
//  //collectionName: string = 'London';
//  //galleryClassificationType: string;
//  //classificationType: string;

//  /*currentCollection: Category = {} as Category;*/

//  constructor(
//    public artworkService: ArtworkService,
//    private evtSvc: EventService,
//    private title: Title,
//    private router: Router,
//    private activatedRoute: ActivatedRoute,
//    public accountService: AccountService,
//    public appConfigService: AppConfigService,
//    private responsiveImgService: ResponsiveImageService,
//    private paramsService: ParamsService
//  ) {
//    this.artworkParams = artworkService.getArtworkParams();
//    this.selectedArtwork = this.artworks[0];
//    this.galleryName = this.activatedRoute.snapshot.params['galleryName'];
//    this.galleryId = this.activatedRoute.snapshot.params['galleryId'];
//    this.classificationId = this.activatedRoute.snapshot.params['classificationId'];
//    this.classificationId$ = this.activatedRoute.params.pipe(map((p) => p['classificationId']));
//    this.galleryId$ = this.activatedRoute.data.pipe(map((d) => d['galleryId']));

//    this.urlSegments = {
//      classificationId: this.activatedRoute.snapshot.params['classificationId'],
//      galleryId: this.activatedRoute.snapshot.params['galleryId'],
//      artworkId: this.activatedRoute.snapshot.params['id'],
//    };

//    //this.urlPath$ = new Observable(this.classificationId$ + '/' + this.galleryId$);

//    //this.galleryName = this.route.snapshot.params['galleryName'];

//    //this.urlPath = this.route.snapshot;
//    //this.urlPath = this.route.snapshot.params['classificationId'] + this.route.children;
//    //this.urlPath = this.route.children.join('');

//    //this.galleryClassificationType = 'categories';
//    //this.route.params.subscribe((params: Params) => {
//    //  this.galleryClassificationType = params['classificationType'];
//    //});
//    //this.collectionName = this.route.snapshot.params['classificationType'];
//    //this.classificationType = this.route.snapshot.params['classificationType'];
//    //this.route.params.subscribe((params: Params) => {
//    //  this.galleryClassificationType = params['classificationType'];
//    //});
//    //this.categories = this.categories[0];
//    //this.artwork = this.artworks[0];
//    //this.artworkService.currentCollection$.pipe();
//    //this.artworkService.currentCollection$.subscribe({
//    //  //next: response => this.currentCollection = response
//    //});

//    //this.currentCollection = this.categories.map(x => x.id).indexOf(this.artworkParams.categoryId);
//    //console.log(this.currentCollection);

//    //this.artworkService.currentCollection$.pipe(take(1)).subscribe({
//    //  next: collection => {
//    //    if (collection) this.currentCollection = collection;
//    //    console.log(this.currentCollection);
//    //  }
//    //});
//    //this.nextCat = this.artworkService.getNextInList(
//    //  this.artworkParams.categoryId, this.categories.map(x => x.id));

//  }

//  ngOnInit(): void {
//    //const defaultStrategy = this.router.routeReuseStrategy.shouldReuseRoute;
//    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//    //this.router.navigate(['path/to']).finally(
//    //  () => { this.router.routeReuseStrategy.shouldReuseRoute = defaultStrategy; })

//    ///// BEST SOLUTION SO FAR
//    //const queryParams = this.activatedRoute.snapshot.queryParams;
//    //const routeParams = this.activatedRoute.snapshot.params;

//    //// do something with the parameters
//    //this.getArtworks(routeParams[0] + '/' + routeParams['galleryId']);

//    ////this.activatedRoute.queryParams.subscribe(queryParams => {
//    ////  // do something with the query params
//    ////});

//    ////this.activatedRoute.params.subscribe(routeParams => {
//    ////  this.getArtworks(routeParams['classificationId'] + '/' + routeParams['galleryId']);
//    ////});

//    //this.urlParams$ = combineLatest(
//    //  this.activatedRoute.params,
//    //  this.activatedRoute.queryParams,
//    //  (params, queryParams) => ({ ...params, ...queryParams })
//    //);

//    //// Subscribe to the single observable, giving us both
//    //this.urlParams$.subscribe(routeParams => {
//    //  console.log('this.urlParams$', this.urlParams$);
//    //  console.log("routeParams['classificationId'] + ' / ' + routeParams['galleryId']", routeParams['classificationId'] + '/' + routeParams['galleryId']);
//    //  // routeParams containing both the query and route params
//    //  this.getArtworks(routeParams['classificationId'] + '/' + routeParams['galleryId']);
//    //});
//    ///// end of BEST SOLUTION SO FAR

//    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
//    //  return false;
//    //};
//    //this.getArtworks(this.activatedRoute.snapshot.params + "/");
//    //this.activatedRoute.params.subscribe(p => console.log('p',p));

//    //this.activatedRoute.params.pipe(
//    //  map(params => { params['classificationId'], params['galleryId']}),
//    //  map([classificationId, galleryId] => this.getArtworks(classificationId))
//    //);

//    //let parentRoute;

//    //let parentRoute = this.activatedRoute.parent?.paramMap.subscribe(pM => pM.get('classificationId'));
//    //let childRoute = this.activatedRoute.paramMap.subscribe(pM => pM.get('galleryId'));

//    //this.getArtworks(parentRoute + '/' + childRoute);
//    //console.log("parentRoute + ' / ' + childRoute", parentRoute + '/' + childRoute);

//    const routeTree: UrlTree = this.router.parseUrl(this.router.url);
//    const routeSegmentGroup: UrlSegmentGroup = routeTree.root.children[PRIMARY_OUTLET];
//    let segmentList: UrlSegment[];
//    let lastComponentName: string = "/";
//    let firstRouteSegName: string = "";

//    if (routeSegmentGroup != undefined) {
//      segmentList = routeSegmentGroup.segments;
//      firstRouteSegName = segmentList[segmentList.length - 2].path;
//      lastComponentName = segmentList[segmentList.length - 1].path;
//    }

//    console.log("first: " + firstRouteSegName);
//    console.log("last: " + lastComponentName);

//    this.getArtworks(firstRouteSegName + '/' + lastComponentName);

//    //const classificationId = this.paramsService.getParam('classificationId');
//    //console.log('classificationId', classificationId);

//    //const galleryId = this.paramsService.getParam('galleryId');
//    //console.log('galleryId', galleryId);
//    //interface Params {
//    //  value: string;
//    //}
//    //this.activatedRoute.params.subscribe(x => )

//    //var params = [];
//    //var route = this.router.routerState.snapshot.root;
//    //do {
//    //  params.push(route.params);
//    //  route = route.firstChild;
//    //} while (route);
//    //this.getArtworks(this.urlSegments.classificationId + '/' + this.urlSegments.galleryId);
//    //this.activatedRoute.params.subscribe(params => {
//    //  this.getArtworks(params['classificationId'] + '/' + params['galleryId']);
//    //  //this.urlSegments.classificationId = params['classificationId'];
//    //  //this.urlSegments.galleryId = params['galleryId'];
//    //  //this.urlSegments.artworkId = params['id'];
//    //});
//    ////this.getArtworks(this.urlSegments.classificationId + '/' + this.urlSegments.galleryId);

//    //const urlParams: Observable<any> = combineLatest(
//    //  this.activatedRoute.params,
//    //  //this.activatedRoute.queryParams
//    //).pipe(
//    //  map(([params, /*queryParams*/]) => ({ ...params, /*...queryParams*/ })));

//    //urlParams.subscribe(x => {

//    //  console.log('x', x);
//    //  console.log("x[0] + ' /' + x[1]", x['classificationId'] + '/' + x['galleryId']);

//    //  this.getArtworks(x['classificationId'] + '/' + x['galleryId']);
//    //  //this.getArtworks(x[0].concat(x[1]));
//    //});

//    //combineLatest(
//    //  this.route.params,
//    //  this.route.data,
//    //  (params: Params, data: Data) => ({
//    //    params,
//    //    data,
//    //  })
//    //).subscribe((res: { params: Params; data: Data; }) => {
//    //  const { params, data } = res;

//    //  this.getArtworks(params['classificationId']);
//    //});

//    //this.classificationId = this.route.snapshot.params['classificationId'];
//    //this.galleryId = this.route.snapshot.params['galleryId'];

//    //this.route.params.subscribe((params) => {
//    //  this.classificationId = params['classificationId'];
//    //  this.galleryId = params['galleryId'];
//    //})

//    //this.getArtworks(this.classificationId + '/' + this.galleryId);
//    //const example = this.classificationId$.pipe(concat(this.galleryId$));

//    //this.activatedRoute.params.subscribe((params) => {
//    //  concat(params['classificationId'], params['galleryId']).subscribe(x => this.getArtworks(x));
//    //})

//    //this.getArtworks(this.classificationId$ + this.galleryId$);

//    //this.getArtworks(this.route.snapshot.params['galleryId'] ?
//    //  this.route.snapshot.params['classificationId'] + '/' + this.route.snapshot.params['galleryId'] :
//    //  this.route.snapshot.params['classificationId']
//    //);
//    //// WHY ISN'T THIS BEING CALLED?????
//    //this.route.params.subscribe((params: Params) => {
//    //  console.log('params', params);
//    //  //this.getArtworks(params['galleryId']);
//    //  this.getArtworks(params['galleryId'] ?
//    //    params['classificationId'] + '/' + params['galleryId']
//    //    : params['classificationId']
//    //  );
//    //}
//    //);
//    //this.route.params.subscribe((params: Params) => {
//    //  //this.getArtworks(params['galleryId']);
//    //  this.getArtworks(params['galleryId'] ?
//    //    params['classificationId'] + '/' + params['galleryId']
//    //    : params['classificationId']
//    //  );
//    //}
//    //);
//    //this.route.paramMap.subscribe((paramMap) => {
//    //  this.getArtworks(paramMap.get('classificationId') + '/' + paramMap.get('galleryId'));
//    //  console.log('paramMap.keys.join("/")', paramMap.get('classificationId') + '/' + paramMap.get('galleryId'));
//    //  });
//    //})

//    //this.route.parent?.params.subscribe((url) => {
//    //  const { path, parameters } = url;
//    //  console.log('url',url);
//    //  console.log(path); // e.g. /products
//    //  console.log(parameters); // e.g. { id: 'x8klP0' }
//    //});

//    //this.route.params.subscribe((params) => {
//    //  //console.log('params',params);

//    //  ////console.log('params.toString()',params.toString())

//    //  //this.getArtworks(params.toString());
//    //  //if (params['galleryId'])
//    //    this.getArtworks(params['classificationId'] + '/' + params['galleryId']);
//    //})

//    //this.getArtworks()

//    //this.route.url.subscribe(([url]) => {
//    //  const { path, parameters } = url;
//    //  console.log('url',url);
//    //  console.log('path',path); // e.g. /products
//    //  console.log('parameters',parameters); // e.g. { id: 'x8klP0' }
//    //});

//    //console.log('this.urlPath', this.urlPath$);
//    //console.log(this.router.url);

//    ////this.route.parent?.url.subscribe(url => this.urlPath$.next(url[0].path));
//    //this.route.parent?.url.subscribe(url => {
//    //  console.log('this.route.parent?.url',url)
//    //});

//    //console.log('this.route.snapshot', this.route.snapshot);

//    //console.log('this.route.params', this.route.params);

//    //console.log('this.urlPath$',this.urlPath$);

//    //this.router.events.pipe(
//    //  filter(event => event instanceof NavigationEnd)
//    //)
//    //  .subscribe(event => {
//    //    console.log('event', event);
//    //  });

//    ////this.getArtworks(this.urlPath);
//    //console.log(this.route.snapshot.url[0].path); // e.g. /products

//    //this.route.params.subscribe((params) => {
//    //  this.collectionName = params['collectionName'];
//    //  this.galleryName = params['galleryName'];
//    //  this.categoryName = params['categoryName'];
//    //  console.log(this.categoryName);
//    //})    this.collectionName = this.route.snapshot.params['collectionName'];
//    /*this.categoryName = this.route.snapshot.params['categoryName'];*/
//    this.title.setTitle("Gallery");
//    //this.getArtworks(this.route.snapshot.params['classificationId']);
//    //if (this.galleryId === '') {
//    //  //this.getArtworks(this.classificationId);
//    //  this.getArtworks(this.urlPath);
//    //}
//    //else {
//    //  this.getArtworks(this.classificationId + '/' + this.galleryId);
//    //}

//    //this.getArtworksByCategory(this.route.snapshot.params['categoryName']);

//    //this.getArtworksByCategory(this.route.snapshot.params['categoryName']);
//    //this.route.params.subscribe((params: Params) => {
//    //  this.getArtworksByCategory(params['categoryName']);
//    //  //this.collectionName = params['collectionName'];
//    //  //this.categoryName = params['categoryName'];
//    //  //console.log(this.categoryName);
//    //  //console.log(params);
//    //});

//    //this.collectionName = params['collectionName'];
//    //this.categoryName = params['categoryName'];
//    //console.log(this.categoryName);
//    //console.log(params);
//    //});

//    //this.route.params.subscribe((params: Params) => {
//    //  //if (params[])
//    //  //this.urlPath =
//    //  //this.getArtworks(params['classificationId']);
//    //  //this.artworkService.classificationIdRoutePaths
//    //  //this.classificationId = params['classificationId'];
//    //  //this.galleryId = params['galleryId']
//    //  //console.log(params);
//    //  //console.log(params.toString());

//    //  if (this.galleryId === '') {
//    //    //this.getArtworks(this.classificationId);
//    //    this.getArtworks(params['classificationId']);
//    //  }
//    //  if (this.galleryId != '') {
//    //    //this.getArtworks(this.classificationId + '/' + this.galleryId);
//    //  }
//    //  this.getArtworks(params['classificationId'] + '/' + params['galleryId']);
//    //  this.getArtworks(params['classificationId'] + '/' + params['galleryId']);
//    //if (params['classificationId'] === 'categories') {
//    //  //this.getArtworks(params['galleryId']);
//    //}
//    //if (params['classificationId'] === 'collections') {
//    //  this.getArtworks(params['galleryId']);
//    //}

//    //if (this.router.url.includes('/')) {
//    //  this.getArtworks(params['categoryName']);
//    //}
//    //if (this.router.url.includes('/categories')) {
//    //  this.getArtworksByCategory(params['categoryName']);
//    //}
//    //if (this.router.url.includes('/collections')) {
//    //  this.getArtworksByCollection(params['collectionName']);
//    //}
//    //if (this.router.url.includes('/selected-work')) {
//    //  this.getSelectedArtworks();
//    //}
//    //this.collectionName = params['collectionName'];
//    //this.categoryName = params['categoryName'];
//    //console.log(this.categoryName);
//    //console.log(params);
//    //});

//    //this.getArtworks();
//    //this.artworkParams.categoryId = 1;
//    //this.getArtworks(this.galleryClassificationType);
//    //this.getArtworksByCategory(this.categoryName);
//    this.getCategories();
//    this.getCollections();
//    this.getTags();
//    this.getTypes();
//    console.log('galleryMainComponent called');

//    this.currentCategory = this.categories.map(x => x.id).indexOf(this.artworkParams.categoryId);
//    this.currentCollection = this.categories.map(x => x.id).indexOf(this.artworkParams.collectionId);

//    //this.getArtworks('categories/' + this.categoryName);

//    //this.route.params.subscribe((params: Params) => {
//    //  this.galleryClassificationType = params['collectionId'];
//    //});
//    //const currentArtwork = Observable.create(observer => {

//    //})

//    //this.prevCollection();
//    //this.nextCollection();
//  }

//  ngOnChanges() {

//    //const urlParams: Observable<any> = combineLatest(
//    //  this.activatedRoute.params,
//    //  //this.activatedRoute.queryParams
//    //).pipe(
//    //  map(([params, /*queryParams*/]) => ({ ...params, /*...queryParams*/ })));

//    //urlParams.subscribe(x => {

//    //  console.log('x', x);
//    //  console.log("ngOnChanges, x[0] + ' /' + x[1]", x['classificationId'] + '/' + x['galleryId']);

//    //  this.getArtworks(x['classificationId'] + '/' + x['galleryId']);
//    //  //this.getArtworks(x[0].concat(x[1]));
//    //});

//    //this.getArtworksByCategory(this.categoryName);
//    //this.router.navigate(['categories', this.categoryName]);

//    /*this.getArtworks(this.categoryName);*/

//  }

//  ngAfterViewInit() {
//    this.evtSvc.categorySelected.subscribe({
//      next: response => {
//        this.onCategorySelected(response);
//      }
//    });
//    this.evtSvc.collectionSelected.subscribe({
//      next: response => {
//        this.onCollectionSelected(response);
//      }
//    });
//    this.evtSvc.sortSelected.subscribe({
//      next: response => {
//        this.onSortSelected(response);
//      }
//    });
//    this.evtSvc.NewSearchTermEvent.subscribe(response => {
//      if (response === '') return this.onReset();
//      else this.onSearch(response);
//    });
//    //this.artworkService.ToggleCollectionInformation.subscribe()

//  }

//  ngOnDestroy(): void {
//    //this.urlParams$
//    //this..unsubscribe();
//  }

//  getArtworks(urlPath?: string) {

//    //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
//    //    this.router.navigate([this.router.url]));
//    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
//    //  return false;
//    //};
//    //this.router.onSameUrlNavigation = 'reload';
//    //getArtworks(urlPath?: HttpParams) {
//    this.artworkService.getArtworks(urlPath).subscribe({
//      next: response => {
//        console.log('getArtworksComponent urlPath', urlPath);
//        console.log('this.router.url', this.router.url);
//        //console.log('JSON.parse(this.router.url)',JSON.parse(this.router.url));
//        if (this.appConfigService.responsiveImagesEnabled) {
//          response.data = this.responsiveImgService.setResponsiveGalleryImages(response.data);
//        }
//        console.log('response', response);
//        this.artworks = response.data;
//        this.totalCount = response.count;
//        this.selectedArtwork = response.data[0];
//      },
//      error: error => console.log(error)
//    });
//  }

//getArtworksByCategory(category: string) {
//  this.artworkService.getArtworksByCategory2(category).subscribe({
//    next: response => {
//      if (this.appConfigService.responsiveImagesEnabled) {
//        response.data = this.responsiveImgService.setResponsiveGalleryImages(response.data);
//      }
//      //console.log(response);
//      this.artworks = response.data;
//      this.totalCount = response.count;
//      //this.selectedArtwork = response.data[0];
//      //this.selectedArtwork = response.data[0];
//    },
//    error: error => console.log(error)
//  });
//}

//getArtworksByCollection(category: string) {
//  this.artworkService.getArtworksByCategory2(category).subscribe({
//    next: response => {
//      if (this.appConfigService.responsiveImagesEnabled) {
//        response.data = this.responsiveImgService.setResponsiveGalleryImages(response.data);
//      }
//      //console.log(response);
//      this.artworks = response.data;
//      this.totalCount = response.count;
//      //this.selectedArtwork = response.data[0];
//      //this.selectedArtwork = response.data[0];
//    },
//    error: error => console.log(error)
//  });
//}
