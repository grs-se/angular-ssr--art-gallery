import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
constructor() { }

FOLDER = '/';

imageUrl = "";

resData: BehaviorSubject<any> = new BehaviorSubject(null);

data = { message: "", data: "" };

constructor() { }
validateandUploadFile(file, Iheight, Iwidth) {

  let fileToUpload = file;
  if (fileToUpload.type == "image/jpeg" || fileToUpload.type == "image/png" || fileToUpload.type == "image/jpeg") {
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      var img = new Image();
      img.onload = () => {
        let width = img.width;

        let height = img.height;
        if (width <= Iwidth && height <= Iheight) {
          this.imageUrl = event.target.result;

          this.uploadfile(file);
        } else {

          this.data.message = "You can maximum upload " + Iheight + " * " + Iwidth + " File";
          this.data.data = "";
          this.resData.next(this.data);
          return this.resData;
        }
      };

      img.src = event.target.result;
    };
    reader.readAsDataURL(fileToUpload);
  } else {
    this.data.message = "You can't be able to upload file except JPG and PNG format";
    this.data.data = "";
    this.resData.next(this.data);
    return this.resData;
  }
}


uploadfile(file) {

  if (file != null) {
    const bucket = new S3(
      {
        accessKeyId: '***********************',
        secretAccessKey: '**********************************',
        region: 'us-east-2'
      }
    );
    const params = {
      Bucket: '*********',
      Key: file.name,
      Body: file,
      ACL: 'public-read'

    };
    var that = this;

    bucket.upload(params, function (err, data) {

      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }


      console.log('Successfully uploaded file.', data);
      that.data.message = "Successfully uploaded file.";
      that.data.data = data.Location;
      that.resData.next(that.data);
      return that.resData;
    });

  }

}
}
