import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// enum ScrollMode {
//   ICON = 'icon',
//   TEXT = 'text',
// }

type ScrollMode = 'icon' | 'text';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.scss'],
})
export class ScrollUpComponent {
  @ViewChild('scrollUp') scrollBtn: ElementRef | undefined;
  @Input() mode: ScrollMode = 'icon';
  // @Input() mode: ScrollMode = ScrollMode.ICON;
  //scrollBtn = document.getElementById("scrollUp");
  visible = true;

  constructor() {
    //if (window.screenTop) this.visible = false;
    //window.onscroll = () => { this.scrollFunction(); };
  }

  public scrollUp(event?: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

  //scrollUp() {
  //  window.scroll({
  //    top: 0,
  //    left: 0,
  //    //behavior: 'smooth'
  //  });

  //or document.body.scrollTop = 0;
  //or document.querySelector('body').scrollTo(0,0)
  //}
  // Get the button

  // When the user scrolls down 20px from the top of the document, show the button

  //scrollFunction() {
  //  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //    this.scrollBtn!.nativeElement.style.display = "block";
  //  } else {
  //    this.scrollBtn!.nativeElement.style.display = "none";
  //  }
  //  //if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //  //  this.scrollBtn!.style.display = "block";
  //  //} else {
  //  //  this.scrollBtn!.style.display = "none";
  //  //}
  //}
}
