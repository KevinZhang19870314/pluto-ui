import { NgModule } from '@angular/core';
import { NpTextarea } from './textarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [NpTextarea],
    exports: [NpTextarea]
})
export class NpTextareaModule { }
