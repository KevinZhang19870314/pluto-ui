import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NpCropper, ImageCropperResult } from "projects/ngx-pluto/src/lib/cropper";
import Cropper from 'cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {
  file: File;

  config: Cropper.Options = {
    aspectRatio: 1,
    dragMode: 'move',
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
    minCropBoxWidth: 200,
    minCropBoxHeight: 200,
    minCanvasWidth: 200,
    minCanvasHeight: 200,
    minContainerWidth: 200,
    minContainerHeight: 200
  };
  imageUrl: any = '//image.ipay.so/upload/ngx-pluto/images/3.png';
  croppedImgUrl = '';
  width = 200;
  height = 200;

  @ViewChild('npCropper') public npCropper: NpCropper;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onFileChanged(file: File) {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.file = file;
  }

  onUploadError($event) {
    console.log($event);
  }

  onCrop() {
    this.npCropper.exportCanvas(true, {
      width: this.width,
      height: this.height,
      maxWidth: 4096,
      maxHeight: 4096,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    });
  }

  onExportCropper(data: ImageCropperResult) {
    console.log(data);
    if (data && data.dataUrl) {
      this.croppedImgUrl = data.dataUrl;
    }
  }
}
