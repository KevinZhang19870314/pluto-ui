import { Directive, TemplateRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: '[npStepHeader]' })
export class NpStepHeaderDirective {
    constructor(public template: TemplateRef<any>) { 
    }
}