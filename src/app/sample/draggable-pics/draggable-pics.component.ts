import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-draggable-pics',
  templateUrl: './draggable-pics.component.html',
  styleUrls: ['./draggable-pics.component.scss']
})
export class DraggablePicsComponent implements OnInit {

  items = [
    { url: 'assets/images/draggable-pics/1.png' },
    { url: 'assets/images/draggable-pics/2.png' },
    { url: 'assets/images/draggable-pics/3.png' },
    { url: 'assets/images/draggable-pics/4.png' },
    { url: 'assets/images/draggable-pics/5.png' },
    { url: 'assets/images/draggable-pics/6.png' },
    { url: 'assets/images/draggable-pics/7.png' },
    { url: 'assets/images/draggable-pics/8.png' }
  ];

  dynaticItems = [];
  imgUrl: any = "";
  imgFile = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  onImgFileChange($event) {
    console.log($event);
    this.imgFile = $event;
    if (this.imgFile) {
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.imgFile)
      );

      this.dynaticItems.push({ url: this.imgUrl, file: this.imgFile });
    }
  }

  onUploadErrorMessage($event: any) {
    alert($event);
    this.imgUrl = null;
  }
}
