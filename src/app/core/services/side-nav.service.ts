import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  mainSidenavIsExpanded = false;
  mainNavMobileSiteNavigationIsExpanded = false;
  gallerySidenavIsExpanded = true;
  rightSidenavIsExpanded = false;
  mobileNavIsExpanded = false;

  public toggleMainSidenav() {
    this.mainSidenavIsExpanded = !this.mainSidenavIsExpanded;
  }

  public expandMainSidenav() {
    this.mainSidenavIsExpanded = true;
  }

  public collapseMainSidenav() {
    this.mainSidenavIsExpanded = false;
  }

  public toggleMainNavMobileSiteNavigation() {
    this.mainNavMobileSiteNavigationIsExpanded = !this.mainNavMobileSiteNavigationIsExpanded;
  }

  public expandMainNavMobileSiteNavigation() {
    this.mainNavMobileSiteNavigationIsExpanded = true;
  }

  public collapseMainNavMobileSiteNavigation() {
    this.mainNavMobileSiteNavigationIsExpanded = false;
  }

  public toggleGallerySidenav() {
    this.gallerySidenavIsExpanded = !this.gallerySidenavIsExpanded;
  }

  public expandGallerySidenav() {
    this.gallerySidenavIsExpanded = true;
  }

  public collapseGallerySidenav() {
    this.gallerySidenavIsExpanded = false;
  }

  public toggleRightSidenav() {
    this.rightSidenavIsExpanded = !this.rightSidenavIsExpanded;
  }

  public expandRightSidenav() {
    this.rightSidenavIsExpanded = true;
  }

  public collapseRightSidenav() {
    this.rightSidenavIsExpanded = false;

  }
  public toggleMobileNav() {
    this.rightSidenavIsExpanded = !this.rightSidenavIsExpanded;
  }

  public expandMobileNav() {
    this.rightSidenavIsExpanded = true;
  }

  public collapseMobileNav() {
    this.rightSidenavIsExpanded = false;

  }
}
