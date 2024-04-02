import { Component, Input } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { ArtworkParams } from '../../../shared/models/artworkParams';
import { ArtworkService } from '../../../core/services/artwork.service';

@Component({
  selector: 'app-gallery-footer',
  templateUrl: './gallery-footer.component.html',
  styleUrls: ['./gallery-footer.component.scss'],
})
export class GalleryFooterComponent {
  @Input() totalCount: number = 0;
  artworkParams: ArtworkParams;

  constructor(
    public artworkService: ArtworkService,
    private eventService: EventService,
  ) {
    this.artworkParams = artworkService.getArtworkParams();
  }
}
