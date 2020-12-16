import { Directive, ContentChild, TemplateRef, Input } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: 'np-header' })
export class NpHeaderDirective {
    @Input() name: string;
    @ContentChild(TemplateRef) headerTemplate: TemplateRef<any>;

    constructor() { }
}
