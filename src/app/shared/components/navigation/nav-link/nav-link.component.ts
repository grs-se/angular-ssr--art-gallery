import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent {
  visited = false;
  visitedStyle: string = '';

  onClick() {

  }
}
