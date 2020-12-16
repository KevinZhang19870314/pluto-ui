import { Directive } from '@angular/core';

/**
 * @ignore
 */
@Directive({
    selector: 'np-panel-footer',
    host: { 'class': 'panel-footer' }
})
export class NpPanelFooterDirective {
    constructor() { }
}