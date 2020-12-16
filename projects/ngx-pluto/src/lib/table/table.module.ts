import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpTable } from './table.component';
import { NpColumnDirective } from './column.directive';
import { NpPaginatorModule } from '../paginator/index';
import { NpCheckboxModule } from '../checkbox/index';
import { NpEmptyDirective } from './empty.directive';
import {NpHeaderDirective} from './header.directive';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NpPaginatorModule,
        NpCheckboxModule
    ],
    declarations: [NpTable, NpColumnDirective, NpEmptyDirective, NpHeaderDirective],
    exports: [NpTable, NpColumnDirective, NpEmptyDirective, NpHeaderDirective]
})
export class NpTableModule { }
