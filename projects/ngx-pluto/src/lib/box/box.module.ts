import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpBox } from './box';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NpBox],
    exports: [NpBox]
})
export class NpBoxModule { }
