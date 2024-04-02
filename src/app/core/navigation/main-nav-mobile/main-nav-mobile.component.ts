import { Component, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../../../account/account.service';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-main-nav-mobile',
  templateUrl: './main-nav-mobile.component.html',
  styleUrls: ['./main-nav-mobile.component.scss']
})
export class MainNavMobileComponent {
  @ViewChild('mobile-nav') public mobileNav!: HTMLElement;
  isAdmin$: Observable<boolean> = of(false);
  galleryRoutes: { galleryName: string; } = {
    galleryName: 'Studio'
  };

  @HostBinding('class.is-expanded') get isExpanded() {
    return this.sidenavService.mobileNavIsExpanded;
  }

  constructor(public accountService: AccountService,
    private route: ActivatedRoute, public sidenavService: SideNavService) {
  }

  // disable for artworks if quantityInStock only = 1
  ngOnInit(): void {
    this.galleryRoutes = {
      galleryName: this.route.snapshot.params['galleryName'],
    };
    this.isAdmin$ = this.accountService.isAdmin$;
  }


}
