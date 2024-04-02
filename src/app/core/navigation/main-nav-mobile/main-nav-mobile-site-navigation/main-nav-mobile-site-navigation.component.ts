import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { ArtworkService } from '../../../../core/services/artwork.service';
import { ArtworkCategory } from '../../../../shared/models/category';
import { ArtworkCollection } from '../../../../shared/models/collection';
import { SideNavService } from '../../../services/side-nav.service';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-main-nav-mobile-site-navigation',
  templateUrl: './main-nav-mobile-site-navigation.component.html',
  styleUrls: ['./main-nav-mobile-site-navigation.component.scss'],
})
export class MainNavMobileSiteNavigationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('navLink', { static: false }) navLink?: ElementRef;

  clickedElement: Subscription = new Subscription();
  collections: ArtworkCollection[] = [];
  categories: ArtworkCategory[] = [];
  links: [{}] = [{}];
  mainNavMobileSiteNavigationIsExpanded = false;
  sublinksIsExpanded = true;
  collectionsSublistIsExpanded = false;
  categoriesSublistIsExpanded = true;
  constructor(
    public navigationService: NavigationService,
    public sidenavService: SideNavService,
    public artworkService: ArtworkService,
    public appConfigService: AppConfigService,
  ) {
    if (this.appConfigService.enableCategories) {
      this.getCategories();
    }
    if (this.appConfigService.enableCollections) {
      this.getCollections();
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.clickedElement = fromEvent(
      this.navLink?.nativeElement,
      'click',
    ).subscribe(() => console.log('element clicked'));
  }

  ngOnDestroy() {
    // add this for performance reason
    this.clickedElement.unsubscribe();
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...response];
      },
      error: (error) => console.log(error),
    });
  }

  getCollections() {
    this.artworkService.getCollections().subscribe({
      next: (response) => {
        this.collections = [...response];
      },
      error: (error) => console.log(error),
    });
  }

  collapseMainNavMobileSiteNavigation() {
    this.mainNavMobileSiteNavigationIsExpanded = false;
  }

  toggleSublinks() {
    this.sublinksIsExpanded = !this.sublinksIsExpanded;
  }

  expandSublinks() {
    this.sublinksIsExpanded = true;
  }

  collapseSublinks() {
    this.sublinksIsExpanded = false;
  }

  toggleCollectionsSublist() {
    this.collectionsSublistIsExpanded = !this.collectionsSublistIsExpanded;
  }

  expandCollectionsSublist() {
    this.collectionsSublistIsExpanded = true;
  }

  collapseCollectionsSublist() {
    this.collectionsSublistIsExpanded = false;
  }

  toggleCategoriesSublist() {
    this.categoriesSublistIsExpanded = !this.categoriesSublistIsExpanded;
  }

  expandCategoriesSublist() {
    this.categoriesSublistIsExpanded = true;
  }

  collapseCategoriesSublist() {
    this.categoriesSublistIsExpanded = false;
  }
}
