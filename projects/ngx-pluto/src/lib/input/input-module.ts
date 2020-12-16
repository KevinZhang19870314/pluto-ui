import { NgModule } from '@angular/core';
import { NpInput } from './input';
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
    declarations: [NpInput],
    exports: [NpInput]
})
export class NpInputModule { }
