import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpPanel } from './panel.component';
import { NpPanelHeaderDirective } from './panel-header.directive';
import { NpPanelBodyDirective } from './panel-body.directive';
import { NpPanelFooterDirective } from './panel-footer.directive';
import { NpTitleModule } from '../title/index';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NpTitleModule
  ],
  declarations: [
    NpPanel,
    NpPanelHeaderDirective,
    NpPanelBodyDirective,
    NpPanelFooterDirective],
  exports: [
    NpPanel,
    NpPanelHeaderDirective,
    NpPanelBodyDirective,
    NpPanelFooterDirective],
  entryComponents: [
  ]
})
export class NpPanelModule { }
