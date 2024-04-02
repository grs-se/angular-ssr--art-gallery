import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  standalone: true,
  imports: [ImageCropperModule, NgxDropzoneModule],
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.scss'],
})
export class PhotoWidgetComponent implements OnInit {
  @Output() addFile = new EventEmitter();
  files: File[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  private fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  private dataURLtoFile(dataurl: any, filename: any): File {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //console.log('event.base64',event.base64);
  }

  public onSelect(event: any) {
    this.files = [];
    //let fileName: File = event.target.files[0].name;
    //console.log('...event.addedFiles',...event.addedFiles)
    this.files.push(...event.addedFiles);
    //console.log('this.files[0]',this.files[0]);
    this.fileChangeEvent(this.files[0]);
  }

  public onUpload() {
    //this.addFile.emit(base64ToFile(this.croppedImage));

    var b64File = this.dataURLtoFile(this.croppedImage, this.files[0].name);
    this.addFile.emit(b64File);
  }
}
