import { Directive, ContentChild, TemplateRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: '[np-tab-header]' })
export class NpTabHeaderDirective {
    constructor(private template: TemplateRef<any>) { }
}