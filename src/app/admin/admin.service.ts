import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Artwork, ArtworkFormValues } from '../shared/models/artwork';
import { ArtworkMedium } from '../shared/models/artworkMedium';
import { ArtworkParams } from '../shared/models/artworkParams';
import { ArtworkCategory } from '../shared/models/category';
import { ArtworkCollection } from '../shared/models/collection';
import { ArtworkLocation } from '../shared/models/location';
import { Pagination } from '../shared/models/pagination';
import { ArtworkTag } from '../shared/models/tag';
import { ArtworkType } from '../shared/models/type';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  artworks: Artwork[] = [];
  categories: ArtworkCategory[] = [];
  collections: ArtworkCollection[] = [];
  types: ArtworkType[] = [];
  tags: ArtworkTag[] = [];
  pagination?: Pagination<Artwork[]>;
  artworkParams = new ArtworkParams();
  artworkCache = new Map<string, Pagination<Artwork[]>>();

  constructor(private http: HttpClient) {}

  getArtworks(useCache = true): Observable<Pagination<Artwork[]>> {
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

    if (this.artworkParams.categoryId > 0)
      params = params.append('categoryId', this.artworkParams.categoryId);
    if (this.artworkParams.tagId)
      params = params.append('tagId', this.artworkParams.tagId);
    params = params.append('sort', this.artworkParams.sort);
    params = params.append('pageIndex', this.artworkParams.pageNumber);
    params = params.append('pageSize', this.artworkParams.pageSize);
    if (this.artworkParams.search)
      params = params.append('search', this.artworkParams.search);

    return this.http
      .get<Pagination<Artwork[]>>(this.baseUrl + 'artworks/get-all-as-admin', {
        params,
      })
      .pipe(
        map((response) => {
          this.artworkCache.set(
            Object.values(this.artworkParams).join('-'),
            response,
          );
          this.pagination = response;
          return response;
        }),
      );
  }

  setArtworkParams(params: ArtworkParams) {
    this.artworkParams = params;
  }

  getArtworkParams() {
    return this.artworkParams;
  }

  createArtwork(artwork: ArtworkFormValues) {
    return this.http.post(this.baseUrl + 'artworks', artwork);
  }

  updateArtwork(artwork: ArtworkFormValues, id: number) {
    return this.http.put(this.baseUrl + 'artworks/' + id, artwork);
  }

  deleteArtwork(id: number) {
    return this.http.delete(this.baseUrl + 'artworks/' + id);
  }

  //uploadImage(file: File, id?: number) {
  //  const formData = new FormData();
  //  console.log(file.name);
  //  formData.append('image', file, file.name + '.png');
  //  return this.http.put((id ?
  //    this.baseUrl + 'artworks/' + id + '/image'
  //    : this.baseUrl + 'artworks/'),
  //    formData, {
  //    reportProgress: true,
  //    observe: 'events'
  //  });
  //}

  uploadImage(file: File, id?: number) {
    const formData = new FormData();
    formData.append('image', file, file.name);
    console.log('file.name', file.name);
    if (id) {
      return this.http.put(
        this.baseUrl + 'artworks/' + id + '/image',
        formData,
        {
          reportProgress: true,
          observe: 'events',
        },
      );
    } else {
      return this.http.post(this.baseUrl + 'artworks/', formData, {
        reportProgress: true,
        observe: 'events',
      });
    }
  }

  deleteArtworkImage(imageId: number, artworkId: number) {
    return this.http.delete(
      this.baseUrl + 'artworks/' + artworkId + '/image/' + imageId,
    );
  }

  setMainImage(imageId: number, artworkId: number) {
    return this.http.post(
      this.baseUrl + 'artworks/' + artworkId + '/image/' + imageId,
      {},
    );
  }

  addToArchive(artworkId: number) {
    //console.log(this.baseUrl + 'artworks/add-to-archive/' + artworkId);
    return this.http.put(
      this.baseUrl + 'artworks/add-to-archive/' + artworkId,
      {},
    );
  }

  removeFromArchive(artworkId: number) {
    //console.log(this.baseUrl + 'artworks/add-to-archive/' + artworkId);
    return this.http.put(
      this.baseUrl + 'artworks/remove-from-archive/' + artworkId,
      {},
    );
  }

  getCategories() {
    if (this.categories.length > 0) return of(this.categories);

    return this.http
      .get<ArtworkCategory[]>(this.baseUrl + 'artworks/categories')
      .pipe(map((categories) => (this.categories = categories)));
  }

  getCollections() {
    if (this.collections.length > 0) return of(this.collections);

    return this.http
      .get<ArtworkCategory[]>(this.baseUrl + 'artworks/collections')
      .pipe(map((collections) => (this.collections = collections)));
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

  addCategory(category: ArtworkCategory) {
    return this.http.post(this.baseUrl + 'artworks/categories', category);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'artworks/categories/' + id);
  }

  addCollection(collection: ArtworkCollection) {
    return this.http.post(this.baseUrl + 'artworks/collections', collection);
  }

  deleteCollection(id: number) {
    return this.http.delete(this.baseUrl + 'artworks/collections/' + id);
  }

  addLocation(location: ArtworkLocation) {
    return this.http.post(this.baseUrl + 'artworks/locations', location);
  }

  addMedium(medium: ArtworkMedium) {
    return this.http.post(this.baseUrl + 'artworks/mediums', medium);
  }

  //getArtwork(id: number) {
  //  return this.http.get(this.baseUrl + 'artworks/' + id);
  //}
}
