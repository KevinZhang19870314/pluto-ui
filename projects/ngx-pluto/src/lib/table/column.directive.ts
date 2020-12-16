import { Directive, ContentChild, TemplateRef, Input } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: 'np-column' })
export class NpColumnDirective {
    @Input() name: string;
    @ContentChild(TemplateRef) cellTemplate: TemplateRef<any>;

    constructor() { }
}