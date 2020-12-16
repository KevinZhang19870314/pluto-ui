import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpLoading } from './loading';
import { NpSolidLoading } from './solid-loading';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [NpLoading, NpSolidLoading],
    exports: [NpLoading, NpSolidLoading]
})
export class NpLoadingModule { }
