import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkService } from '../../core/services/artwork.service';
import { ArtworkParams } from '../../shared/models/artworkParams';
import { EventService } from '../../core/services/event.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  categories: ArtworkCategory[] = [];
  categoriesCount: number = 0;
  artworks: Artwork[] = [];
  totalCount = 0;
  //artworkParams: ArtworkParams;

  constructor(
    public artworkService: ArtworkService,
    public eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getArtworks();
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (response: ArtworkCategory[]) => {
        this.categories = [...response];
        this.categoriesCount = this.categories.length;
      },
      error: (error: Error) => console.log(error)
    });
  }

  getCategoriesCount() {

  }

  onCategorySelected(catId: number) {
    const params = this.artworkService.getArtworkParams();
    params.categoryId = catId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
/*    this.eventService.categorySelected.next(catId);*/
  }

  // Replace with more efficient indexing to get totalCount;
  getArtworks() {
    this.artworkService.getArtworks().subscribe({
      next: response => {
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  //reset() {
  //  this.artworkParams = new ArtworkParams();
  //  this.artworkService.setArtworkParams(this.artworkParams);
  //  this.getArtworks();
  //}
}
