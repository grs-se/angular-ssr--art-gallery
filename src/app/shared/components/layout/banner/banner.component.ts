import { Component, HostBinding, Input } from '@angular/core';
import { Artwork, Image } from '../../../../shared/models/artwork';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  public itemsPerSlide: number = 2;
  //public artworks: Artwork[] = [];
  public images: Image[] = [];
  //artworkParams: ArtworkParams;
  //@Input() public height?: number =
  @Input() imgUrl: string = '';
  @Input() height?: number = 75;
  @Input() width?: number = 100;
  //@HostBinding('style.width.%') @Input() public width?: number = 100;
  @Input() public artworks?: Artwork[] = [];
  @Input() public artwork?: Artwork;
  @Input() public slides?: { image: string; text?: string; }[] = [
    // { image: 'assets/images/20231203_222835.jpg' },
    //{ image: 'assets/images/carousel-img-15.jpg' },
    // { image: 'assets/images/carousel-img-16.jpg' },
    //{ image: 'assets/images/carousel-img-1.jpg' },
    // { image: 'assets/images/carousel-img-2.jpg' },
    //{ image: 'assets/images/carousel-img-3.jpg' },
    // { image: 'assets/images/carousel-img-5.jpg' },
    // { image: 'assets/images/carousel-img-6.jpg' },
    //{ image: 'assets/images/carousel-img-7.jpg' },
    // { image: 'assets/images/carousel-img-8.jpg' },
    // { image: 'assets/images/carousel-img-9.jpg' },
    // { image: 'assets/images/carousel-img-10.jpg' },
    // { image: 'assets/images/carousel-img-11.jpg' },
    // { image: 'assets/images/carousel-img-12.jpg' },
    //{ image: 'assets/images/carousel-img-13.jpg' },
    //{ image: 'assets/images/2013. 10. 16.jpg' },
    //{ image: 'assets/images/2014. 04. 30 Farnham Train Station.jpg' },
    //{ image: 'assets/images/chawton-valley.jpg' },
    //{ image: 'assets/images/collapse-(red-ii).jpg' },
    //{ image: 'assets/images/sleeping-figure-in-landscape.jpg' },
    //{ image: 'assets/images/the-ambassadors-theatre.jpg' },
    //{ image: 'assets/images/wp-20180414-03-59-47-pro_4_orig.jpg' },
    // { image: 'assets/images/carousel-img-14.jpg' },
    // { image: 'assets/images/carousel-img-14.jpg' },
    // { image: 'assets/images/carousel-img-14.jpg' },
  ];
  showIndicator = true;

}
