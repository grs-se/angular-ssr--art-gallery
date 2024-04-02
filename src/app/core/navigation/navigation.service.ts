import { Injectable } from '@angular/core';
import { INavLink, navLinks, galleryRoutePaths } from './navigation-config';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public navLinks: INavLink[] = [];
  public galleryRoutePaths: string[] = [];

  constructor() {
    this.navLinks = navLinks.map(x => x);
    this.galleryRoutePaths = galleryRoutePaths.map(x => x);
  }
}
