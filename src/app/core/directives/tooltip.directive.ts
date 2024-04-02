//import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

//@Directive({
//  selector: '[appTooltip]'
//})
//export class TooltipDirective {
//  @Input() tooltip = '';
//  $tooltip!: Element;

//  @HostBinding('class.tooltip') className = true;

//  @HostListener('mouseover')
//  onHover() {
//    this.$tooltip = document.createElement('span');
//    this.$tooltip.textContent = this.tooltip;
//    this.$tooltip.className = 'tooltip-text';
//    this.el.nativeElement.appendChild(this.$tooltip);
//  }

//  @HostListener('mouseleave')
//  onLeave() {
//    this.el.nativeElement.removeChild(this.$tooltip);
//  }

//  constructor(private el: ElementRef) { }

//}
