import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditArtworkComponent } from './edit-product/edit-product.component';
import { EditArtworkFormComponent } from './edit-product-form/edit-product-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditArtworkPhotosComponent } from './edit-product-photos/edit-product-photos.component';
import { EditMetadataFormComponent } from './edit-metadata-form/edit-metadata-form.component';
import { CoreModule } from '../core/core.module';
import { PhotoWidgetComponent } from '../shared/components/data-input/photo-widget/photo-widget.component';

@NgModule({
  declarations: [AdminComponent, EditArtworkComponent, EditArtworkFormComponent, EditArtworkPhotosComponent, EditMetadataFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    CoreModule,
    PhotoWidgetComponent
  ]
})
export class AdminModule { }
