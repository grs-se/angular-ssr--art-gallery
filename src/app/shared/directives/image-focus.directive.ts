import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appImageFocus]',
  standalone: true,
})
export class ImageFocusDirective {
  @HostBinding('class.imgFocusTop') imgFocusTop = false;
  @HostBinding('class.imgFocusRight') imgFocusRight = false;
  @HostBinding('class.imgFocusBottom') imgFocusBottom = false;
  @HostBinding('class.imgFocusLeft') imgFocusLeft = false;

  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target)
  //     ? !this.isOpen
  //     : false;
  // }

  constructor(private elRef: ElementRef) {
    // this.elRef.nativeElement
  }
}
