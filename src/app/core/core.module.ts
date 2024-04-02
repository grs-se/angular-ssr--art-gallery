import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { DeferLoadDirective } from './directives/defer-load.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { FooterV2Component } from './footer/footer-v2/footer-v2.component';
import { FooterComponent } from './footer/footer.component';
import { BottomNavComponent } from './navigation/bottom-nav/bottom-nav.component';
import { MainNavMobileHeaderComponent } from './navigation/main-nav-mobile/main-nav-mobile-header/main-nav-mobile-header.component';
import { MainNavMobileSiteNavigationComponent } from './navigation/main-nav-mobile/main-nav-mobile-site-navigation/main-nav-mobile-site-navigation.component';
import { MainNavMobileComponent } from './navigation/main-nav-mobile/main-nav-mobile.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { RightSideNavComponent } from './navigation/right-side-nav/right-side-nav.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';
//import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
    FooterComponent,
    SideNavComponent,
    BottomNavComponent,
    RightSideNavComponent,
    FooterV2Component,
    LazyImgDirective,
    DeferLoadDirective,
    MainNavMobileComponent,
    MainNavMobileHeaderComponent,
    MainNavMobileSiteNavigationComponent,
    DropdownDirective,
    //  TooltipDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BreadcrumbModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerModule,
    FooterComponent,
    SideNavComponent,
    BreadcrumbModule,
    BottomNavComponent,
    RightSideNavComponent,
    FooterV2Component,
    LazyImgDirective,
    DeferLoadDirective,
    MainNavMobileComponent,
    DropdownDirective,
    //TooltipDirective
  ],
})
export class CoreModule {}
