import { Directive, ContentChild, TemplateRef, Input } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: 'np-empty' })
export class NpEmptyDirective {
    @Input() name: string;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() { }
}