import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtworkMedium } from 'src/app/shared/models/artworkMedium';
import { ArtworkLocation } from 'src/app/shared/models/location';
import { ArtworkService } from '../../core/services/artwork.service';
import { ArtworkFormValues } from '../../shared/models/artwork';
import { ArtworkCategory } from '../../shared/models/category';
import { ArtworkCollection } from '../../shared/models/collection';
import { ArtworkTag } from '../../shared/models/tag';
import { ArtworkType } from '../../shared/models/type';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditArtworkFormComponent implements OnInit {
  @Input() artwork?: ArtworkFormValues;
  @Input() categories?: ArtworkCategory[];
  @Input() collections?: ArtworkCollection[];
  @Input() locations?: ArtworkLocation[];
  @Input() types?: ArtworkType[];
  @Input() tags?: ArtworkTag[];
  @Input() mediums?: ArtworkMedium[] = [];
  //@Input() image
  maxDate: Date = new Date();
  progress = 0;
  addImageMode = false;
  addCategoryMode = false;
  addCollectionMode = false;
  addLocationMode = false;
  addMediumMode = false;

  //name = "Tags input";
  //tagsInput = [];
  //maxTags = 5;
  //header = 'Tags input';
  //placeholder = "Enter tags";
  //mode = "success";

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private artworkService: ArtworkService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.artworkService.getArtwork(+id);
  }

  updatePrice(event: any) {
    if (this.artwork) this.artwork.price = event;
  }

  onSubmit(artwork: ArtworkFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedArtwork = {
        ...this.artwork,
        ...artwork,
        price: +artwork.price,
      };
      const id = this.route.snapshot.paramMap.get('id');
      if (id)
        this.adminService
          .updateArtwork(updatedArtwork, +id)
          .subscribe((response: any) => {
            this.router.navigate(['/admin']);
          });
    } else {
      //this.uploadFile()
      const newArtwork = { ...artwork, price: +artwork.price };
      this.adminService.createArtwork(newArtwork).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }

  //uploadFile(file: File) {
  //  if (this.artwork && this.artwork.id)
  //    this.adminService.uploadImage(file, this.artwork.id).subscribe({
  //      next: (event: HttpEvent<any>) => {
  //        switch (event.type) {
  //          case HttpEventType.UploadProgress:
  //            this.progress = Math.round(event.loaded / (event.total as number) * 100);
  //            break;
  //          case HttpEventType.Response:
  //            this.artwork = event.body;
  //            setTimeout(() => {
  //              this.progress = 0;
  //              this.addImageMode = false;
  //            }, 1500);
  //        }
  //      }, error: error => {
  //        if (error.errors) {
  //          this.toast.error(error.errors[0]);
  //        } else {
  //          this.toast.error('Problem uploading image');
  //        }
  //        this.progress = 0;
  //      }
  //    });
  //}

  addToArchive() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.adminService.addToArchive(+id).subscribe({
        next: (artwork: any) => {
          this.artwork = artwork;
        },
      });
  }

  removeFromArchive() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.adminService.removeFromArchive(+id).subscribe({
        next: (artwork: any) => {
          this.artwork = artwork;
        },
      });
  }

  toggleAddCategoryMode() {
    this.addCategoryMode = true;
  }

  toggleAddCollectionMode() {
    this.addCollectionMode = true;
  }

  toggleAddLocationMode() {
    this.addLocationMode = !this.addLocationMode;
  }

  toggleAddMediumMode() {
    this.addMediumMode = !this.addMediumMode;
  }

  addCategory(category: ArtworkCategory) {
    this.addCategoryMode = true;
    this.adminService.addCategory(category);
    // reset to default i.e. toggle false, when user clicks on window or after time limit
  }
  addCollection(collection: ArtworkCollection) {
    this.addCollectionMode = true;
    this.adminService.addCollection(collection);
    // reset to default i.e. toggle false, when user clicks on window or after time limit
  }
  addLocation(location: ArtworkLocation) {
    this.addLocationMode = true;
    this.adminService.addLocation(location);
  }
  //displayTags(tag: any) {
  //  this.tagsInput = tag;
  //}

  addMedium(medium: ArtworkMedium) {
    this.addMediumMode = true;
    this.adminService.addMedium(medium);
  }

  onTagsChanged(event: any) {}

  //onPageChanged(event: any) {
  //  const params = this.artworkService.getArtworkParams();
  //  if (params.pageNumber !== event) {
  //    params.pageNumber = event;
  //    this.artworkService.setArtworkParams(params);
  //    this.getArtworks(true);
  //  }
}
