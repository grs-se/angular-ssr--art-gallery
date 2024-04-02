import { Component, OnChanges, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions,
  NgxGalleryOrder,
} from '@kolkov/ngx-gallery';
import { Observable, take } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../../account/account.service';
import { BasketService } from '../../../basket/basket.service';
import { Artwork } from '../../../shared/models/artwork';
import { ArtworkParams } from '../../../shared/models/artworkParams';
import { ArtworkService } from '../../../core/services/artwork.service';
import { GalleryService } from '../../gallery.service';
import Utils from '../../../shared/utils/utils';

@Component({
  selector: 'app-artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrls: ['./artwork-details.component.scss'],
})
export class ArtworkDetailsComponent implements OnInit, OnChanges {
  artwork!: Artwork;
  artworks: Artwork[] = [];
  quantity = 1;
  quantityInBasket = 0;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  dateProduced: number = 2023;
  isCollapsed: boolean = false;
  imageCount = 0;
  nextProdId!: number;
  prevProdId!: number;
  nextProd!: Artwork;
  prevProd!: Artwork;
  collectionName: string;
  galleryName: string;
  index: number;
  private currentIndex$: Observable<number> = new Observable<number>();
  // public currentIndex = signal(0);

  //total: number;
  totalCount?: number;
  artworkParams: ArtworkParams;

  constructor(
    private artworkService: ArtworkService,
    private galleryService: GalleryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    public accountService: AccountService,
    private title: Title,
  ) {
    this.bcService.set('@artworkDetails', ' ');

    this.collectionName = this.activatedRoute.snapshot.params['collectionName'];

    this.galleryName = this.activatedRoute.snapshot.params['galleryName'];

    this.index = this.artworks.indexOf(this.artwork);
    // this.index = this.artworks.findIndex((x) => x.id === this.artwork.id);
    // console.log(this.index);
    // this.currentIndex.set(this.artworks.indexOf(this.artwork));
    // this.currentIndex.

    // console.log('this.index', this.index);
    //this.total = this.artworks.length;
    //console.log(this.index, this.total);
    this.artworkParams = this.artworkService.artworkParams;
    //this.artworkParams.pageSize = 1;
    //this.activatedRoute.params[]
  }

  ngOnInit(): void {
    this.title.setTitle('Artwork Details');

    this.loadArtwork();

    this.getArtworks();

    this.activatedRoute.params.subscribe((params) => {
      this.collectionName = params['collectionName'];
      this.galleryName = params['galleryName'];
      //this.artworkParams. = params
    });

    // this.currentIndex$ = comb

    // combineLatest(
    //   this.activatedRoute.parent.url,
    //   this.activatedRoute.params,
    //   this.activatedRoute.queryParams,
    //   (parentParams, params, queryParams) => ({
    //     ...parentParams,
    //     ...params,
    //     ...queryParams,
    //   }),
    // );
  }

  ngOnChanges() {
    // this.index = this.artworks.indexOf(this.artwork);
  }

  initializeGallery() {
    this.dateProduced = new Date(this.artwork!.dateProduced).getFullYear();

    this.galleryImages = this.getImages();

    const displayArrows = this.galleryImages.length > 1;

    this.galleryOptions = [
      {
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        // imageArrows: this.imageCount > 1,
        imageArrows: false,
        imageArrowsAutoHide: false,
        // imageArrowsAutoHide: this.imageCount > 1,
        startIndex: 0,
        //thumbnails: this.imageCount > 1,
        thumbnails: false,
        thumbnailsColumns: 6,
        thumbnailSize: NgxGalleryImageSize.Cover,
        thumbnailsOrder: NgxGalleryOrder.Page,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        preview: true,
        previewArrows: this.imageCount > 1,
        previewZoom: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewArrowsAutoHide: true,
        previewDescription: true,
        //imageDescription: true,
        previewFullscreen: true,
        arrowPrevIcon: 'fa fa-angle-left',
        arrowNextIcon: 'fa fa-angle-right',
      },
      {
        breakpoint: 800,
        thumbnailsColumns: 4,
      },
    ];
  }

  getImages() {
    const imageUrls = [];

    if (this.artwork) {
      for (const photo of this.artwork.images) {
        if (photo.isMain) {
          imageUrls.unshift({
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl,
          });
        } else {
          imageUrls.push({
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl,
          });
        }
        this.imageCount++;
      }
    }
    return imageUrls;
  }
  // Perhaps I need to rewrite the loadArtwork method to take into account galleryParams and routeParam observables
  // But this is not completely necessary right now
  loadArtwork(paramId?: number) {
    let id: number | string | null;
    if (paramId) {
      id = paramId;
    } else {
      id = this.activatedRoute.snapshot.paramMap.get('id');
    }
    this.artworkService.getArtwork(+id!).subscribe({
      next: (artwork) => {
        this.artwork = artwork;
        // this.index = this.artworks.indexOf(artwork);
        this.initializeGallery();
        if (this.accountService.currentUser$)
          this.bcService.set('@artworkDetails', artwork.title);
        //console.log(this.bcService.breadcrumbs$, artwork.title);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: (basket) => {
            const item = basket?.items.find((x) => x.id === +id!);
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          },
        });
      },
      error: (error) => console.log(error),
    });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity === 0) return;
    this.quantity--;
  }

  updateBasket() {
    if (this.artwork) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.artwork, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.artwork.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

  getArtworks() {
    this.artworkService.getArtworks().subscribe({
      next: (response) => {
        this.artworks = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getPrevArtwork() {
    let prevId: number;
    const artworkIds = this.artworks.map((x) => x.id);

    if (this.artwork.id === artworkIds[0]) {
      prevId = artworkIds[this.artworks.length - 1];
    } else {
      prevId = Utils.getPrevInList(this.artwork.id, artworkIds);
    }
    //this.index = artworkIds[this.artwork.id]
    //console.log(this.index)

    //Is pushing into the router navigation the best way? Why aren't I using routerLink in template?
    //this.bcService.set('@artworkDetails', this.artwork.title);

    //this.router.navigate(
    //  //[prevId], { relativeTo: this.activatedRoute }
    //  [
    //    '/gallery/',
    //    this.collectionName,
    //    this.galleryName,
    //    prevId
    //  ]
    //);
    this.prevProd = this.artworks[prevId];
    this.loadArtwork(prevId);
  }

  getNextArtwork() {
    let nextId: number;
    const artworkIds = this.artworks.map((x) => x.id);
    console.log(this.artwork.id);

    if (this.artwork.id === artworkIds[this.artworks.length - 1]) {
      nextId = artworkIds[0];
    } else {
      nextId = Utils.getNextInList(this.artwork.id, artworkIds);
    }
    //this.index = artworkIds[this.artwork.id]
    //console.log(this.index)

    //this.bcService.set('@artworkDetails', this.artwork.title);
    console.log(this.artwork.title);

    //this.router.navigate(
    //  //[nextId], { relativeTo: this.activatedRoute }

    //  [
    //    '/gallery/',
    //    this.collectionName,
    //    this.galleryName,
    //    nextId
    //  ]
    //);
    this.loadArtwork(nextId);
  }
}
