import { Injectable, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JustForFunnyService {

    constructor() { }

    // return a promise with the new image data
    uploadFile(render: Renderer2): Promise<{ image: any }> {
        const promise: Promise<{ image: any }> = new Promise(function (resolve, reject) {
            const inputElement = render.createElement('input');
            render.setStyle(inputElement, 'display', 'none');
            render.setProperty(inputElement, 'type', 'file');
            render.listen(inputElement, 'click', ($event) => {
                //console.log('MouseEvent:', $event);
                //console.log('Input:', $event.target);
                $event.target.value = null;
            });

            render.listen(inputElement, 'change', ($event) => {
                const file: File = $event.target.files[0];
                const myReader: FileReader = new FileReader();
                myReader.onloadend = (e) => {
                    try {
                        resolve({ image: myReader.result as string });
                    } catch (e) {
                        reject(e);
                    }
                };

                try {
                    myReader.readAsDataURL(file);
                } catch (e) {
                    console.warn(`Probably no file have been selected: ${e}`);
                    reject("No file selected");
                }
            });
            inputElement.click();
        });

        return promise;
    }

    getRgbsForImg(url): Observable<ImageData> {
        return Observable.create((observer: any) => {
            var image = new Image();
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                observer.next(imageData);
                observer.complete();
            };
            image.src = url;
        });
    }

    rgbaToHexA(r: any, g: any, b: any, a: any) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.round(a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return "#" + r + g + b + a;
    }

    rgbToHex(r: any, g: any, b: any) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }
}