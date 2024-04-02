import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../core/services/artwork.service';
import { Artwork } from '../shared/models/artwork';
import { ArtworkParams } from '../shared/models/artworkParams';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  artworks: Artwork[] = [];
  totalCount = 0;
  artworkParams: ArtworkParams;

  constructor(private adminService: AdminService) {
    this.artworkParams = this.adminService.getArtworkParams();
  }
  ngOnInit(): void {
    this.getArtworks();
  }

  getArtworks(useCache = false) {
    this.adminService.getArtworks(useCache).subscribe({
      next: response => {
        this.artworks = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onPageChanged(event: any) {
    const params = this.adminService.getArtworkParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.adminService.setArtworkParams(params);
      this.getArtworks(true);
    }
  }

  deleteArtwork(id: number) {
    this.adminService.deleteArtwork(id).subscribe((response: any) => {
      this.artworks.splice(this.artworks.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }

  addToArchive(id: number) {
    console.log(id);
    this.adminService.addToArchive(id).subscribe({
      next: (artwork: any) => {
        this.artworks[id] = artwork;
      }
    });
  }

  removeFromArchive(id: number) {
    console.log(id);
    this.adminService.removeFromArchive(id).subscribe({
      next: (artwork: any) => {
        this.artworks[id] = artwork;
      }
    });
    //const id = this.activatedRoute.snapshot.paramMap.get('id');
    //if (id) this.adminService.removeFromArchive(+id).subscribe({
    //  next: (artwork: any) => {
    //    this.artwork = artwork;
    //  }
    //});
  }

  //getArtwork(id: number) {
  //  this.adminService.getArtwork(id).subscribe((response: any) => {
  //    this.artworks.findIndex(p => p.id === id);
  //  });
  //}
}
