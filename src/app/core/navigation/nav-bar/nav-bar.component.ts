import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../../../account/account.service';
import { BasketService } from '../../../basket/basket.service';
import { BasketItem } from '../../../shared/models/basket';
import { AppConfigService } from '../../services/app-config.service';
import { SideNavService } from '../../services/side-nav.service';
import { INavLink, navLinks } from '../navigation-config';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  //@Input() navLinks: NavLink[] = [];
  @ViewChild('stickyMenu') menuElement?: ElementRef;

  toggleActive: boolean = false;
  isAdmin$: Observable<boolean> = of(false);
  sticky: boolean = false;
  menuPosition: any;

  galleryRoutes: { galleryName: string; } = {
    galleryName: 'Studio'
  };

  constructor(
    public navigationService: NavigationService,
    public basketService: BasketService,
    public accountService: AccountService,
    private route: ActivatedRoute,
    public sidenavService: SideNavService,
    public appConfigService: AppConfigService
  ) { }

  // disable for artworks if quantityInStock only = 1
  ngOnInit(): void {
    this.galleryRoutes = {
      galleryName: this.route.snapshot.params['galleryName'],
    };
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  ngAfterViewInit() {
    this.menuPosition = this.menuElement?.nativeElement.offsetTop;
    //console.log('mE', this.menuElement);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    //console.log(windowScroll);
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
