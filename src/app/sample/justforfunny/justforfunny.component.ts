import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { JustForFunnyService } from './justforfunny.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-justforfunny',
  templateUrl: './justforfunny.component.html',
  styleUrls: ['./justforfunny.component.scss']
})
export class JustForFunnyComponent implements OnInit {
  private render: Renderer2;

  imgUrl: any;
  boxShadowStyle: any = ``;

  constructor(private justforfunnyService: JustForFunnyService,
    rendererFactory: RendererFactory2,
    private sanitizer: DomSanitizer) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {

  }

  onUploadImg() {
    this.justforfunnyService.uploadFile(this.render).then((res: any) => {
      this.imgUrl = res.image;
      this.justforfunnyService.getRgbsForImg(res.image).subscribe(res => {
        let imageData = res;
        let result = ``;
        let offsetX = 0;
        let offsetY = 0;
        let step = 1;
        for (let i = 0; i < imageData.width; i += step) {
          offsetY = 0;
          for (let j = 0; j < imageData.height; j += step) {
            var index = (j * imageData.width + i) * 4;
            var red = imageData.data[index];
            var green = imageData.data[index + 1];
            var blue = imageData.data[index + 2];
            result += offsetX + `px ` + offsetY + `px 4px 5px ` + this.justforfunnyService.rgbToHex(red, green, blue) + `,`;
            offsetY += step;
          }
          offsetX += step;
        }

        this.boxShadowStyle = result.substring(0, result.length - 1);
      });
    });
  }
}
