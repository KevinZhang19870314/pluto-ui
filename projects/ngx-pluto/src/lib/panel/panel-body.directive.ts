import { Directive } from '@angular/core';

/**
 * @ignore
 */
@Directive({
    selector: 'np-panel-body',
    host: {
        'class': 'panel-body'
    }
})
export class NpPanelBodyDirective {
    constructor() { }
}