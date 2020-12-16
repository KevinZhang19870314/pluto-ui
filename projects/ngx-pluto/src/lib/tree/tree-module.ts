import { NgModule } from '@angular/core';
import { NpTree } from './tree';
import { NpKebabModule } from '../kebab/index';

/**
 * @ignore
 */
@NgModule({
    imports: [
        NpKebabModule
    ],
    declarations: [NpTree],
    exports: [NpTree]
})
export class NpTreeModule { }
