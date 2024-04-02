import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { DatePickerComponent } from './components/data-input/date-picker/date-picker.component';
//import { PhotoWidgetComponent } from './components/data-input/photo-widget/photo-widget.component';
import { TextInputComponent } from './components/data-input/text-input/text-input.component';
import { StepperComponent } from './components/navigation/stepper/stepper.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FilterGroupComponent } from './components/data-input/filter-group/filter-group.component';
import { ScrollUpComponent } from './components/layout/scroll-up/scroll-up.component';
import { NavLinkComponent } from './components/navigation/nav-link/nav-link.component';
import { AccordianComponent } from './components/surfaces/accordian/accordian.component';
//import { TooltipComponent } from './components/tooltip/tooltip.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MasonryCardsComponent } from './components/data-display/cards/masonry-cards/masonry-cards.component';
import { CarouselComponent } from './components/data-display/carousel/carousel.component';
import { ModalPopupComponent } from './components/data-display/modal-popup/modal-popup.component';
import { TooltipModule } from './components/data-display/tooltip/tooltip.module';
import { TotalCountComponent } from './components/data-display/total-count/total-count.component';
import { ToastModule } from './components/feedback/toast';
import { BannerComponent } from './components/layout/banner/banner.component';
import { BreadcrumbComponent } from './components/navigation/breadcrumb/breadcrumb.component';
import { NextPrevBtnsComponent } from './components/navigation/next-prev-btns/next-prev-btns.component';
import { DropdownDirective } from './directives/dropdown.directive';

//import { Utils } from './utils/utils';
//import {GridCardsComponent } from './c'

//import { BrowserModule } from "@angular/platform-browser";
//import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    //PhotoWidgetComponent,
    DatePickerComponent,
    AccordianComponent,
    ScrollUpComponent,
    FilterGroupComponent,
    // DropDownListComponent,
    NavLinkComponent,
    //TooltipComponent,
    ModalPopupComponent,
    CarouselComponent,
    TotalCountComponent,
    NextPrevBtnsComponent,
    BreadcrumbComponent,
    DropdownDirective,
    MasonryCardsComponent,
    // GridCardsComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterModule,
    CurrencyMaskModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    //ImageCropperModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    //TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ToastModule.forRoot(),
    TooltipModule,
    BreadcrumbModule,
    NgOptimizedImage,
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    FormsModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    CurrencyMaskModule,
    NgxGalleryModule,
    TabsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    //PhotoWidgetComponent,
    BsDatepickerModule,
    DatePickerComponent,
    CollapseModule,
    AccordionModule,
    //TooltipModule,
    PopoverModule,
    AccordianComponent,
    ScrollUpComponent,
    FilterGroupComponent,
    // DropDownListComponent,
    TooltipModule,
    CarouselComponent,
    TotalCountComponent,
    NextPrevBtnsComponent,
    BreadcrumbComponent,
    MasonryCardsComponent,
    // GridCardsComponent,
    BannerComponent,
    //Utils
  ],
})
export class SharedModule {}
