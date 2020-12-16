import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from './directives/tooltip.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TooltipDirective,
    SafeHtmlPipe
  ],
  exports: [
    TooltipDirective,
    SafeHtmlPipe
  ]
})
export class NpSharedModule {
}
