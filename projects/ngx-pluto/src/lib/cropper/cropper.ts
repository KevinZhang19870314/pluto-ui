import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import Cropper from 'cropperjs';

/**
 * 图片剪裁组件
 */
@Component({
  selector: `np-cropper`,
  templateUrl: 'cropper.html',
  styleUrls: ['cropper.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpCropper implements OnInit {
  @ViewChild('image') image: ElementRef;

  @Input() imageUrl: any;
  @Input() cropbox: Cropper.CropBoxData;
  @Input() loadImageErrorText: string;
  @Input() cropperOptions: Cropper.Options = {};

  @Output() export = new EventEmitter<ImageCropperResult>();
  @Output() ready = new EventEmitter();

  public isLoading: boolean = true;
  public cropper: Cropper;
  public imageElement: HTMLImageElement;
  public loadError: any;

  constructor() { }

  ngOnInit() {
  }

  /**
     * Image loaded
     * @param ev
     */
  imageLoaded(ev: Event) {
    // Unset load error state
    this.loadError = false;
    // Setup image element
    const image = ev.target as HTMLImageElement;
    this.imageElement = image;
    // Add crossOrigin?
    if (this.cropperOptions.checkCrossOrigin) {
      image.crossOrigin = 'anonymous';
    }

    // Image on ready event
    image.addEventListener('ready', () => {
      // Emit ready
      this.ready.emit(true);
      // Unset loading state
      this.isLoading = false;
      // Validate cropbox existance
      if (this.cropbox) {
        // Set cropbox data
        this.cropper.setCropBoxData(this.cropbox);
      }
    });

    // Set crop options
    // extend default with custom config
    this.cropperOptions = Object.assign({
      checkCrossOrigin: true
    }, this.cropperOptions);

    // Set cropperjs
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = undefined;
    }
    this.cropper = new Cropper(image, this.cropperOptions);
  }

  /**
   * Image load error
   * @param event
   */
  imageLoadError(event: any) {
    // Set load error state
    this.loadError = true;
    // Unset loading state
    this.isLoading = false;
  }

  /**
   * Export canvas
   * @param base64
   */
  exportCanvas(base64?: boolean, options?: Cropper.GetCroppedCanvasOptions) {
    // Get and set image, crop and canvas data
    const imageData = this.cropper.getImageData();
    const cropData = this.cropper.getCropBoxData();
    const canvas = this.cropper.getCroppedCanvas(options);
    const data = { imageData, cropData, blob: null };

    // Create promise to resolve canvas data
    const promise = new Promise(resolve => {
      // Validate base64
      if (base64) {
        canvas.toBlob(blob => resolve({ blob, dataUrl: canvas.toDataURL('image/png') }));
      }
      canvas.toBlob(blob => resolve({ blob }));
    });

    // Emit export data when promise is ready
    promise.then(res => {
      this.export.emit(Object.assign(data, res));
    });
  }
}

export interface ImageCropperResult {
  imageData: Cropper.ImageData;
  cropData: Cropper.CropBoxData;
  blob: Blob;
  dataUrl?: string;
}

