export interface Artwork {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  // medium: string;
  artworkMedium: string;
  dateProduced: Date;
  heightCm: number;
  widthCm: number;
  //locationId: number;
  locationProduced: string;
  artworkCategory: string;
  artworkCollection: string;
  artworkTags?: string[];
  artworkType: any;
  date: Date;
  images: Image[];
  isArchived: boolean;
  artworkState: string;
  ratingPersonal: number;
}

export interface Image {
  id: number;
  imageUrl: string;
  fileName: string;
  isMain: boolean;
  heightPx: number;
  widthPx: number;
  // focus on api is enum: top=0,right=1,bottom=2,left=3,center=4
  focus: ImageFocus;
}

export enum ImageFocus {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  CENTER = 'center',
}

export interface ISize {
  width: number;
  height: number;
}

export interface ArtworkToCreate {
  id?: number;
  title?: string;
  description?: string;
  price: number;
  // Placeholder.png means do not need image property
  //image: Image;
  imageUrl: string;
  medium?: string;
  artworkMediumId?: number;
  dateProduced?: Date;
  heightCm?: number;
  widthCm?: number;
  locationId?: number;
  //locationProduced?: string;
  artworkCategoryId?: number;
  artworkCollectionId?: number;
  artworkTypeId?: number;
  artworkTagIds?: number[];
  isArchived?: boolean;
  ratingPersonal?: number;
}

export class ArtworkFormValues implements ArtworkToCreate {
  id? = 1;
  title? = '';
  description? = '';
  price = 0;
  //image = new Image;
  imageUrl = '';
  medium? = '';
  artworkMediumId? = 1;
  dateProduced? = new Date();
  heightCm = 0;
  widthCm = 0;
  //locationProduced? = '';
  locationProducedId? = 1;
  artworkCategoryId? = 1;
  artworkCollectionId? = 1;
  artworkTypeId? = 1;
  artworkTagIds? = [1];
  isArchived? = false;
  ratingPersonal? = 0;

  constructor(init?: ArtworkFormValues) {
    Object.assign(this, init);
  }
}
