import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '../../../core/services/app-config.service';
import { Artwork } from '../../../shared/models/artwork';
import { GalleryService } from '../../gallery.service';

@Component({
  selector: 'app-gallery-aside',
  templateUrl: './gallery-aside.component.html',
  styleUrls: ['./gallery-aside.component.scss']
})
export class GalleryAsideComponent {
  @Output('prevArtwork') prevArtwork: EventEmitter<number> = new EventEmitter();
  @Output('nextArtwork') nextArtwork: EventEmitter<number> = new EventEmitter();
  @Input() artwork?: Artwork;
  //@Input() show: boolean = false;
  dateProduced: number = 2023;
  detailsCollapsed = false;

  constructor(
    public galleryService: GalleryService,
    public appConfigService: AppConfigService,
    public route: ActivatedRoute
  ) {
    //this.dateProduced = new Date(this.artwork!.dateProduced).getFullYear();
  }

  emitPrevArtworkEvent(event:any) {
    this.prevArtwork.next(event);
  }

  emitNextArtworkEvent(event:any) {
    this.nextArtwork.next(event);
  }

  closeAside() {
    this.galleryService.collapseGalleryAside();
  }

  collapseDetails() {

  }

  isAnimated() {

  }
}
