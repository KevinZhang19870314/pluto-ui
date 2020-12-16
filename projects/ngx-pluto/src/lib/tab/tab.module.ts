import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpTab } from './tab.component';
import { NpTabGroup } from './tab-group.component';
import { NpTabHeaderDirective } from './tab-header.directive';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NpTabGroup, NpTab, NpTabHeaderDirective],
  declarations: [NpTabGroup, NpTab, NpTabHeaderDirective]
})
export class NpTabModule { }
