import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveImageService {
  imagePath: string = '';
  breakpoint: any;
  baseURL = '';

  constructor(
    public breakpointObserver: BreakpointObserver,
    private appConfigService: AppConfigService,
  ) {}

  public setImgHeight() {
    // Pseudo code
    //if (ChildElRef.imgDims === trueAspectRatio {
    //this.calculateAspectRatio(artwork) * getMainImgHeight(artwork)) /
              //cardImgHeight) * 100
  //} )
  //if (ChildElRef.imgDims === croppedGrid {
    // ...
//})
  }

  public getMainImg(artwork: Artwork) {
    return artwork.images[artwork.images.findIndex((x) => x.isMain)];
  }

  public getMainImgHeight(artwork: Artwork, cardImgHeight: number = 250) {
    const imgHeightDB =
      this.getMainImg(artwork).heightPx;
    if (imgHeightDB != undefined && imgHeightDB != 0 && imgHeightDB != null) {
      return imgHeightDB;
    }
    return cardImgHeight;
  }

  public getMainImgWidth(artwork: Artwork, cardImgWidth: number = 350) {
    const imgWidthDB =
      this.getMainImg(artwork).widthPx;
    if (imgWidthDB != undefined && imgWidthDB != 0 && imgWidthDB != null) {
      return imgWidthDB;
    }
    return cardImgWidth;
  }

  // BE CAREFUL WITH CALLING / ENABLING THIS METHOD AS IT CAN ACCRUE X000's
  // OF CLOUDINARY TRANSFORMATIONS IN ONE DAY, $$$$!!!!
  // INSTEAD OF USING CLOUDINARIES TRANSFORMATIONS I COULD SLIDE THE URL
  // AND INPUT AN ALTERNATE DIRECTORY WITH LOWER QUALITY LOWER RESOLUTION IMAGES.

  public setMediaTransformations(artworks: Artwork[]) {
    return artworks?.forEach((x) => {
      //let baseURL = x.imageUrl;
      //let imagePath;
      //this.imageHeight = 500;
      //this.imageWidth = 400;
      // Be careful with this, overriding the original x.imageUrl
      // this may result in lossy quality.
      let url = x.imageUrl.split('/');
      let insertIndex = url.indexOf('upload');
      const options = 'f_auto,q_auto';
      url.splice(insertIndex + 1, 0, options);
      x.imageUrl = url.join('/');
    });
  }

  public setResponsiveGalleryImages(artworks: Artwork[]) {
    //if (this.appConfigService.responsiveImagesEnabled) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        artworks?.forEach((x) => {
          //let baseURL = x.imageUrl;
          //let imagePath;
          if (result.breakpoints[Breakpoints.XSmall]) {
            // Temporalily assign same w_600 value to all to reduce transformaetion count until intersection observer directive solution sorted
            // Be careful with this, overriding the original x.imageUrl
            // this may result in lossy quality.
            let url = x.imageUrl.split('/');
            let insertIndex = url.indexOf('upload');
            const options = 'w_470,c_limit,f_auto,fl_lossy,q_auto';
            url.splice(insertIndex + 1, 0, options);
            x.imageUrl = url.join('/');
            this.breakpoint = Breakpoints.XSmall;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            let url = x.imageUrl.split('/');
            let insertIndex = url.indexOf('upload');
            const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
            url.splice(insertIndex + 1, 0, options);
            x.imageUrl = url.join('/');
            this.breakpoint = Breakpoints.Small;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            let url = x.imageUrl.split('/');
            let insertIndex = url.indexOf('upload');
            const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
            url.splice(insertIndex + 1, 0, options);
            x.imageUrl = url.join('/');
            this.breakpoint = Breakpoints.Medium;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            let url = x.imageUrl.split('/');
            let insertIndex = url.indexOf('upload');
            const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
            url.splice(insertIndex + 1, 0, options);
            x.imageUrl = url.join('/');
            this.breakpoint = Breakpoints.Large;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            let url = x.imageUrl.split('/');
            let insertIndex = url.indexOf('upload');
            const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
            url.splice(insertIndex + 1, 0, options);
            x.imageUrl = url.join('/');
            this.breakpoint = Breakpoints.XLarge;
          }
        });
      });
    return artworks;
    //} else return;
  }
}

//            public setResponsiveGalleryImages(artworks: Pagination<Artwork[]>) {
//  //if (this.appConfigService.responsiveImagesEnabled) {
//  this.breakpointObserver.observe([
//    Breakpoints.XSmall,
//    Breakpoints.Small,
//    Breakpoints.Medium,
//    Breakpoints.Large,
//    Breakpoints.XLarge
//  ]).subscribe(result => {
//    artworks?.data.forEach(x => {
//      //let baseURL = x.imageUrl;
//      //let imagePath;
//      if (result.breakpoints[Breakpoints.XSmall]) {
//        //this.imageHeight = 500;
//        //this.imageWidth = 400;
//        // Be careful with this, overriding the original x.imageUrl
//        // this may result in lossy quality.
//        let url = x.imageUrl.split('/');
//        let insertIndex = url.indexOf('upload');
//        const options = 'w_400,c_limit,f_auto,fl_lossy,q_auto';
//        url.splice(insertIndex + 1, 0, options);
//        x.imageUrl = url.join('/');
//        this.breakpoint = Breakpoints.XSmall;
//      }
//      if (result.breakpoints[Breakpoints.Small]) {
//        let url = x.imageUrl.split('/');
//        let insertIndex = url.indexOf('upload');
//        const options = 'w_600,c_limit,f_auto,fl_lossy,q_auto';
//        url.splice(insertIndex + 1, 0, options);
//        x.imageUrl = url.join('/');
//        this.breakpoint = Breakpoints.Small;
//      }
//      if (result.breakpoints[Breakpoints.Medium]) {
//        let url = x.imageUrl.split('/');
//        let insertIndex = url.indexOf('upload');
//        const options = 'w_960,c_limit,f_auto,fl_lossy,q_auto';
//        url.splice(insertIndex + 1, 0, options);
//        x.imageUrl = url.join('/');
//        this.breakpoint = Breakpoints.Medium;
//      }
//      if (result.breakpoints[Breakpoints.Large]) {
//        let url = x.imageUrl.split('/');
//        let insertIndex = url.indexOf('upload');
//        const options = 'w_1200,c_limit,f_auto,fl_lossy,q_auto';
//        url.splice(insertIndex + 1, 0, options);
//        x.imageUrl = url.join('/');
//        this.breakpoint = Breakpoints.Large;
//      }
//      if (result.breakpoints[Breakpoints.XLarge]) {
//        let url = x.imageUrl.split('/');
//        let insertIndex = url.indexOf('upload');
//        const options = 'w_1600,c_limit,f_auto,fl_lossy,q_auto';
//        url.splice(insertIndex + 1, 0, options);
//        x.imageUrl = url.join('/');
//        this.breakpoint = Breakpoints.XLarge;
//      }
//    });
//  });
//  return artworks;
//  //} else return;
//}
