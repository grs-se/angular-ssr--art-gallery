import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../shared/models/artwork';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-photos',
  //imports: [PhotoWidgetComponent],
  templateUrl: './edit-product-photos.component.html',
  styleUrls: ['./edit-product-photos.component.scss'],
})
export class EditArtworkPhotosComponent implements OnInit {
  @Input()
  artwork?: Artwork;
  progress = 0;
  addImageMode = false;

  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  addImageModeToggle() {
    this.addImageMode = !this.addImageMode;
  }

  uploadFile(file: File) {
    if (this.artwork) {
      this.adminService.uploadImage(file, this.artwork.id).subscribe({
        next: (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(
                (event.loaded / (event.total as number)) * 100,
              );
              break;
            case HttpEventType.Response:
              this.artwork = event.body;
              setTimeout(() => {
                this.progress = 0;
                this.addImageMode = false;
              }, 1500);
          }
        },
        error: (error) => {
          if (error.errors) {
            this.toast.error(error.errors[0]);
          } else {
            this.toast.error('Problem uploading image');
          }
          this.progress = 0;
        },
      });
    } else {
      this.adminService.uploadImage(file).subscribe({
        next: (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(
                (event.loaded / (event.total as number)) * 100,
              );
              break;
            case HttpEventType.Response:
              this.artwork = event.body;
              setTimeout(() => {
                this.progress = 0;
                this.addImageMode = false;
                this.router.navigate(['/admin/edit/' + this.artwork?.id]);
              }, 1500);
          }
        },
        error: (error) => {
          if (error.errors) {
            this.toast.error(error.errors[0]);
          } else {
            this.toast.error('Problem uploading image');
          }
          this.progress = 0;
        },
      });
    }
  }

  deleteImage(imageId: number) {
    if (this.artwork)
      this.adminService.deleteArtworkImage(imageId, this.artwork.id).subscribe({
        next: () => {
          const imageIndex = this.artwork!.images.findIndex(
            (x) => x.id === imageId,
          );
          this.artwork?.images.splice(imageIndex, 1);
        },
        error: (error) => {
          this.toast.error('Problem deleting image');
          console.log(error);
        },
      });
  }

  setMainImage(imageId: number) {
    if (this.artwork)
      this.adminService.setMainImage(imageId, this.artwork.id).subscribe({
        next: (artwork: any) => {
          this.artwork = artwork;
        },
      });
  }
}
