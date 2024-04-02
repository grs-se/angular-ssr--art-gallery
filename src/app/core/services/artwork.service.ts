import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { environment } from '../../../environments/environment';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkParams } from '../../shared/models/artworkParams';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkCollection } from '../../shared/models/collection';
import { ArtworkLocation } from '../../shared/models/location';
import { Pagination } from '../../shared/models/pagination';
import { ArtworkTag } from '../../shared/models/tag';
import { ArtworkType } from '../../shared/models/type';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  baseUrl = environment.apiUrl;
  artworks: Artwork[] = [];
  categories: ArtworkCategory[] = [];
  collections: ArtworkCollection[] = [];
  types: ArtworkType[] = [];
  tags: ArtworkTag[] = [];
  mediums: ArtworkMedium[] = [];
  locations: ArtworkLocation[] = [];
  pagination?: Pagination<Artwork[]>;
  artworkParams = new ArtworkParams();
  artworkCache = new Map<string, Pagination<Artwork[]>>();
  artworkCount: number[] = [];
  allArtworksCount: number = 0;
  imagePath: string = '';
  baseURL = '';
  //urlParams$: Observable<{ [x: string]: any; }> = new Observable<{}>();

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {}

  getArtworks(
    urlPath?: string,
    params?: HttpParams | Params,
    useCache = true,
  ): Observable<Pagination<Artwork[]>> {
    if (!useCache) this.artworkCache = new Map();

    if (this.artworkCache.size > 0 && useCache) {
      if (this.artworkCache.has(Object.values(this.artworkParams).join('-'))) {
        this.pagination = this.artworkCache.get(
          Object.values(this.artworkParams).join('-'),
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    // let parsedQueryParams = queryParams.

    if (!params) {
      params = new HttpParams();

      if (this.artworkParams.categoryId)
        params = params?.append('categoryId', this.artworkParams.categoryId);
      if (this.artworkParams.collectionId)
        params = params?.append(
          'collectionId',
          this.artworkParams.collectionId,
        );
      if (this.artworkParams.locationId)
        params = params?.append('locationId', this.artworkParams.locationId);
      if (this.artworkParams.mediumId)
        params = params?.append('mediumId', this.artworkParams.mediumId);
      if (this.artworkParams.tagId)
        params = params?.append('tagId', this.artworkParams.tagId);
      if (this.artworkParams.rating)
        params = params?.append('rating', this.artworkParams.rating);
      params = params?.append('sort', this.artworkParams.sort);
      params = params?.append('pageIndex', this.artworkParams.pageNumber);
      params = params?.append('pageSize', this.artworkParams.pageSize);
      if (this.artworkParams.search)
        params = params?.append('search', this.artworkParams.search);
    }
    // }
    //console.log('params', params);

    // params = urlPath.

    let url: string;
    if (urlPath) {
      url = this.baseUrl + urlPath;
    } else {
      url = this.baseUrl + 'artworks';
    }

    // console.log(url, params);

    return this.http.get<Pagination<Artwork[]>>(url, { params }).pipe(
      map((response) => {
        this.artworkCache.set(
          Object.values(this.artworkParams).join('-'),
          response,
        );
        this.pagination = response;
        console.log(response);
        return response;
      }),
    );
  }

  getArtworksWithSearchParams(
    queryParams: string,
    useCache = true,
  ): Observable<Pagination<Artwork[]>> {
    if (!useCache) this.artworkCache = new Map();

    if (this.artworkCache.size > 0 && useCache) {
      if (this.artworkCache.has(Object.values(this.artworkParams).join('-'))) {
        this.pagination = this.artworkCache.get(
          Object.values(this.artworkParams).join('-'),
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.artworkParams.categoryId)
      params = params?.append('categoryId', this.artworkParams.categoryId);
    if (this.artworkParams.collectionId)
      params = params?.append('collectionId', this.artworkParams.collectionId);
    if (this.artworkParams.locationId)
      params = params?.append('locationId', this.artworkParams.locationId);
    if (this.artworkParams.mediumId)
      params = params?.append('mediumId', this.artworkParams.mediumId);
    if (this.artworkParams.tagId)
      params = params?.append('tagId', this.artworkParams.tagId);
    if (this.artworkParams.rating)
      params = params?.append('rating', this.artworkParams.rating);
    params = params?.append('sort', this.artworkParams.sort);
    params = params?.append('pageIndex', this.artworkParams.pageNumber);
    params = params?.append('pageSize', this.artworkParams.pageSize);
    if (this.artworkParams.search)
      params = params?.append('search', this.artworkParams.search);
    console.log('params', params);

    // let url: string;
    // if (queryParams) {
    const url = this.baseUrl + 'artworks/search';
    // const url = this.baseUrl + 'artworks/search' + queryParams;

    // }
    // } else {
    //   url = this.baseUrl + 'artworks';
    // }

    // console.log(url, params);

    return this.http.get<Pagination<Artwork[]>>(url).pipe(
      map((response) => {
        this.artworkCache.set(
          Object.values(this.artworkParams).join('-'),
          response,
        );
        this.pagination = response;
        //console.log(response);
        return response;
      }),
    );
  }

  getSelectedArtworks() {
    let params = new HttpParams();
    params = params?.append('sort', this.artworkParams.sort);

    return this.http
      .get<Pagination<Artwork[]>>(this.baseUrl + 'artworks/selected-work', {
        params,
      })
      .pipe(
        map((response) => {
          this.artworkCache.set(
            Object.values(this.artworkParams).join('-'),
            response,
          );
          //this.pagination = response;
          return response;
        }),
      );
  }

  getTopRatedArtworks() {
    let params = new HttpParams();

    if (this.artworkParams.rating)
      params = params?.append('rating', this.artworkParams.rating);

    return this.http
      .get<Pagination<Artwork[]>>(this.baseUrl + 'artworks', { params })
      .pipe(
        map((response) => {
          const topRatedArtworks = response.data.filter(
            (x) => x.ratingPersonal >= 4,
          );
          this.artworkCache.set(
            Object.values(this.artworkParams).join('-'),
            response,
          );
          this.pagination = response;
          return response;
        }),
      );
  }

  //getArtworksByCollection(useCache = true, collId: number = 1): Observable<Pagination<Artwork[]>> {

  //  if (!useCache) this.artworkCache = new Map();

  //  if (this.artworkCache.size > 0 && useCache) {
  //    if (this.artworkCache.has(Object.values(this.artworkParams).join('-'))) {
  //      this.pagination = this.artworkCache.get(Object.values(this.artworkParams).join('-'));
  //      if (this.pagination) return of(this.pagination);
  //    }
  //  }

  //  let params = new HttpParams();

  //  if (collId && this.artworkParams.collectionId <= 0) this.artworkParams.collectionId = collId;
  //  if (this.artworkParams.collectionId > 0) params = params.append('collectionId', this.artworkParams.collectionId);

  //  params = params.append('sort', this.artworkParams.sort);
  //  params = params.append('pageIndex', this.artworkParams.pageNumber);
  //  params = params.append('pageSize', this.artworkParams.pageSize);
  //  if (this.artworkParams.search) params = params.append('search', this.artworkParams.search);
  //  console.log(params);
  //  //console.log('params', params);

  //  return this.http.get<Pagination<Artwork[]>>(this.baseUrl + 'artworks', { params }).pipe(
  //    map(response => {
  //      this.artworkCache.set(Object.values(this.artworkParams).join('-'), response);
  //      this.pagination = response;
  //      return response;
  //    })
  //  );
  //}

  setArtworkParams(params: ArtworkParams) {
    // this.act
    this.artworkParams = params;
  }

  getArtworkParams() {
    // console.log('artwork params', this.artworkParams);
    return this.artworkParams;
  }

  getArtwork(id: number) {
    const artwork = [...this.artworkCache.values()].reduce(
      (acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find((x) => x.id === id) };
      },
      {} as Artwork,
    );

    if (Object.keys(artwork).length !== 0) return of(artwork);

    const response = this.http.get<Artwork>(this.baseUrl + 'artworks/' + id);
    return response;
  }

  getAllArtworksCount() {
    return this.http
      .get<number>(this.baseUrl + 'artworks/get-all-artworks-count')
      .pipe(
        map((response) => {
          this.allArtworksCount = response;
          console.log(response);
        }),
      );
  }

  getHighestRatedArtworks() {}

  getCategories() {
    if (this.categories.length > 0) return of(this.categories);

    return this.http
      .get<ArtworkCategory[]>(this.baseUrl + 'artworks/categories')
      .pipe(
        map((categories) => {
          //this.categories = categories;

          //let temp = categories;
          //const indexedCategories = categories.map((x, i) => {
          //  if (x.name === 'Madrid') i = 0;
          //  if (x.name === 'Winchester') i = 1;
          //  return;
          //});

          //console.log(indexedCategories);
          //return this.categories = indexedCategories;
          return (this.categories = categories);
        }),
      );
  }

  getCollections(ids?: number[]) {
    if (this.collections.length > 0) return of(this.collections);

    return this.http
      .get<ArtworkCollection[]>(this.baseUrl + 'artworks/collections')
      .pipe(
        map((collections) => {
          //console.log(ids);

          // collections = collections.filter((x) => ids?.includes(x.id));
          // console.log('gs collections', collections);

          return (this.collections = collections);
        }),
      );
  }

  getTags() {
    if (this.tags.length > 0) return of(this.tags);

    return this.http
      .get<ArtworkTag[]>(this.baseUrl + 'artworks/tags')
      .pipe(map((tags) => (this.tags = tags)));
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types);

    return this.http
      .get<ArtworkType[]>(this.baseUrl + 'artworks/types')
      .pipe(map((types) => (this.types = types)));
  }

  getLocations() {
    if (this.locations.length > 0) return of(this.locations);

    return this.http
      .get<ArtworkLocation[]>(this.baseUrl + 'artworks/locations')
      .pipe(map((locations) => (this.locations = locations)));
  }

  getMediums() {
    if (this.mediums.length > 0) return of(this.mediums);

    return this.http
      .get<ArtworkMedium[]>(this.baseUrl + 'artworks/mediums')
      .pipe(map((mediums) => (this.mediums = mediums)));
  }
}
