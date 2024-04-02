import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './news/news.component';
import { OverviewComponent } from './overview/overview.component';
import { CoreModule } from '../core/core.module';
//import { OverviewModule } from '../overview/overview.module';

import { HomeRoutingModule } from './home-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';
import { CategoryCardsComponent } from './overview/category-cards/category-cards.component';
import { CategorySlidesComponent } from './overview/category-slides/category-slides.component';
import { OverviewV2Component } from './overview-v2/overview-v2.component';
import { OverviewCardsComponent } from './overview/overview-cards/overview-cards.component';
//import { BannerComponent } from './header/banner/banner.component';


@NgModule({
  declarations: [
    HomeComponent,
    OverviewComponent,
    NewsComponent,
    HighlightsComponent,
    CategoryCardsComponent,
    CategorySlidesComponent,
    OverviewV2Component,
    OverviewCardsComponent,
    //BannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
  ],
  exports: [
    HomeComponent,
    CommonModule,
    SharedModule,
    CoreModule,
  ]
})
export class HomeModule { }
