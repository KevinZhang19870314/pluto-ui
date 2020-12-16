import { Directive } from '@angular/core';
import { NpSidebar } from './sidebar.component';

/**
 * @ignore
 */
@Directive({
  selector: '[closeSidebar]',
  host: {
    '(click)': '_onClick()'
  }
})
export class NpCloseSidebar {
  constructor(private _sidebar: NpSidebar) {}

  /** @internal */
  _onClick(): void {
    if (this._sidebar) {
      this._sidebar.close();
    }
  }
}
