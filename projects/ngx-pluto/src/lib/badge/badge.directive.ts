import { Directive, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { Utils } from '../utils';


/**
 * @ignore
 */
@Directive({
  selector: '[np-badge]',
  host: {
    'class': 'np-badge-wrapper',
    '[class.np-badge-above]': 'isAbove()',
    '[class.np-badge-below]': '!isAbove()',
    '[class.np-badge-before]': '!isAfter()',
    '[class.np-badge-after]': 'isAfter()'
  }
})
export class NpBadgeDirective {

  @Input() badgePosition: NpBadgePosition = 'above after';
  @Input() badgeColor: string = '#ed5565';
  @Input() badgeContent: string;
  @Input() badgeRadius: string = '0';

  private badgeElement: HTMLElement | undefined;
  private hasContent = false;

  constructor(private _elementRef: ElementRef<HTMLElement>,
    private _renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    const contentChange = changes['badgeContent'];

    if (contentChange) {
      const value = contentChange.currentValue;
      this.hasContent = value != null && `${value}`.trim().length > 0 && +value !== 0;
      this.updateTextContent();
    }
  }

  isAbove(): boolean {
    return this.badgePosition.indexOf('below') === -1;
  }

  isAfter(): boolean {
    return this.badgePosition.indexOf('before') === -1;
  }

  private updateTextContent(): HTMLSpanElement {
    if (!this.badgeElement) {
      this.badgeElement = this.createBadgeElement();
    } else {
      this.badgeElement.textContent = this.badgeContent;
    }
    return this.badgeElement;
  }

  private createBadgeElement(): HTMLElement {
    const badgeElement: HTMLElement = this._renderer.createElement('span');

    badgeElement.setAttribute('id', `np-badge-content-${Utils.ID()}`);
    badgeElement.style.borderRadius = this.badgeRadius;
    badgeElement.style.backgroundColor = this.badgeColor;
    badgeElement.classList.add('np-badge-content');
    badgeElement.textContent = this.badgeContent;

    this._elementRef.nativeElement.appendChild(badgeElement);

    return badgeElement;
  }
}

/**
 * @ignore
 */
export type NpBadgePosition = 'above after' | 'above before' | 'below before' | 'below after';