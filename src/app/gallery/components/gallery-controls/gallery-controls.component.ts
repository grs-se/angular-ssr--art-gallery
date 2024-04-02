import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-gallery-controls',
  templateUrl: './gallery-controls.component.html',
  styleUrls: ['./gallery-controls.component.scss']
})
export class GalleryControlsComponent {
  //@Output('onToggleGalleryMode') toggleGalleryMode: EventEmitter<string> = new EventEmitter();

  constructor(private eventService: EventService) { }

  emitToggleGalleryModeEvent(galleryMode: string) {
    this.eventService.galleryModeSelected.next(galleryMode);
    //this.toggleGalleryMode.emit(galleryMode)
    console.log(galleryMode);
  }
}
