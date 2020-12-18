import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpSideNav } from './sidenav';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NpSideNav],
    exports: [NpSideNav]
})
export class NpSideNavModule { }
