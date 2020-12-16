import { Directive, TemplateRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: '[npStepFinish]' })
export class NpStepFinishDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

