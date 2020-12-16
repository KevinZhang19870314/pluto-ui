import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpKebab } from './kebab';
import { NpTooltipModule } from '../tooltip/index';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        NpTooltipModule
    ],
    declarations: [NpKebab],
    exports: [NpKebab],
    entryComponents: [NpKebab]
})
export class NpKebabModule { }
