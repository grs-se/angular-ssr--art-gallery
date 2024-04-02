import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService /*implements OnInit*/ {
  isAdmin$: Observable<boolean> = of(false);

  // DEFAULT SETTINGS FOR MINIMAL PUBLIC GALLERY
  // Home

  /* appSettings: AppSettings = {*/
  // API STATE
  enableCategories = true;
  enableCollections = false;
  // Home Page
  showCollectionsOverview = true;
  showNews = true;
  // Main Nav
  showMainNavBasket = false;
  showMainNavLogin = true;
  showMainNavRegister = false;
  mainNavStickyTop = true;
  // Main Sidenav
  showMainSidenav = true;
  // Public Gallery
  showGalleryAside = false;
  showGalleryHeader = true;
  showGalleryToolbar = true;
  showGalleryFooter = true;
  showGalleryCollectionInformation = false;
  showGalleryCollectionToggles = false;
  showGalleryBottomNav = false;
  showGalleryCollectionBottomNavToggles = false;
  showGalleryScrollTop = true;
  // Gallery Sidenav
  showSidenavFilterResetBtn = false;
  showSidenavSearchBox = false;
  showSidenavSortOptions = false;
  showCollectionsList = true;
  showCollectionsListDropdown = true;
  showCategoriesList = true;
  showCategoriesListDropdown = true;
  showSidenavHeader = false;
  showSidenavFooter = false;
  showSidenavPager = false;
  gallerySidenavStyleExpanded = false;
  showSideNavLinkCounter = false;
  // Gallery Toolbar
  showGalleryToolbarSearchBox = true;
  showGalleryToolbarSortOptions = true;
  // Theme
  appTheme = 'light';
  // Grid Cards Gallery
  gridCardsCols = 3;
  //};
  // Responsive Images - Cloudinary
  responsiveImagesEnabled = true;
  constructor(public accountService: AccountService) {
    this.isAdmin$ = this.accountService.isAdmin$;
    //console.log('appConfig isAdmin state: ', this.isAdmin$);
  }

  // I think every single property here would need to be an observable for this to work.
  //ngOnInit() {
  //  this.isAdmin$.subscribe({
  //    next: response => {
  //      //console.log('response: ', response);
  //      if (response === true) {
  //        // SETTINGS FOR ADMIN DASHBOARD GALLERY
  //        // Home
  //        this.showCollectionsOverview = true;
  //        this.showNews = false;
  //        // Main Nav
  //        this.mainNavStickyTop = true;
  //        // Main Sidenav
  //        this.showMainSidenav = true;
  //        // Public Gallery
  //        this.showGalleryAside = true;
  //        this.showGalleryHeader = true;
  //        this.showGalleryFooter = false;
  //        this.showGalleryToolbar = false;
  //        this.showGalleryCollectionInformation = true;
  //        this.showGalleryCollectionToggles = true;
  //        this.showGalleryBottomNav = true;
  //        this.showGalleryCollectionBottomNavToggles = false;
  //        this.showGalleryScrollTop = false;
  //        // Gallery Sidenav
  //        this.showFilterResetBtn = true;
  //        this.showSearchBox = true;
  //        this.showSortOptions = true;
  //        this.showCollectionsList = false;
  //        this.showCollectionsListDropdown = true;
  //        this.showSidenavHeader = true;
  //        this.showSidenavFooter = true;
  //        this.showSidenavPager = true;
  //        // Theme
  //        this.appTheme = 'light';
  //        // Grid Cards Gallery
  //        this.gridCardsCols = 3;
  //      } else if (response === false) {
  //        console.log(response);
  //      }
  //    }
  //  });
  //}
}
