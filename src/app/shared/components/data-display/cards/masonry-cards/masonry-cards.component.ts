import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ResponsiveImageService } from 'src/app/core/services/responsive-image.service';
import { Artwork } from 'src/app/shared/models/artwork';

@Component({
  selector: 'app-masonry-cards',
  templateUrl: './masonry-cards.component.html',
  styleUrls: ['./masonry-cards.component.scss'],
})
export class MasonryCardsComponent implements OnInit {
  @Input() slides: { image: string }[] = [];
  @Input() artworks: Artwork[] = [];
  @Input() cardImgHeight: number = 250;
  @Input() cardImgWidth: number = 350;
  @Input() maxRows?: number = 2;
  @Input() height?: number;

  @HostBinding('style.width.%') @Input() width: number = 75;
  @HostBinding('style.padding.px') @Input() padding: number = 24;

  constructor(public responsiveImageService: ResponsiveImageService) {}

  ngOnInit() {
    // this.maxRows = 2;
    // this.height = this.getContainerHeightForRows(this.maxRows);
    // this.truncateHeight(this.height);
  }

  public getMainImgHeight(artwork: Artwork) {
    return this.responsiveImageService.getMainImgHeight(artwork);
  }

  public getMainImgWidth(artwork: Artwork) {
    return this.responsiveImageService.getMainImgWidth(artwork);
  }

  //truncate the gallery and display only n rows of photos
  // getPhotoHeight (photo)  {
  //   const itemStyle = window.getComputedStyle(photo);
  //   const margin =
  //     parseFloat(itemStyle.marginTop) + parseFloat(itemStyle.marginBottom);
  //   return photo.offsetHeight + margin;
  // };

  // countPhotosInRow (photo)  {
  //   const photos = Array.from(document.querySelector('ul.gallery').children);
  //   const baseOffset = photo.offsetTop;
  //   const startIndex = photos.findIndex((p) => p.offsetTop === baseOffset);
  //   const wrapIndex = photos.findIndex((p) => p.offsetTop > baseOffset);
  //   return wrapIndex === -1
  //     ? photos.length - startIndex
  //     : wrapIndex - startIndex;
  // };

  // getContainerHeightForRows (rows) {
  //   let totalHeight = 0;
  //   let photoIndex = 1;
  //   let photosInRow = 0;
  //   let photo;

  //   for (let i = 0; i < rows; i++) {
  //     photo = document.querySelector(`ul.gallery li:nth-child(${photoIndex})`);
  //     if (!photo) {
  //       break;
  //     }
  //     totalHeight += getPhotoHeight(photo);

  //     photosInRow = countPhotosInRow(photo);
  //     photoIndex += photosInRow;
  //     if (photoIndex >= props.photos.length) {
  //       break;
  //     }
  //   }

  //   return totalHeight;
  // };

  // truncateHeight (height) {
  //   const container = document.querySelector('ul.gallery');
  //   container.style.overflow = 'hidden';
  //   container.style.height = `${height}px`;
  // };
}
