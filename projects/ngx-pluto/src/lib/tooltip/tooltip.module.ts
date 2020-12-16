import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpTooltip } from './tooltip.component';
import { NpTooltipDirective } from './tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { NpSharedModule } from '../shared/shared.module';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NpSharedModule
  ],
  declarations: [NpTooltip, NpTooltipDirective],
  exports: [NpTooltip, NpTooltipDirective],
  entryComponents: [
    NpTooltip
  ]
})
export class NpTooltipModule { }
