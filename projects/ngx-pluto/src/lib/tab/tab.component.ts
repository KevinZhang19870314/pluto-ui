import { Component, Input, ChangeDetectorRef, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NpTabHeaderDirective } from './tab-header.directive';

/**
 * @ignore
 */
@Component({
  selector: 'np-tab',
  template: `<ng-container *ngIf="active">
                <div><ng-content></ng-content></div>
             </ng-container>
            `,
  encapsulation: ViewEncapsulation.None
})
export class NpTab {
  private _active = false;
  public get active() {
    return this._active;
  }

  public set active(val: boolean) {
    this._active = val;
    this.cdf.detectChanges();
  }

  @Input() tabTitle: string;
  @Input() disabled: boolean = false;

  @ContentChild(NpTabHeaderDirective) headerTemplate: NpTabHeaderDirective;

  constructor(private cdf: ChangeDetectorRef) { }
}
