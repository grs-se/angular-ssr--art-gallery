import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../../core/services/artwork.service';
import { Artwork } from '../../shared/models/artwork';

@Component({
  selector: 'app-selected-work',
  templateUrl: './selected-work.component.html',
  styleUrls: ['./selected-work.component.scss'],
})
export class SelectedWorkComponent implements OnInit {
  artworks: Artwork[] = [];

  constructor(public artworkService: ArtworkService) {}

  ngOnInit() {
    this.getSelectedWorks();
  }

  getSelectedWorks() {
    this.artworkService.getSelectedArtworks().subscribe({
      next: (response) => {
        this.artworks = response.data;
        //this.totalCount = response.count;
      },
      //next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
      error: (error) => console.log(error),
    });
  }
}
