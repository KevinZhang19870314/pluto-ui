import { Directive, TemplateRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: '[npStepProcess]' })
export class NpStepProcessDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
