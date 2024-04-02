import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, fromEvent, map, take } from 'rxjs';
import { ResponsiveImageService } from 'src/app/core/services/responsive-image.service';
import { AccountService } from '../../../../../account/account.service';
import { BasketService } from '../../../../../basket/basket.service';
import { AppConfigService } from '../../../../../core/services/app-config.service';
import { GalleryService } from '../../../../../gallery/gallery.service';
import { Artwork } from '../../../../../shared/models/artwork';

interface ImageDims {
  width: number;
  height: number;
}

@Component({
  standalone: true,
  imports: [NgClass, RouterLink, NgOptimizedImage, TitleCasePipe],
  selector: 'app-grid-cards',
  templateUrl: './grid-cards.component.html',
  styleUrls: ['./grid-cards.component.scss'],
})
export class GridCardsComponent implements OnInit, AfterViewInit {
  //@Input() queryString = '';
  @Input() artwork!: Artwork;
  @Input() galleryMode = '';
  @Input() artworks?: Artwork[];
  @Input() cardStyle?: 1 | 2 = 2;
  @Input() gridStyle?: 1 | 2 = 2;
  @Input() cardImgHeight: number = 250;
  @Input() cardImgWidth: number = 350;
  @Output('onClick') onClick: EventEmitter<number> = new EventEmitter();

  // @ViewChildren('imgElRef') imgElRefs: QueryList<HTMLImageElement>[] = [];
  @ViewChildren('imgElRef') public imgElRefs?: QueryList<
    ElementRef<HTMLImageElement>
  >;
  // @ViewChildren('slide') public slideElements?: QueryList<
  //   ElementRef<HTMLLIElement>
  // >;

  //collectionName?: string;
  //galleryName?: string;
  gridCols?: number;
  artworksWithBps = new Map<string, Artwork[]>();
  // artwork?: Artwork;
  imgAttrWidth?: number;
  imgAttrHeight?: number;
  imagePath: string = '';
  breakpoint: any;
  baseURL = '';
  baseURLs?: Array<string>;
  // calculatedImgSize:

  //@Input()
  //get artworks(): Artwork[] { return this._artworks; }
  //set artworks(artworks: Artwork[]) {
  //  this._artworks =
  //}
  //private _artworks = '';

  constructor(
    private basketService: BasketService,
    public accountService: AccountService,
    public route: ActivatedRoute,
    public galleryService: GalleryService,
    public breakpointObserver: BreakpointObserver,
    private appConfigService: AppConfigService,
    public elRef: ElementRef,
    public responsiveImageService: ResponsiveImageService,
    private renderer: Renderer2,
  ) {
    //if (this.style === 1) return
    //this.baseURLs = this.artworks?.map(x => x.imageUrl);
  }

  ngOnInit() {
    // this.getImgSize();
    // this.readImageSize();
    this.setLazyLoading();
  }

  ngAfterViewInit() {}

  public addItemToBasket() {
    this.artwork && this.basketService.addItemToBasket(this.artwork);
  }

  public dateProduced(date: Date) {
    return new Date(date).getFullYear();
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
  // }

  public getMainImgHeight(artwork: Artwork) {
    return this.responsiveImageService.getMainImgHeight(artwork);
  }

  public getMainImgWidth(artwork: Artwork) {
    return this.responsiveImageService.getMainImgWidth(artwork);
  }

  public setImgHeight(artwork: Artwork) {
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
    return this.cardImgHeight;
  }

  public setImgWidth(artwork: Artwork) {
    const imgWidthDB =
      artwork.images[artwork.images.findIndex((x) => x.isMain)].widthPx;
    if (imgWidthDB > 0) {
      //   console.log(
      //     'this.cardImgHeight / imgWidthDB',
      //     this.cardImgHeight / imgWidthDB,
      //   );
      //   console.log(imgWidthDB);
      return imgWidthDB;
    }
    return this.cardImgWidth;
  }

  // try emitting index rather than artwork.id
  // although artwork.id is surely more accurate and more useful than array index
  public emitOnClickEvent(event: number) {
    this.onClick.next(event);
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

  public setResponsiveGridCols() {
    if (this.appConfigService.showGalleryAside) {
      this.breakpointObserver
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ])
        .subscribe((result) => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.gridCols = 1;
            //this.breakpoint = Breakpoints.XSmall;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 1;
            else this.gridCols = 2;
            //this.breakpoint = Breakpoints.Small;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 1;
            else this.gridCols = 2;
            //this.breakpoint = Breakpoints.Medium;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 2;
            else this.gridCols = 3;
            //this.breakpoint = Breakpoints.Large;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            if (this.galleryService.galleryAsideIsExpanded === true)
              this.gridCols = 2;
            else this.gridCols = 3;
            //this.breakpoint = Breakpoints.XLarge;
          }
        });
    }
  }

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
//import { GalleryService } from '../../../gallery.service';

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
//    public galleryService: GalleryService,
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
//    this.onClick.next(event);
//  }

//  getArtworks(route?: string) {
//    this.galleryService.getArtworks2(true, route).subscribe({
//      next: response => {
//        //if (this.appConfigService.responsiveImagesEnabled) {
//        response = this.setResponsiveImages(response);
//        //}
//        this.artworks = response.data;
//        //this.totalCount = response.count;
//        //this.selectedArtwork = response.data[0];
//      },
//      error: error => console.log(error)
//    });
//  }

//  public setResponsiveImages(artworks: Pagination<Artwork[]>) {
//    //if (this.appConfigService.responsiveImagesEnabled) {
//    this.breakpointObserver.observe([
//      Breakpoints.XSmall,
//      Breakpoints.Small,
//      Breakpoints.Medium,
//      Breakpoints.Large,
//      Breakpoints.XLarge
//    ]).subscribe(result => {
//      artworks?.data.forEach(x => {
//        //let baseURL = x.imageUrl;
//        //let imagePath;
//        if (result.breakpoints[Breakpoints.XSmall]) {
//          //this.imageHeight = 500;
//          //this.imageWidth = 400;
//          // Be careful with this, overriding the original x.imageUrl
//          // this may result in lossy quality.
//          let url = x.imageUrl.split('/');
//          let insertIndex = url.indexOf('upload');
//          const options = 'w_470,c_limit,f_auto,fl_lossy,q_auto';
//          url.splice(insertIndex + 1, 0, options);
//          x.imageUrl = url.join('/');
//          this.breakpoint = Breakpoints.XSmall;
//        }
//        if (result.breakpoints[Breakpoints.Small]) {
//          let url = x.imageUrl.split('/');
//          let insertIndex = url.indexOf('upload');
//          const options = 'w_470,c_limit,f_auto,fl_lossy,q_auto';
//          url.splice(insertIndex + 1, 0, options);
//          x.imageUrl = url.join('/');
//          this.breakpoint = Breakpoints.Small;
//        }
//        if (result.breakpoints[Breakpoints.Large]) {
//          let url = x.imageUrl.split('/');
//          let insertIndex = url.indexOf('upload');
//          const options = 'w_750,c_limit,f_auto,fl_lossy,q_auto';
//          url.splice(insertIndex + 1, 0, options);
//          x.imageUrl = url.join('/');
//          this.breakpoint = Breakpoints.Large;
//        }
//        if (result.breakpoints[Breakpoints.Large]) {
//          let url = x.imageUrl.split('/');
//          let insertIndex = url.indexOf('upload');
//          const options = 'w_750,c_limit,f_auto,fl_lossy,q_auto';
//          url.splice(insertIndex + 1, 0, options);
//          x.imageUrl = url.join('/');
//          this.breakpoint = Breakpoints.Large;
//        }
//        if (result.breakpoints[Breakpoints.XLarge]) {
//          let url = x.imageUrl.split('/');
//          let insertIndex = url.indexOf('upload');
//          const options = 'w_960,c_limit,f_auto,fl_lossy,q_auto';
//          url.splice(insertIndex + 1, 0, options);
//          x.imageUrl = url.join('/');
//          this.breakpoint = Breakpoints.XLarge;
//        }
//      });
//    });
//    return artworks;
//    //} else return;
//  }

//  public setResponsiveGridCols() {
//    if (this.appConfigService.showGalleryAside) {
//      this.breakpointObserver.observe([
//        Breakpoints.XSmall,
//        Breakpoints.Small,
//        Breakpoints.Medium,
//        Breakpoints.Large,
//        Breakpoints.XLarge
//      ]).subscribe(result => {
//        if (result.breakpoints[Breakpoints.XSmall]) {
//          this.gridCols = 1;
//          //this.breakpoint = Breakpoints.XSmall;
//        }
//        if (result.breakpoints[Breakpoints.Small]) {
//          if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 1;
//          else this.gridCols = 2;
//          //this.breakpoint = Breakpoints.Small;
//        }
//        if (result.breakpoints[Breakpoints.Medium]) {
//          if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 1;
//          else this.gridCols = 2;
//          //this.breakpoint = Breakpoints.Medium;
//        }
//        if (result.breakpoints[Breakpoints.Large]) {
//          if (this.galleryService.galleryAsideIsExpanded) this.gridCols = 2;
//          else this.gridCols = 3;
//          //this.breakpoint = Breakpoints.Large;
//        }
//        if (result.breakpoints[Breakpoints.XLarge]) {
//          if (this.galleryService.galleryAsideIsExpanded === true) this.gridCols = 2;
//          else this.gridCols = 3;
//          //this.breakpoint = Breakpoints.XLarge;
//        }
//      });
//    }
//  }

//this.breakpointObserver.observe([
//  Breakpoints.XSmall,
//  Breakpoints.Small,
//  Breakpoints.Medium,
//  Breakpoints.Large,
//  Breakpoints.XLarge
//]).subscribe(result => {
//  //this.artworksWithBps = () => {
//  this.artworks?.forEach(x => {
//    if (result.breakpoints[Breakpoints.XSmall]) {
//      //this.imageHeight = 500;
//      //this.imageWidth = 400;
//      // Be careful with this, overriding the original x.imageUrl
//      // this may result in lossy quality.
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      const options = 'w_400,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');

//      this.breakpoint = Breakpoints.XSmall;
//    }
//    if (result.breakpoints[Breakpoints.Small]) {
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');
//      this.breakpoint = Breakpoints.Small;
//    }
//    if (result.breakpoints[Breakpoints.Medium]) {
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      const options = 'w_960,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');
//      this.breakpoint = Breakpoints.Medium;
//    }
//    if (result.breakpoints[Breakpoints.Large]) {
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      const options = 'w_1200,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');
//      this.breakpoint = Breakpoints.Large;
//    }
//    if (result.breakpoints[Breakpoints.XLarge]) {
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      //console.log(url);
//      const options = 'w_1600,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');
//      this.breakpoint = Breakpoints.XLarge;
//    }
//    else {
//      let url = x.imageUrl.split('/');
//      let insertIndex = url.indexOf('upload');
//      //console.log(url);
//      const options = 'w_960,c_limit,f_auto,fl_lossy,q_auto';
//      url.splice(insertIndex + 1, 0, options);
//      x.imageUrl = url.join('/');
//      //this.breakpoint = Breakpoints.Medium;
//    }
//    console.log('x.imageUrl', x.imageUrl);
//    console.log('this.breakpoint', this.breakpoint);
//  });
//  //return this.imagePath; })
//}

//);
