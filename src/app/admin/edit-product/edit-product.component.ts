import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { ArtworkLocation } from 'src/app/shared/models/location';
import { ArtworkService } from '../../core/services/artwork.service';
import { Artwork, ArtworkFormValues } from '../../shared/models/artwork';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkCollection } from '../../shared/models/collection';
import { ArtworkTag } from '../../shared/models/tag';
import { ArtworkType } from '../../shared/models/type';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditArtworkComponent implements OnInit {
  artwork!: Artwork;
  artworkFormValues?: ArtworkFormValues;
  categories?: ArtworkCategory[];
  collections?: ArtworkCollection[];
  types?: ArtworkType[];
  tags?: ArtworkTag[] = [];
  locations?: ArtworkLocation[] = [];
  mediums?: ArtworkMedium[] = [];

  constructor(
    private adminService: AdminService,
    private artworkService: ArtworkService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.artworkFormValues = new ArtworkFormValues();
  }

  ngOnInit(): void {
    const categories = this.getCategories();
    const collections = this.getCollections();
    const tags = this.getTags();
    const types = this.getTypes();
    const locations = this.getLocations();
    const mediums = this.getMediums();

    forkJoin([
      categories,
      tags,
      types,
      collections,
      locations,
      mediums,
    ]).subscribe({
      next: (results) => {
        this.categories = results[0];
        this.tags = results[1];
        this.types = results[2];
        this.collections = results[3];
        this.locations = results[4];
        this.mediums = results[5];
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        if (this.activatedRoute.snapshot.url[0].path === 'edit') {
          this.loadArtwork();
        }
      },
    });
  }

  updatePrice(event: any) {
    if (this.artwork) this.artwork.price = event;
  }

  loadArtwork() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.artworkService.getArtwork(+id).subscribe({
        next: (response: any) => {
          const categoryId =
            this.categories &&
            this.categories.find((x) => x.name === response.artworkCategory)
              ?.id;
          const collectionId =
            this.collections &&
            this.collections.find((x) => x.name === response.artworkCollection)
              ?.id;
          // tagsId is now an array (i.e.: tagIds): Fix this!
          const tagsId =
            this.types &&
            this.types.find((x) => x.name === response.artworkTags)?.id;
          const typeId =
            this.types &&
            this.types.find((x) => x.name === response.artworkType)?.id;
          const locationId =
            this.locations &&
            this.locations.find((x) => x.name === response.locationProduced)
              ?.id;
          const mediumId =
            this.mediums &&
            this.mediums.find((x) => x.name === response.artworkMedium)?.id;
          this.artwork = response;
          this.artworkFormValues = {
            ...response,
            categoryId,
            tagsId,
            typeId,
            collectionId,
            locationId,
            mediumId,
          };
          // console.log(this.artworkFormValues);
        },
      });
  }

  getCategories() {
    return this.artworkService.getCategories();
  }

  getCollections() {
    return this.artworkService.getCollections();
  }

  getTags() {
    return this.artworkService.getTags();
  }

  getTypes() {
    return this.artworkService.getTypes();
  }

  getLocations() {
    return this.artworkService.getLocations();
  }

  getMediums() {
    return this.artworkService.getMediums();
  }

  // onSubmit(artwork: ArtworkFormValues) {
  //   const id = this.activatedRoute.snapshot.paramMap.get('id');
  //   if (this.activatedRoute.snapshot.url[0].path === 'edit') {
  //     const updatedArtwork = {
  //       ...this.artwork,
  //       ...artwork,
  //       price: +artwork.price,
  //     };
  //     if (id)
  //       this.adminService
  //         .updateArtwork(updatedArtwork, +id)
  //         .subscribe((response: any) => {
  //           this.router.navigate(['/admin']);
  //         });
  //   } else {
  //     const newArtwork = { ...artwork, price: +artwork.price };
  //     this.adminService.createArtwork(newArtwork).subscribe((response: any) => {
  //       this.router.navigate(['/admin']);
  //     });
  //   }
  // }
}
