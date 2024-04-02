import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, fromEvent, map, take } from 'rxjs';
import { AccountService } from '../../../../../../account/account.service';
import { BasketService } from '../../../../../../basket/basket.service';
import { AppConfigService } from '../../../../../../core/services/app-config.service';
import { ResponsiveImageService } from '../../../../../../core/services/responsive-image.service';
import { GalleryService } from '../../../../../../gallery/gallery.service';
import { Artwork, ImageFocus } from '../../../../../models/artwork';
import { InfoBoxComponent } from '../../../info-box/info-box.component';

interface ImageDims {
  width: number;
  height: number;
}

export interface GridGalleryCardStyles {
  background: 'fade' | 'flat';
  cardStyle?: 'true-aspect-ratio' | 'cropped';
  cardStyleMobile?: 'true-aspect-ratio' | 'cropped';
  cardImgHeight: number;
  cardImgPaddingXAxisPx?: number;
  cardImgWidth: number;
  gridColNum?: number;
  gridStyle?: 1 | 2;
  gridPaddingXAxisPx?: number;
  showCategoryInfo?: boolean;
  showInfo?: boolean;
  showInfoFooter?: boolean;
  showViewBtn?: boolean;
}

@Component({
  selector: 'app-grid-gallery-card',
  standalone: true,
  imports: [
    InfoBoxComponent,
    NgClass,
    RouterLink,
    TitleCasePipe,
    NgOptimizedImage,
  ],
  templateUrl: './grid-gallery-card.component.html',
  styleUrls: [
    './grid-gallery-card.component.scss',
    './grid-gallery-card.mobile.component.scss',
  ],
  // providers: [provideCloudinaryLoader()],
})
export class GridGalleryCardComponent {
  @Output('onClick') public onClick: EventEmitter<number> = new EventEmitter();
  @Input() public galleryMode = '';
  @Input() public artwork!: Artwork;
  @Input() public cardStyles: GridGalleryCardStyles;
  @Input() public isPhonePortrait: boolean = false;
  @Input() public index: number = 0;
  // public isPhonePortrait: boolean = true;
  hostWidth?: number;
  screenHeight?: number;
  screenWidth?: number;
  imgAttrWidth?: number;
  imgAttrHeight?: number;
  imagePath: string = '';
  breakpoint: any;
  baseURL = '';
  baseURLs?: Array<string>;
  ImageFocus = ImageFocus;

  //@HostListener('window:resize', ['$event'])
  @HostBinding('style.width.px') hostElRefWidth: ElementRef = new ElementRef(
    '',
  );

  // @ViewChildren('imgElRef') imgElRefs: QueryList<HTMLImageElement>[] = [];
  @ViewChildren('imgElRef') public imgElRefs?: QueryList<
    ElementRef<HTMLImageElement>
  >;

  // calculatedImgSize:

  //@Input()
  //get artworks(): Artwork[] { return this._artworks; }
  //set artworks(artworks: Artwork[]) {
  //  this._artworks =
  //}
  //private _artworks = '';

  constructor(
    private router: Router,
    private basketService: BasketService,
    private renderer: Renderer2,
    private hostElement: ElementRef,
    private appConfigService: AppConfigService,
    public accountService: AccountService,
    public route: ActivatedRoute,
    public galleryService: GalleryService,
    public breakpointObserver: BreakpointObserver,
    public elRef: ElementRef,
    public responsiveImageService: ResponsiveImageService,
  ) {
    this.getScreenSize();

    this.cardStyles = {
      background: 'fade',
      cardImgHeight: 368,
      cardImgPaddingXAxisPx: 32,
      cardImgWidth: 350,
      cardStyle: 'cropped',
      cardStyleMobile: 'true-aspect-ratio',
      gridColNum: 3,
      gridPaddingXAxisPx: 24,
      showCategoryInfo: false,
      showInfo: true,
      showInfoFooter: false,
      showViewBtn: false,
    };

    // this.breakpointObserver
    //   .observe([Breakpoints.Small, Breakpoints.Medium])
    //   .subscribe((result) => {
    //     this.isPhonePortrait = false;

    //     console.log(result);

    //     if (result.matches) {
    //       console.log(result.matches);
    //       this.isPhonePortrait = true;
    //     }
    //   });

    //if (this.style === 1) return
    //this.baseURLs = this.artworks?.map(x => x.imageUrl);
  }

  ngOnInit() {
    // this.getImgSize();
    // this.readImageSize();
    this.setLazyLoading();
    this.getHostSize();
    // this.initCardStyle();
    //console.log('host-width', this.hostElRefWidth.nativeElement);
    //console.log('gridContainerWidth', this.gridContainer?.nativeElement);
  }

  ngAfterViewInit() {}

  private getScreenSize(event?: number) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    //console.log(this.screenHeight, this.screenWidth);
  }

  private getHostSize() {
    const hostElement = getComputedStyle(this.hostElement.nativeElement);
    const hostWidth = hostElement.width;
    //console.log(hostWidth);
    //this.hostWidth = hostWidth.width;
  }

  public addItemToBasket() {
    this.artwork && this.basketService.addItemToBasket(this.artwork);
  }

  public calculateAspectRatio(artwork: Artwork) {
    const imgHeightDB =
      artwork.images[artwork.images.findIndex((x) => x.isMain)].heightPx;
    const imgWidthDB =
      artwork.images[artwork.images.findIndex((x) => x.isMain)].widthPx;

    if (imgHeightDB > 0 && imgWidthDB > 0) {
      const aspectRatio = imgHeightDB / imgWidthDB;
      //console.log('aspectRatio', aspectRatio);
      return aspectRatio;
    }
    return 1;
  }

  // public calculateAspectRatio(artwork: Artwork) {
  //   const imgHeightDB =
  //     artwork.images[artwork.images.findIndex((x) => x.isMain)].heightPx;
  //   const imgWidthDB =
  //     artwork.images[artwork.images.findIndex((x) => x.isMain)].widthPx;

  //   if (imgHeightDB > 0 && imgWidthDB > 0) {
  //     const aspectRatio = imgHeightDB / imgWidthDB;
  //     console.log('aspectRatio', aspectRatio);
  //     return aspectRatio;
  //   }
  //   return 1;
  // }respons

  private initCardStyle() {
    if (this.isPhonePortrait) {
      this.cardStyles.cardStyle === 'true-aspect-ratio';
    } else {
      this.cardStyles.cardStyle === 'cropped';
    }
    console.log(this.cardStyles.cardStyle);
  }

  public getMainImgHeight(artwork: Artwork) {
    return this.responsiveImageService.getMainImgHeight(artwork);
  }

  public getMainImgWidth(artwork: Artwork) {
    return this.responsiveImageService.getMainImgWidth(artwork);
  }

  public setImgHeight(artwork: Artwork) {
    if (this.cardStyles.cardStyle === 'cropped') {
      this.screenWidth &&
        // 208 = gallerySidenav width
        // 32 = card padding
        //
        this.cardStyles.cardImgWidth ===
          (this.screenWidth -
            208 -
            this.cardStyles.cardImgPaddingXAxisPx! *
              (this.cardStyles.gridColNum! * 2) -
            this.cardStyles.gridPaddingXAxisPx! * 2) /
            this.cardStyles.gridColNum!;
      //console.log(this.cardImgWidth);
    }
    if (this.cardStyles.cardStyle === 'true-aspect-ratio') {
      const imgHeightDB =
        artwork.images[artwork.images.findIndex((x) => x.isMain)].heightPx;
      if (imgHeightDB > 0) {
        // console
        // console.log(
        //   'this.cardImgHeight / imgHeightDB',
        //   this.cardImgHeight / imgHeightDB,
        // );
        // console.log(imgHeightDB);
        // const aspectRatio
        // const aspectRatio = (imgHeightDB / 100) * this.cardImgHeight;
        // const ratio = this.containerHeight % imgHeightDB
        // const width = this.imgWidthDB / ratio * 100;
        // console.log(aspectRatio);
        return imgHeightDB;
      }
    }
    return this.cardStyles.cardImgHeight;
  }

  // Again..You can't access the rendered width of a component before it is rendered!!! Which means perhaps afterall if I am going to use the height and width html attributes at all then I would need to hardcode predetermined values, and cannot input dynamic values calculated from parent component widths and heights.
  // For ngSrc to work with cropped images I would have to serve pre-cropped image dimensions to the client, hich I guess makes sense in that this is all about image optimization, but it also doesn't make sense for my use case because I need the image to be resized depending on the client screen size.

  public setImgWidth(artwork: Artwork) {
    if (this.cardStyles.cardStyle === 'cropped') {
      /*      this.screenWidth &&*/
      // 208 = gallerySidenav width
      // 32 = card padding
      //
      // This is not reliable and not accurate.
      this.cardStyles.cardImgWidth =
        (this.screenWidth! -
          208 -
          this.cardStyles.cardImgPaddingXAxisPx! *
            (this.cardStyles.gridColNum! * 2) -
          this.cardStyles.gridPaddingXAxisPx! * 2) /
        this.cardStyles.gridColNum!;
      return this.cardStyles.cardImgWidth;
      //console.log(this.cardImgWidth);
    }
    if (this.cardStyles.cardStyle === 'true-aspect-ratio') {
      const imgHeightDB =
        artwork.images[artwork.images.findIndex((x) => x.isMain)].heightPx;
      if (imgHeightDB > 0) {
        // console
        // console.log(
        //   'this.cardImgHeight / imgHeightDB',
        //   this.cardImgHeight / imgHeightDB,
        // );
        // console.log(imgHeightDB);
        // const aspectRatio
        // const aspectRatio = (imgHeightDB / 100) * this.cardImgHeight;
        // const ratio = this.containerHeight % imgHeightDB
        // const width = this.imgWidthDB / ratio * 100;
        // console.log(aspectRatio);
        return imgHeightDB;
      }
    }
    return this.cardStyles.cardImgHeight;
  }

  // try emitting index rather than artwork.id
  // although artwork.id is surely more accurate and more useful than array index
  public emitOnClickEvent(event: number) {
    this.onClick.next(event);
    this.router.navigate([
      '/gallery/categories/',
      this.artwork.artworkCategory,
      this.artwork.id,
    ]);
  }

  public setLazyLoading() {
    // if (this.imgElRefs) {
    //   console.log('this.imgElRefs.length', this.imgElRefs.length);

    this.imgElRefs?.forEach((imgElRef, i) => {
      console.log(imgElRef, i);
    });
    // }
  }

  // public setLazyLoading() {
  //   console.log('this.imgElRefs.length', this.imgElRefs.length);

  //   // this.renderer.setAttribute();

  //   for (var i = 0; i < this.imgElRefs.length; i++) {
  //     if (i < 5) {
  //       this.renderer.setAttribute(this.imgElRefs[i], 'priority', '');
  //       console.log(this.imgElRefs[i]);

  //       // this.imgElRefs[i].forEach(x => x.) nativeElement.setAttribute('priority', '');
  //       // console.log(this.imgElRefs[i].nativeElement);
  //     }
  //     if (i >= 6) {
  //       this.renderer.setAttribute(this.imgElRefs[i], 'loading', 'lazy');

  //       // this.imgElRefs[i].nativeElement.setAttribute('loading', 'lazy');
  //       // console.log(this.imgElRefs[i].nativeElement);
  //     }
  //   }
  // }
  // this.imgElRefs.forEach((x) =>
  //   x.nativeElement.setAttribute('loading', 'lazy'),
  // );
  // for (var i = 0; i <= 5; i++) {
  //   console.log('i', i, this.imgElRefs[i].nativeElement);
  //   this.imgElRefs[i].nativeElement.setAttribute('priority', '');
  // }
  // for (var i = 0; i >= 6; i++) {
  //   this.imgElRefs[i].nativeElement.setAttribute('loading', 'lazy');
  //   // this.imgElRefs.forEach((x) =>
  //   //   x.nativeElement.setAttribute('loading', 'lazy'),
  //   // );
  // }
  // this.imgElRefs
  //   .slice(0, 5)
  //   .forEach((x) => x.nativeElement.setAttribute('priority', ''));
  // const largestContentfulPaintImgs = this.imgElRefs.slice(0, 5);
  // const remainingImgs = this.imgElRefs.slice(6, this.imgElRefs.length - 1);
  // largestContentfulPaintImgs.forEach(x => x.nativeElement.setAttribute('priority', ''));
  //  orEach(imgElRef => {
  //   if (this.imgElRefs[<5])
  // });
  // }

  loadedImg(event: any) {
    let mapLoadedImage = (event: any): ImageDims => {
      return {
        width: event.target.width,
        height: event.target.height,
      };
    };
    var image = new Image();
    let $loadedImg = fromEvent(image, 'load').pipe(
      take(1),
      map(mapLoadedImage),
    );
    //// Rxjs 4 - let $loadedImg = Observable.fromEvent(image, "load").take(1).map(mapLoadedImage);
    //image.src = imageSrc;
    return $loadedImg;
  }

  // readImageSize() {
  readImageSize(event: Event, artworkId: number) {
    // // readImageSize(event: Event) {
    // console.log('event', event.currentTarget);

    // console.log(
    //   this.artworks?.map((x) => {
    //     x.images.map((x) => x.heightPx);
    //   }),
    // );

    this.imgElRefs?.forEach((imgRef) => {
      imgRef.nativeElement.height = imgRef.nativeElement.clientHeight;
      imgRef.nativeElement.width = imgRef.nativeElement.clientWidth;
      // console.log()
      // console.log('this.imgElRef.nativeElement.clientHeight', imgRef.nativeElement.clientHeight);
      // console.log(
      //   'this.imgElRef.nativeElement.clientWidth',
      //   imgRef.nativeElement.clientWidth,
      // );
      // console.log(
      //   imgRef.nativeElement.setAttribute(
      //     'height',
      //     imgRef.nativeElement.clientHeight.toString(),
      //   ),
      // );
      // console.log('height', imgRef.nativeElement.height)
    });
  }

  setImageSizes() {}

  getImgSize(imageSrc: string): Observable<ImageDims> {
    let mapLoadedImage = (event: any): ImageDims => {
      return {
        width: event.target.width,
        height: event.target.height,
      };
    };
    var image = new Image();
    let $loadedImg = fromEvent(image, 'load').pipe(
      take(1),
      map(mapLoadedImage),
    );
    // Rxjs 4 - let $loadedImg = Observable.fromEvent(image, "load").take(1).map(mapLoadedImage);
    image.src = imageSrc;
    return $loadedImg;
  }
}

//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
//import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';
//import { AccountService } from '../../../../account/account.service';
//import { BasketService } from '../../../../basket/basket.service';
//import { AppConfigService } from '../../../../core/services/app-config.service';
//import { Artwork } from '../../../../shared/models/artwork';
//import { Pagination } from '../../../../shared/models/pagination';
//import { ArtworkService } from '../../../gallery.service';

//@Component({
//  selector: 'app-grid-cards',
//  templateUrl: './grid-cards.component.html',
//  styleUrls: ['./grid-cards.component.scss'],
//})

//export class GridCardsComponent implements OnInit {

//  //@Input() queryString = '';
//  @Input() galleryMode = '';
//  //@Input() artworks?: Artwork[];
//  artworks?: Artwork[];
//  @Input() cardStyle?: 1 | 2 = 1;
//  @Input() gridStyle?: 1 | 2 = 1;
//  @Output('onClick') onClick: EventEmitter<number> = new EventEmitter();

//  //collectionName?: string;
//  //galleryName?: string;
//  gridCols?: number;
//  artworksWithBps = new Map<string, Artwork[]>();
//  artwork?: Artwork;
//  imgAttrWidth?: number;
//  imgAttrHeight?: number;
//  imagePath: string = '';
//  breakpoint: any;
//  baseURL = "";
//  baseURLs?: Array<string>;
//  galleryClassificationType: string;

//  //@Input()
//  //get artworks(): Artwork[] { return this._artworks; }
//  //set artworks(artworks: Artwork[]) {
//  //  this._artworks =
//  //}
//  //private _artworks = '';

//  constructor(
//    private basketService: BasketService,
//    public accountService: AccountService,
//    public route: ActivatedRoute,
//    public artworkService: ArtworkService,
//    public breakpointObserver: BreakpointObserver,
//    private appConfigService: AppConfigService
//  ) {
//    this.galleryClassificationType = 'categories';

//    //if (this.style === 1) return
//    //this.baseURLs = this.artworks?.map(x => x.imageUrl);
//    //this.setResponsiveImages();

//  }

//  ngOnInit() {
//    this.getArtworks(this.galleryClassificationType);
//    //this.setResponsiveImages();
//    //this.route.params.subscribe((params) => {
//    //  this.collectionName = params['collectionName'];
//    //  this.galleryName = params['galleryName'];
//    //})
//    this.route.params.subscribe((params: Params) => {
//      this.galleryClassificationType = params['collectionName'];
//    });

//  }

//  addItemToBasket() {
//    this.artwork && this.basketService.addItemToBasket(this.artwork);
//  }

//  dateProduced(date: Date) {
//    return new Date(date).getFullYear();
//  }

//  // try emitting index rather than artwork.id
//  // although artwork.id is surely more accurate and more useful than array index
//  emitOnClickEvent(event: number) {
