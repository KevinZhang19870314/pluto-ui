import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpBadgeDirective } from './badge.directive';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NpBadgeDirective],
    exports: [NpBadgeDirective]
})
export class NpBadgeModule { }
