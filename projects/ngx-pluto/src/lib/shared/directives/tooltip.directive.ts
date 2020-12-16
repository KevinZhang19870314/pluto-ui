import { Directive, ElementRef, OnInit, Input, HostListener, ViewContainerRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({
  selector: '[npTooltipDeprecated]',
})
export class TooltipDirective implements OnInit {

  @Input()
  npTooltip: string = '';
  @Input()
  direction: direction = 'right';
  @Input()
  enterDelay: number;
  @Input()
  leaveDelay: number;
  tooltipDom: HTMLDivElement;
  constructor(
    private element: ElementRef<HTMLImageElement>,
    public hostView: ViewContainerRef,

  ) { }
  ngOnInit(): void {
    this.tooltipDom = document.createElement('div');
    this.tooltipDom.id = 'tooltip-container';
    let width = this.npTooltip.length + 'em'
    if (this.npTooltip.length > 20) {
      width = '20em';
    }
    this.tooltipDom.innerHTML = `
    <span  style="width:${width}"  class="tooltip tooltip-right">
    ${this.npTooltip}</span>
    `;
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    const eleWidth = this.element.nativeElement.clientWidth;
    const eleheight = this.element.nativeElement.clientHeight;
    //#TODO: 上下左方向没写
    let tooltipTop, tooltipLeft;
    switch (this.direction) {
      case 'right':
        tooltipLeft = eleWidth + 'px';
        this.tooltipDom.style.left = tooltipLeft;
        break;
      // case 'left':
      //   // 175是tooltip内容的宽度,10是修正宽度
      //   tooltipLeft = (-175 - 10) + 'px';
      //   this.tooltipDom.style.left = tooltipLeft;
      //   break;
      default:
        break;
    }
    this.element.nativeElement.parentNode.insertBefore(this.tooltipDom, this.element.nativeElement);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.element.nativeElement.parentNode.removeChild(this.tooltipDom);
  }
}

/**
 * @ignore
 */
export type direction = 'up' | 'bottom' | 'left' | 'right';
