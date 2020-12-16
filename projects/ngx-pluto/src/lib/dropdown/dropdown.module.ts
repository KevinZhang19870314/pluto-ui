import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDropdown } from './dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NpInputModule } from '../input/index';
import { FormsModule } from '@angular/forms';
import { NpDropdownItemDirective } from './dropdown-item.directive';
import { NpCheckboxModule } from '../checkbox/index';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        NpInputModule,
        NpCheckboxModule
    ],
    declarations: [NpDropdown, NpDropdownItemDirective],
    exports: [NpDropdown, NpDropdownItemDirective]
})
export class NpDropdownModule { }
