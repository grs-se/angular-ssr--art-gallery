import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsiveImageService } from 'src/app/core/services/responsive-image.service';
import { AccountService } from '../../../../../account/account.service';
import { BasketService } from '../../../../../basket/basket.service';
import { AppConfigService } from '../../../../../core/services/app-config.service';
import { GalleryService } from '../../../../../gallery/gallery.service';
import { Artwork } from '../../../../../shared/models/artwork';
import { GridGalleryCardComponent } from './grid-gallery-card/grid-gallery-card.component';
import { GridCardsComponent } from '../grid-cards/grid-cards.component';

interface GridGalleryStyles {
  gridStyle: 1 | 2;
  gridCols?: number;
}

@Component({
  selector: 'app-grid-gallery-cards',
  standalone: true,
  imports: [GridGalleryCardComponent, NgClass, GridCardsComponent],
  templateUrl: './grid-gallery-cards.component.html',
  styleUrls: ['./grid-gallery-cards.component.scss'],
})
export class GridGalleryCardsComponent implements OnInit, AfterViewInit {
  private hostWidth?: number;
  private screenHeight?: number;
  private screenWidth?: number;
  public isPhonePortrait: boolean = false;
  public galleryStyles: GridGalleryStyles;

  @Output('onClick') public onClick: EventEmitter<number> = new EventEmitter();

  @Input() public artworks?: Artwork[];

  @HostBinding('style.width.px') hostElRefWidth: ElementRef = new ElementRef(
    '',
  );
  @ViewChild('gridContainerRef') gridContainer?: ElementRef;
  @ViewChildren('imgElRef') public imgElRefs?: QueryList<
    ElementRef<HTMLImageElement>
  >;

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
    private hostElement: ElementRef,
  ) {
    this.getScreenSize();

    this.galleryStyles = {
      gridStyle: 2,
      gridCols: 3,
    };

    //if (this.style === 1) return
    //this.baseURLs = this.artworks?.map(x => x.imageUrl);
  }

  ngOnInit() {
    this.getHostSize();
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
            this.isPhonePortrait = true;
            this.galleryStyles.gridCols = 1;
            //this.breakpoint = Breakpoints.XSmall;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            if (this.galleryService.galleryAsideIsExpanded)
              this.galleryStyles.gridCols = 1;
            else this.galleryStyles.gridCols = 2;
            //this.breakpoint = Breakpoints.Small;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            if (this.galleryService.galleryAsideIsExpanded)
              this.galleryStyles.gridCols = 1;
            else this.galleryStyles.gridCols = 2;
            //this.breakpoint = Breakpoints.Medium;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            if (this.galleryService.galleryAsideIsExpanded)
              this.galleryStyles.gridCols = 2;
            else this.galleryStyles.gridCols = 3;
            //this.breakpoint = Breakpoints.Large;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            if (this.galleryService.galleryAsideIsExpanded === true)
              this.galleryStyles.gridCols = 2;
            else this.galleryStyles.gridCols = 3;
            //this.breakpoint = Breakpoints.XLarge;
          }
        });
    }
  }
}
