import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from '../core/services/app-config.service';
import { ArtworkService } from '../core/services/artwork.service';
import { Artwork, Image } from '../shared/models/artwork';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public itemsPerSlide: number = 2;
  public artworks: Artwork[] = [];
  public images: Image[] = [];
  //artworkParams: ArtworkParams;
  slides: { image: string; text?: string }[] = [
    // { image: 'assets/images/20231203_222835.jpg' },
    //{ image: 'assets/images/carousel-img-15.jpg' },
    // { image: 'assets/images/carousel-img-16.jpg' },
    //{ image: 'assets/images/carousel-img-1.jpg' },
    // { image: 'assets/images/carousel-img-2.jpg' },
    { image: 'assets/images/carousel-img-3.jpg' },
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

  constructor(
    private title: Title,
    public appConfigService: AppConfigService,
    private artworkService: ArtworkService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Home Page');
    this.itemsPerSlide = this.mobileDevice() ? 2 : 4;
    // this.getSelectedArtworks();

    // artwork.images[artwork.images.findIndex((x) => x.isMain)].heightPx;

    // this.images = this.artworks[].
    //   (x => x.images.filter(x => x.isMain));
    //   this.artworks[this.artworks.forEach(x => x.images)]
  }

  // Careful with calling artworkService get requests from outside gallery as this can interfer with artworkCache
  private getSelectedArtworks() {
    this.artworkService.getSelectedArtworks().subscribe({
      //this.artworkService.getArtworks('selected-work').subscribe({
      next: (response) => {
        // if (this.appConfigService.responsiveImagesEnabled) {
        //   response.data = this.responsiveImgService.setResponsiveGalleryImages(
        //     response.data,
        //   );
        // }
        //console.log('response', response);
        this.artworks = response.data;
        // this.totalCount = response.count;
        // this.selectedArtwork = response.data[0];
      },
      error: (error) => console.log(error),
    });
  }

  getTopRatedArtworks() {
    //this.artworkService.get
  }

  private mobileDevice(): boolean {
    return navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
      ? true
      : false;
  }

  //constructor() {
  //  this.artworkParams = new ArtworkParams();
  //}

  //ngOnInit() {
  //  this.artworkParams = new ArtworkParams();
  //}

  switchIndicator(): void {
    this.showIndicator = !this.showIndicator;
  }

  /////////////////////////////////////////
  //// Slider
  //const slider = function () {
  //  const slides = document.querySelectorAll('.slide');
  //  const btnLeft = document.querySelector('.slider__btn--left');
  //  const btnRight = document.querySelector('.slider__btn--right');
  //  const dotContainer = document.querySelector('.dots');

  //  let curSlide = 0;
  //  const maxSlide = slides.length;

  //  // Functions
  //  const createDots = function () {
  //    slides.forEach(function (_, i) {
  //      dotContainer.insertAdjacentHTML(
  //        'beforeend',
  //        `<button class="dots__dot" data-slide="${i}"></button>`
  //      );
  //    });
  //  };

  //  const activateDot = function (slide) {
  //    document
  //      .querySelectorAll('.dots__dot')
  //      .forEach(dot => dot.classList.remove('dots__dot--active'));

  //    document
  //      .querySelector(`.dots__dot[data-slide="${slide}"]`)
  //      .classList.add('dots__dot--active');
  //  };

  //  const goToSlide = function (slide) {
  //    slides.forEach(
  //      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  //    );
  //  };

  //  // Next slide
  //  const nextSlide = function () {
  //    if (curSlide === maxSlide - 1) {
  //      curSlide = 0;
  //    } else {
  //      curSlide++;
  //    }

  //    goToSlide(curSlide);
  //    activateDot(curSlide);
  //  };

  //  const prevSlide = function () {
  //    if (curSlide === 0) {
  //      curSlide = maxSlide - 1;
  //    } else {
  //      curSlide--;
  //    }
  //    goToSlide(curSlide);
  //    activateDot(curSlide);
  //  };

  //  const init = function () {
  //    goToSlide(0);
  //    createDots();

  //    activateDot(0);
  //  };
  //  init();

  //  // Event handlers
  //  btnRight.addEventListener('click', nextSlide);
  //  btnLeft.addEventListener('click', prevSlide);

  //  document.addEventListener('keydown', function (e) {
  //    if (e.key === 'ArrowLeft') prevSlide();
  //    e.key === 'ArrowRight' && nextSlide();
  //  });

  //  dotContainer.addEventListener('click', function (e) {
  //    if (e.target.classList.contains('dots__dot')) {
  //      const { slide } = e.target.dataset;
  //      goToSlide(slide);
  //      activateDot(slide);
  //    }
  //  });
  //};
  //slider();
}
