import { Component, Input } from '@angular/core';
import { fromEvent, map, Observable, take } from 'rxjs';
import { Artwork, ISize } from '../../../../shared/models/artwork';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})

export class MasonryComponent {
  @Input() artworks?: Artwork[];


  //getImgSize(imageSrc: string): Observable<ISize> {
  //  let mapLoadedImage = (event: any): ISize => {
  //    return {
  //      width: event.target.width,
  //      height: event.target.height
  //    };
  //  };
  //  var image = new Image();
  //  let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
  //  image.src = imageSrc;
  //  return $loadedImg;
  //}
}
