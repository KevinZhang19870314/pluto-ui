import { Directive, ContentChild, TemplateRef } from '@angular/core';

/**Dropdown items directive - used for customize each items in the dropdown */
@Directive({ selector: 'np-dropdown-item' })
export class NpDropdownItemDirective {
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() { }
}