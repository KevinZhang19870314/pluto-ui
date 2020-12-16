import { Directive, ViewContainerRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({
  selector: '[npInsertion]'
})
export class InsertionDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
