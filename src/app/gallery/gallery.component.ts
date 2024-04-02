import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../account/account.service';
import { AppConfigService } from '../core/services/app-config.service';
import { ArtworkService } from '../core/services/artwork.service';
import { Artwork } from '../shared/models/artwork';
import { ArtworkParams } from '../shared/models/artworkParams';
import { ArtworkCategory } from '../shared/models/category';
import { ArtworkCollection } from '../shared/models/collection';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  artworks: Artwork[] = [];
  categories: ArtworkCategory[] = [];
  collections: ArtworkCollection[] = [];
  artworkParams: ArtworkParams;
  galleryMode: string = 'grid';
  totalCount = 0;

  constructor(
    public artworkService: ArtworkService,
    public galleryService: GalleryService,
    private title: Title,
    public accountService: AccountService,
    public appConfigService: AppConfigService,
  ) {
    this.artworkParams = artworkService.getArtworkParams();

  }

  ngOnInit(): void {
    this.title.setTitle('Gallery');
    this.getCategories();
    this.getCollections();
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (response) => (this.categories = [...response]),
      error: (error) => console.log(error),
    });
  }

  getCollections() {
    this.artworkService.getCollections().subscribe({
      next: (response) => (this.collections = [...response]),
      error: (error) => console.log(error),
    });
  }

  scrollUp(event?: any) {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
}
