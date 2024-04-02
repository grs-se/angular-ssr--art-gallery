import { Component } from '@angular/core';
import { SideNavService } from '../../../services/side-nav.service';

@Component({
  selector: 'app-main-nav-mobile-header',
  templateUrl: './main-nav-mobile-header.component.html',
  styleUrls: ['./main-nav-mobile-header.component.scss']
})
export class MainNavMobileHeaderComponent {

  constructor(
    public sidenavService: SideNavService
  ) {

  }

}
