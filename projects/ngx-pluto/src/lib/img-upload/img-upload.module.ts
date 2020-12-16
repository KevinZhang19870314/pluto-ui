import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpButtonModule } from '../button/index';
import { NpImgUpload } from './img-upload';
import { NpSharedModule } from '../shared/index';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NpSharedModule,
        NpButtonModule
    ],
    declarations: [NpImgUpload],
    exports: [NpImgUpload]
})
export class NpImgUploadModule { }
