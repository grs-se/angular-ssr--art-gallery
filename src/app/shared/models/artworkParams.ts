export class ArtworkParams {
  categoryId = 0;
  categoryName = '';
  collectionId = 0;
  collectionName = '';
  locationId = 0;
  locationName = '';
  mediumId = 0;
  mediumName = '';
  tagId = 0;
  typeId = 0;
  rating = 0;
  sort = 'dateDesc';
  pageNumber = 1;
  pageSize = 48;
  search = '';
}

export interface SortOption {
  name: string;
  value: string;
}

export class AdvancedSearchFormValues {
  id? = 0;
  title? = '';
  description? = '';
  priceFrom? = 0;
  priceTo? = 1000;
  //image = new Image;
  // imageUrl? = '';
  mediumId = 0;
  dateFrom? = new Date();
  dateTo? = new Date();
  heightCm? = 0;
  widthCm? = 0;
  //locationProduced? = '';
  locationId = 0;
  categoryId = 0;
  collectionId = 0;
  typeId? = 0;
  tagIds? = [1];
  rating? = 0;
  sort = 'dateDesc';
  pageNumber = 1;
  pageSize = 48;
  search = '';
  // isArchived? = false;
  // ratingPersonal? = 0;

  constructor(init?: AdvancedSearchFormValues) {
    Object.assign(this, init);
  }
}
//export SortOptions {
//  [
//   { name: 'Alphabetical', value: 'name' },
//    { name: 'Newest to oldest', value: 'dateDesc' },
//    { name: 'Oldest to newest', value: 'dateAsc' },
//    { name: 'Price: Low to high', value: 'priceAsc' },
//    { name: 'Price: High to low', value: 'priceDesc' },
//  ]
//}
