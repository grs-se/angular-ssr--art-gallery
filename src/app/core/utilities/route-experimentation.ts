//import { AfterViewInit, Component, OnInit } from '@angular/core';
//import { Title } from '@angular/platform-browser';
//import { ActivatedRoute, ActivationEnd, ActivationStart, ChildActivationEnd, Data, NavigationEnd, ParamMap, Params, PRIMARY_OUTLET, Route, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
//import { combineLatest, concat, filter, first, map, merge, Observable, of, Subject, Subscription, switchMap, take, takeUntil } from 'rxjs';
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
//  navigationSubscription: any;
//  private _subscriptions: Subscription[] = [];
//  routeData = [];
//  loader!: ActivatedRoute;
//  //paramMap$;


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
//    // This doesn't seem to work
//    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

//    //this.router.navigateByUrl(this.navigationSubscription, { skipLocationChange: true }).then(() =>
//    //  this.router.navigate([this.navigationSubscription])
//    //);
//    ////////////////////////////
//    //this.router.events.pipe(
//    //  filter(event => event instanceof ChildActivationEnd),
//    //  take(1),
//    //).subscribe(e => {

//    //  console.log('ChildActivationEnd', e);
//    //});
//    ///////////////////
//    //this.router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe(event => {
//    //  //this.routeData = event[];
//    //  console.log('event', event)
//    //});

//    //this.router.events.pipe(filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0))
//    //  .subscribe((event: ActivationEnd) => { console.log(event.snapshot.data); });





//    //const currentActivatedRoute = this.activatedRoute.pathFromRoot[this.activatedRoute.pathFromRoot.length - 1];
//    //currentActivatedRoute.params.subscribe((v) => {
//    //  console.log('v', v);
//    //  this.getArtworks(v['galleryId']);
//    //})

//    //this.router.events.subscribe((e: any) => {
//    //  console.log('Router event:', e);
//    //  //this.router.navigateByUrl(e.url);
//    //  this.getArtworks(e.url);

//    //  //if (e instanceof NavigationEnd) {
//    //  //  console.log('Router event:', e);
//    //  //}
//    //});
//    //this.router.navigateByUrl(e.url, { skipLocationChange: true }).then(() => {
//    //  this.router.navigate([`/${e.url}`]).then(() => {
//    //    console.log(`After navigation I am on:${this.router.url}`);
//    //  });
//    //});

//    //this.router.events.subscribe((e: any) => {
//    //  if (e instanceof NavigationEnd) {
//    //    this.router.navigateByUrl(e.url, { skipLocationChange: true }).then(() => {
//    //      this.router.navigate([`/${e.url}`]).then(() => {
//    //        console.log(`After navigation I am on:${this.router.url}`);
//    //      });
//    //    })

//    //    this.getArtworks(e.url); console.log('e.url constructor', e.url);
//    //  }
//    //});





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


//  public ngOnInit(): void {
//    //////////////************ */
//    //this.loader = this.activatedRoute.params.subscribe(params => this.getArtworks());
//    //if (this.activatedRoute.parent) {
//    //  this._subscriptions.push(
//    //    // Subscribe to the ActivatedRoute for paramMap changes
//    //    //this.activatedRoute.parent.url.subscribe((paramMap) => {
//    //    //  console.log('parent param map', paramMap.);
//    //    //  //this.getArtworks(paramMap)
//    //    //})
//    //      this.activatedRoute.parent.url.subscribe((params) => {
//    //        console.log('parent param map', params[0]);
//    //        this.getArtworks(params[0].path);
//    //        //this.getArtworks(paramMap)
//    //      })
//    //  );
//    //}

//    //  this._subscriptions.push(
//    //    // Subscribe to the ActivatedRoute for paramMap changes
//    //    this.activatedRoute.params.subscribe((paramMap) => {
//    //      console.log('child param map', paramMap);
//    //      //this.getArtworks(paramMap)
//    //    })
//    //);
//    //////////////************ */
//    //////////////************ */
//    // THIS SHOULD WORK!!!
//    if (this.activatedRoute.parent) {
//      this.urlParams$ = combineLatest(
//        this.activatedRoute.parent.url,
//        this.activatedRoute.params,
//        this.activatedRoute.queryParams,
//        (parentParams, params, queryParams) => ({ ...parentParams, ...params, ...queryParams })
//      );


//      // Subscribe to the single observable, giving us both
//      this.urlParams$.subscribe(routeParams => {
//        console.log('this.urlParams$', this.urlParams$);
//        //console.log("routeParams['classificationId'] + ' / ' + routeParams['galleryId']", routeParams['classificationId'] + '/' + routeParams['galleryId']);
//        // routeParams containing both the query and route params
//        //this.getArtworks(routeParams['classificationId'] + '/' + routeParams['galleryId']);
//        console.log('routeParms[0]', routeParams[0] + '/' + routeParams['galleryId']);
//        this.getArtworks(routeParams[0] + '/' + routeParams['galleryId']);
//      });
//      //this._subscriptions.push(this.urlParams$);

//    }
//    //////////////************ */
//    //////////////************ */
//    this.activatedRoute.data.subscribe(data => {
//      // data is your resolved data
//      console.log('data', data);
//      console.log("data['page']", data['page']);
//      console.log("data['options']", data['options']);
//      //this.model.options = data.options;
//    });
//    //////////////************ */

//    //this._subscriptions.entries(merge())



//    //this.getArtworks('artworks/' + this.activatedRoute.parent?.snapshot.url[0].path + '/' + this.activatedRoute.snapshot.url[0].path);
//    //console.log('this.activatedRoute.parent?.snapshot.url[0].path', 'artworks/' + this.activatedRoute.parent?.snapshot.url[0].path + '/' + this.activatedRoute.snapshot.url[0].path);

//    ///////////////////////////////////
//    //+++ID:1
//    // subscribe to the router events - storing the subscription so
//    // we can unsubscribe later. 
//    //this.navigationSubscription = this.router.events.subscribe((e: any) => {

//    //  //console.log('e', e);
//    //  // If it is a NavigationEnd event re-initalise the component
//    //  if (e instanceof NavigationEnd) {
//    //    console.log('e', e);
//    //    this.getArtworks(e.url);
//    //    console.log('e.url', e.url);
//    //  }
//    //});

//    //this.paramMap$ = this.activatedRoute.paramMap.pipe(
//    //  switchMap((params: ParamMap) =>
//    //    this.getArtworks(params.get('galleryId')))
//    //);


//    //    this.getArtworks(e.url); console.log('e.url constructor', e.url);
//    //  }
//    //});


//    ///////////////////////////////

//    ///////////////////////////////
//    // OnInit Hook, triggered each time the component is instantiated
//    // Add to our subscriptions collection
//    //this._subscriptions.push(
//    //  // Subscribe to the ActivatedRoute for paramMap changes 
//    //  this.activatedRoute.paramMap.subscribe((paramMap) => {
//    //    // Retrieve the view named parameter
//    //    const view = paramMap.get('');
//    //    //const parentRoute = paramMap.getAll('');
//    //    // Check if we have a defined view
//    //    if (view) {
//    //      // Trigger the view switch
//    //      //this.getArtworks();
//    //    }
//    //  })
//    //);

//    ///////////////////////////////////


//    //if (this.activatedRoute.parent) {
//    //  combineLatest(
//    //    this.activatedRoute.parent.url,
//    //    this.activatedRoute.params
//    //  ).subscribe(
//    //    ([p, c]) => {
//    //      //this.getArtworks(p[0].path + '/' + c[0].path)
//    //      console.log('p', p);
//    //      console.log('c', c);
//    //      console.log("p[0].path + '/' + c['galleryId'].path", p[0].path + '/' + c['galleryId']);
//    //      this.getArtworks(p[0].path + '/' + c['galleryId']);
//    //    }
//    //  );
//    //}

//    // let urlParams2 = combineLatest(
//    //   this.activatedRoute.parent?.paramMap,
//    //   this.activatedRoute.queryParams,
//    //   (params, queryParams) => ({ ...params, ...queryParams })
//    // );

//    // // Subscribe to the single observable, giving us both
//    //urlParams2.subscribe(routeParams => {
//    //   console.log('this.urlParams$', this.urlParams$);
//    //   console.log("routeParams['classificationId'] + ' / ' + routeParams['galleryId']", routeParams['classificationId'] + '/' + routeParams['galleryId']);
//    //   // routeParams containing both the query and route params
//    //   this.getArtworks(routeParams['classificationId'] + '/' + routeParams['galleryId']);
//    // });

//    //const defaultStrategy = this.router.routeReuseStrategy.shouldReuseRoute;
//    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//    //this.router.navigate(['path/to']).finally(
//    //  () => { this.router.routeReuseStrategy.shouldReuseRoute = defaultStrategy; })

//    ///// BEST SOLUTION SO FAR
//    //const queryParams = this.activatedRoute.snapshot.queryParams;
//    //const routeParams = this.activatedRoute.snapshot.params;

//    ////// do something with the parameters
//    //this.getArtworks(routeParams[0] + '/' + routeParams['galleryId']);
//    ////this.getArtworks(routeParams);

//    //this.activatedRoute.url.subscribe(x => console.log('x', x));
//    //this.activatedRoute.parent?.paramMap.subscribe(params => {
//    //  console.log('parent params.keys',params.keys);
//    //})

//    //this.activatedRoute.paramMap.subscribe(params => {
//    //  console.log('params.keys.entries()', params.keys);
//    //})


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

//    //const routeTree: UrlTree = this.router.parseUrl(this.router.url);
//    //const routeSegmentGroup: UrlSegmentGroup = routeTree.root.children[PRIMARY_OUTLET];
//    //let segmentList: UrlSegment[];
//    //let lastComponentName: string = "/";
//    //let firstRouteSegName: string = "";

//    //if (routeSegmentGroup != undefined) {
//    //  segmentList = routeSegmentGroup.segments;
//    //  firstRouteSegName = segmentList[segmentList.length - 2].path;
//    //  lastComponentName = segmentList[segmentList.length - 1].path;
//    //}

//    //console.log("first: " + firstRouteSegName);
//    //console.log("last: " + lastComponentName);

//    //this.getArtworks(firstRouteSegName + '/' + lastComponentName);


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
//    //  console.log("x[0] + ' /' + x[1]", x[0] + '/' + x['galleryId']);

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
//    ///////////////////////
//    //this.activatedRoute.parent?.params.subscribe((url) => {
//    //  const { path, parameters } = url;
//    //  console.log('url', url);
//    //  console.log(path); // e.g. /products
//    //  console.log(parameters); // e.g. { id: 'x8klP0' }
//    //});
//    ///////////////////////

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
//    this._subscriptions.forEach((subscription: Subscription) => { subscription.unsubscribe(); });

//    if (this.navigationSubscription) {
//      this.navigationSubscription.unsubscribe();
//    }
//  }


//  getArtworks(urlPath?: string) {
//    //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
//    //    this.router.navigate([this.router.url]));
//    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
//    //  return false;
//    //};
//    //this.router.onSameUrlNavigation = 'reload';
//    //getArtworks(urlPath?: HttpParams) {
//    this.artworkService.getArtworks(urlPath, false).subscribe({

//      next: response => {
//        console.log('getArtworks in Component called, urlPath =', urlPath);
//        //console.log('this.router.url', this.router.url);
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

//  getSelectedArtworks() {
//    this.artworkService.getSelectedArtworks().subscribe({
//      next: response => {
//        this.artworks = response.data;
//        //this.totalCount = response.count;
//      },
//      //next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
//      error: error => console.log(error)
//    });
//  }

//  //getArtworksByCategory(category: string) {
//  //  this.artworkService.getArtworksByCategory2(category).subscribe({
//  //    next: response => {
//  //      if (this.appConfigService.responsiveImagesEnabled) {
//  //        response.data = this.responsiveImgService.setResponsiveGalleryImages(response.data);
//  //      }
//  //      //console.log(response);
//  //      this.artworks = response.data;
//  //      this.totalCount = response.count;
//  //      //this.selectedArtwork = response.data[0];
//  //      //this.selectedArtwork = response.data[0];
//  //    },
//  //    error: error => console.log(error)
//  //  });
//  //}

//  //getArtworksByCollection(category: string) {
//  //  this.artworkService.getArtworksByCategory2(category).subscribe({
//  //    next: response => {
//  //      if (this.appConfigService.responsiveImagesEnabled) {
//  //        response.data = this.responsiveImgService.setResponsiveGalleryImages(response.data);
//  //      }
//  //      //console.log(response);
//  //      this.artworks = response.data;
//  //      this.totalCount = response.count;
//  //      //this.selectedArtwork = response.data[0];
//  //      //this.selectedArtwork = response.data[0];
//  //    },
//  //    error: error => console.log(error)
//  //  });
//  //}

//  initialiseInvites() {
//    // Set default values and re-fetch any data you need.
//  }

//  getCategories() {
//    this.artworkService.getCategories().subscribe({
//      next: response => this.categories = [...response],
//      //next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
//      error: error => console.log(error)
//    });
//  }

//  getCollections() {
//    this.artworkService.getCollections().subscribe({
//      next: response => this.collections = [...response],
//      error: error => console.log(error)
//    });
//  }

//  getTags() {
//    this.artworkService.getTags().subscribe({
//      next: response => this.tags = [{ id: 0, name: 'All' }, ...response],
//      error: error => console.log(error)
//    });
//  }

//  getTypes() {
//    this.artworkService.getTypes().subscribe({
//      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
//      error: error => console.log(error)
//    });
//  }

//  //loadCollection() {
//  //  const id = this.activatedRoute.snapshot.paramMap.get('galleryName');
//  //  if (id) this.artworkService.getCategory(+id).subscribe({
//  //    next: collection => {
//  //      this.collection = collection;
//  //      this.bcService.set('@artworkDetails', artwork.name);
//  //      this.basketService.basketSource$.pipe(take(1)).subscribe({
//  //        next: basket => {
//  //          const item = basket?.items.find(x => x.id === +id);
//  //          if (item) {
//  //            this.quantity = item.quantity;
//  //            this.quantityInBasket = item.quantity;
//  //          }
//  //        }
//  //      });
//  //    },
//  //  });
//  //}

//  onArtworkSelected(artworkId: number) {
//    const selectedProdId = this.artworks.map(x => x.id).indexOf(artworkId);
//    this.selectedArtwork = this.artworks[selectedProdId];
//    this.artworkService.expandGalleryAside();
//    //console.log(this.selectedArtwork);
//  }

//  //onArtworkSelected(artworkIndex: number) {
//  //  const selectedProdId = this.artworks.map(x => x.id).indexOf(artworkIndex);
//  //  this.selectedArtwork = this.artworks[selectedProdId];
//  //  this.artworkService.galleryAsideIsExpanded = true;
//  //  console.log(this.selectedArtwork);
//  //}

//  onCategorySelected(catId: number) {
//    const params = this.artworkService.getArtworkParams();
//    params.collectionId = 0;
//    params.categoryId = catId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    this.currentCategory = this.categories.map(x => x.id).indexOf(catId);
//    this.artworkParams = params;
//    //this.router.navigate('/gallery/category', catId.]")
//    this.getArtworks();
//    //this.currentCatId = this.categories.map(x => x.id).indexOf(this.artworkParams.categoryId);
//    //console.log(this.currentCatId);
//    //console.log(this.categories[this.currentCatId]);
//    //this.scrollUp();
//  }

//  onCollectionSelected(collId: number) {
//    const params = this.artworkService.getArtworkParams();
//    params.categoryId = 0;
//    params.collectionId = collId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    this.currentCollection = this.categories.map(x => x.id).indexOf(collId);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  onTagSelected(tagId: number) {
//    const params = this.artworkService.getArtworkParams();
//    params.tagId = tagId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  onTypeSelected(typeId: number) {
//    const params = this.artworkService.getArtworkParams();
//    params.typeId = typeId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  onSortSelected(event: any) {
//    const params = this.artworkService.getArtworkParams();
//    params.sort = event.target.value;
//    this.artworkService.setArtworkParams(params);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  onPageChanged(event: any) {
//    const params = this.artworkService.getArtworkParams();
//    if (params.pageNumber !== event) {
//      params.pageNumber = event;
//      this.artworkService.setArtworkParams(params);
//      this.artworkParams = params;
//      this.getArtworks();
//    }
//  }

//  onSearch(searchTerm: string) {
//    const params = this.artworkService.getArtworkParams();
//    params.search = searchTerm;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  onReset() {
//    //if (this.searchTerm) this.searchTerm.nativeElement.value = '';
//    this.artworkParams = new ArtworkParams();
//    this.artworkService.setArtworkParams(this.artworkParams);
//    this.getArtworks();
//  }

//  prevCollection() {
//    let prevId;
//    const params = this.artworkService.getArtworkParams();

//    if (params.categoryId === this.categories.map(x => x.id)[0]) {
//      prevId = this.categories.map(x => x.id)[this.categories.length - 1];
//    }
//    else {
//      prevId = this.artworkService.getPrevInList(
//        params.categoryId, this.categories.map(x => x.id));
//    }

//    //this.prevCat = prevId;

//    params.categoryId = prevId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    //this.router.navigate(['/gallery/', this.categories[params.categoryId].name]);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  nextCollection() {
//    let nextId;
//    const params = this.artworkService.getArtworkParams();

//    if (params.categoryId === this.categories.map(x => x.id)[this.categories.length - 1]) {
//      nextId = this.categories.map(x => x.id)[0];
//    }
//    else {
//      nextId = this.artworkService.getNextInList(
//        params.categoryId, this.categories.map(x => x.id));
//    }

//    //this.nextCat = nextId;

//    params.categoryId = nextId;
//    params.pageNumber = 1;
//    this.artworkService.setArtworkParams(params);
//    //this.router.navigate(['/gallery/', this.categories[params.categoryId].name]);
//    this.artworkParams = params;
//    this.getArtworks();
//  }

//  prevArtwork(event: number) {

//    if (this.selectedArtwork && this.categories.map(x => x.id).indexOf(this.selectedArtwork.id) > 0) {
//      if (this.selectedArtwork) {
//        let prevId: number;
//        const artworkIds = this.artworks.map(x => x.id);

//        // Loop: If first index go to last index
//        if (this.selectedArtwork.id === artworkIds[0]) {
//          prevId = artworkIds[artworkIds.length - 1];
//        }
//        // Get previous
//        else {
//          prevId = this.artworkService.getPrevInList(
//            this.selectedArtwork.id, artworkIds);
//        }
//        // Does this need to be an observable?
//        this.selectedArtwork = this.artworks[prevId];
//        console.log('prevId', prevId);
//      }    //this.loadArtwork(prevId);
//    }
//  }

//  nextArtwork(event: number) {

//  }


//  scrollUp(event?: any) {
//    window.scroll({
//      top: 0,
//      left: 0,
//    });
//  }
//}
