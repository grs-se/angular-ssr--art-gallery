import { Component, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AccountService } from '../../../account/account.service';
import { BasketService } from '../../../basket/basket.service';
import { BasketItem } from '../../../shared/models/basket';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss']
})
export class RightSideNavComponent {

  @ViewChild('rightSidenav') public sidenav!: HTMLElement;
  isAdmin$: Observable<boolean> = of(false);
  galleryRoutes: { galleryName: string; } = {
    galleryName: 'Studio'
  };

  @HostBinding('class.is-expanded') get isExpanded() {
    return this.sidenavService.rightSidenavIsExpanded;
  }

  constructor(public basketService: BasketService, public accountService: AccountService,
    private route: ActivatedRoute, public sidenavService: SideNavService) {
  }

  // disable for artworks if quantityInStock only = 1
  ngOnInit(): void {
    this.galleryRoutes = {
      galleryName: this.route.snapshot.params['galleryName'],
    };
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
