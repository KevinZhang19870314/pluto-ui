import { NgModule } from '@angular/core';
import { NpCropper } from './cropper';
import { CommonModule } from '@angular/common';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NpCropper],
    exports: [NpCropper]
})
export class NpCropperModule { }
