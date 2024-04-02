//import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChildren('slide') public slideElements?: QueryList<
    ElementRef<HTMLLIElement>
  >;
  @ViewChild('btnPrev') public btnPrevElement?: ElementRef;
  @ViewChild('btnNext') public btnNextElement?: ElementRef;
  @ViewChild('dots') public dotContainer?: ElementRef;

  @Input() slides: { image: string; text?: string }[] = [];
  @Input() mode?: 'slide' | 'fade' | 'triad' = 'fade';
  @Input() indicators?: true;
  @Input() indicatorStyle?: 'dot' | 'line' = 'line';
  @Input() timer?: number = 3000;

  curSlide: number = 0;
  maxSlide!: number;
  showIndicator = true;

  constructor() {} //@Inject(DOCUMENT) private document: Document

  ngOnInit(): void {
    this.maxSlide = this.slides.length;
  }

  ngAfterViewInit(): void {
    this.goToSlide(0);
    this.createDots();
    this.activateDot(0);
    window.setTimeout(() => this.nextSlide(), 3000);

    this.dotContainer?.nativeElement.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        this.goToSlide(slide);
        this.activateDot(slide);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      e.key === 'ArrowRight' && this.nextSlide();
    });
  }

  goToSlide(slide: any) {
    this.slideElements?.forEach((s, i) => {
      //if (this.mode === 'slide') s.nativeElement.classList.add('carousel-animation--slide');
      //if (this.mode === 'fade') s.nativeElement.classList.add('caroursel-animation--fade');
      if (this.mode === 'slide')
        s.nativeElement.style.transform = `translateX(${100 * (i - slide)}%)`;
      //if (this.mode === 'fade') {
      //  s.nativeElement.style.opacity = `1`;
      //  s.nativeElement.classList.add('carousel-animation--fade .active')
      //};
      s.nativeElement.style.opacity = '0';
    });
  }

  nextSlide() {
    if (this.curSlide === this.maxSlide - 1) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }

    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }

  prevSlide() {
    if (this.curSlide === 0) {
      this.curSlide = this.maxSlide - 1;
    } else {
      this.curSlide--;
    }
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }

  createDots() {
    this.slideElements?.forEach((_, i) => {
      console.log(_, i);
      this.dotContainer?.nativeElement.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
  }

  activateDot(slide: number) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      ?.querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add('dots__dot--active');
  }
}
