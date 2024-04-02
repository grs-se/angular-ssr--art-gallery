import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkCollection } from '../../shared/models/collection';
import { ArtworkService } from '../../core/services/artwork.service';
//type DropDownOption = {
//  id?: number;
//  name?: string;
//  count?: number;
//}

@Component({
  selector: 'app-gallery-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss']
})
//export class GalleryOverviewComponent<TData extends DropDownOption> implements OnInit {

export class GalleryOverviewComponent implements OnInit {
  categories: ArtworkCategory[] = [];
  artworks: Artwork[] = [];
  totalCount = 0;
  //@Output('onClick') onClick: EventEmitter<string> = new EventEmitter();
  //@Input() data: TData[] = [];
  //@Input() routeParams?= '';

  constructor(public artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getArtworks();
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: response => {
        this.categories = [...response];
      },
      error: error => console.log(error)
    });
  }

  getCategoriesCount() {

  }

  onCategorySelected(catId: number) {
    const params = this.artworkService.getArtworkParams();
    params.categoryId = catId;
    params.pageNumber = 1;
    this.artworkService.setArtworkParams(params);
    //this.artworkParams = params;
    //this.getArtworks();
  }

  getArtworks() {
    this.artworkService.getArtworks().subscribe({
      next: response => {
        this.artworks = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  getCategoryThumbnails() {
    //this.categories.forEach(c => c.id === this.artworks.filter(p => p.artworkCategory) ? c.thumbnailUrl =  

    
  }

}
