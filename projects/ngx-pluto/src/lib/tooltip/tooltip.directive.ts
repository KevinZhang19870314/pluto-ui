import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NpTooltip } from './tooltip.component';

const OFFSET = 4;

/**
* Tooltip提示文本
* 
* <example-url>https://stackblitz.com/edit/np-tooltip-sample?embed=1&file=src/app/app.component.html</example-url>
*/
@Directive({ selector: '[npTooltip]' })
export class NpTooltipDirective implements OnInit {

    /**显示提示文本 */
    @Input('npTooltip') text = '';
    /**支持自定义模板ng-template展示提示文本 */
    @Input() template: TemplateRef<any>;
    /**支持上、右、下、左、上左、上右、下左、下右8个方向展示提示文本，默认展示上方提示文本 */
    @Input() position: NpTooltipPosition = 'top';
    /**提示文本背景色 */
    @Input() bgColor: string = 'rgba(73, 89, 106, .7)';
    /**提示文本水平方向X轴位移 */
    @Input() offsetX: number = null;
    /**提示文本垂直方向Y轴位移 */
    @Input() offsetY: number = null;
    /**是否展示提示文本指向箭头，默认展示 */
    @Input() showArrow: boolean = true;
    /**触发方式，默认为鼠标hover */
    @Input() trigger: 'hover' | 'click' = 'hover';

    private overlayRef: OverlayRef;
    private withPositions: any = {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetX: 0,
        offsetY: -2 * OFFSET
    };
    private delayTimer;

    constructor(private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private elementRef: ElementRef,
        public renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.initWithPositions();

        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([this.withPositions]);

        this.overlayRef = this.overlay.create({ positionStrategy, hasBackdrop: this.trigger === 'click' });
        this.overlayRef.backdropClick().subscribe(res => {
            this.hide();
        });
    }

    ngAfterViewInit() {
        let overlayElement;
        if (this.trigger === 'hover') {
            this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.delayEnterLeave(true, true, 0.15));
            this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
                this.delayEnterLeave(true, false, 0.1);
                if (this.overlayRef && !overlayElement) { // NOTE: we bind events under "mouseleave" due to the overlayRef is only created after the overlay was completely shown up
                    overlayElement = this.overlayRef.overlayElement;
                    this.renderer.listen(overlayElement, 'mouseenter', () => this.delayEnterLeave(false, true));
                    this.renderer.listen(overlayElement, 'mouseleave', () => this.delayEnterLeave(false, false));
                }
            });
        } else if (this.trigger === 'click') {
            this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
                this.show();
            });
        }
    }

    private initWithPositions() {
        switch (this.position) {
            case 'top':
                this.withPositions = {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom',
                    offsetX: this.offsetX === null ? 0 : this.offsetX,
                    offsetY: this.offsetY === null ? -2 * OFFSET : this.offsetY
                };
                break;
            case 'right':
                this.withPositions = {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center',
                    offsetX: this.offsetX === null ? 2 * OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? 0 : this.offsetY
                };
                break;
            case 'bottom':
                this.withPositions = {
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                    offsetX: this.offsetX === null ? 0 : this.offsetX,
                    offsetY: this.offsetY === null ? 2 * OFFSET : this.offsetY
                };
                break;
            case 'left':
                this.withPositions = {
                    originX: 'start',
                    originY: 'center',
                    overlayX: 'end',
                    overlayY: 'center',
                    offsetX: this.offsetX === null ? -2 * OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? 0 : this.offsetY
                };
                break;
            case 'topLeft':
                this.withPositions = {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetX: this.offsetX === null ? OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? -2 * OFFSET : this.offsetY
                };
                break;
            case 'topRight':
                this.withPositions = {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetX: this.offsetX === null ? -OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? -2 * OFFSET : this.offsetY
                };
                break;
            case 'bottomLeft':
                this.withPositions = {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetX: this.offsetX === null ? OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? 2 * OFFSET : this.offsetY
                };
                break;
            case 'bottomRight':
                this.withPositions = {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: this.offsetX === null ? -OFFSET : this.offsetX,
                    offsetY: this.offsetY === null ? 2 * OFFSET : this.offsetY
                };
                break;
            default:
                break;
        }

        if (this.position === 'top') {
            this.elementRef.nativeElement.classList.add('arrow-bottom');
        }
    }

    private buildArrow() {
        if (!this.overlayRef || !this.overlayRef.hostElement) {
            return;
        }

        let arrowPosition: string;
        switch (this.position) {
            case 'top':
                arrowPosition = 'arrow-bottom'
                break;
            case 'right':
                arrowPosition = 'arrow-left'
                break;
            case 'bottom':
                arrowPosition = 'arrow-top'
                break;
            case 'left':
                arrowPosition = 'arrow-right'
                break;
            case 'topLeft':
                arrowPosition = 'arrow-bottomRight'
                break;
            case 'topRight':
                arrowPosition = 'arrow-bottomLeft'
                break;
            case 'bottomLeft':
                arrowPosition = 'arrow-topRight'
                break;
            case 'bottomRight':
                arrowPosition = 'arrow-topLeft'
                break;

            default:
                break;
        }
        let tooltipTag = this.overlayRef.hostElement.getElementsByTagName('np-tooltip')[0];
        if (tooltipTag) {
            tooltipTag.classList.add(arrowPosition);
        }
    }

    private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
        if (this.delayTimer) { // Clear timer during the delay time
            window.clearTimeout(this.delayTimer);
            this.delayTimer = null;
        } else if (delay > 0) {
            this.delayTimer = window.setTimeout(() => {
                this.delayTimer = null;
                isEnter ? this.show() : this.hide();
            }, delay * 1000);
        } else {
            isEnter && isOrigin ? this.show() : this.hide(); // [Compatible] The "isOrigin" is used due to the tooltip will not hide immediately (may caused by the fade-out animation)
        }
    }

    show() {
        if (this.overlayRef.hasAttached()) {
            return;
        }

        const tooltipRef: ComponentRef<NpTooltip>
            = this.overlayRef.attach(new ComponentPortal(NpTooltip));

        if (this.text) {
            tooltipRef.instance.text = this.text;
        }

        if (this.template) {
            tooltipRef.instance.template = this.template;
        }

        tooltipRef.instance.bgColor = this.bgColor;

        if (this.showArrow) {
            this.buildArrow();
        }
    }

    hide() {
        if (this.overlayRef.hasAttached) {
            this.overlayRef.detach();
        }
    }
}

export type NpTooltipPosition = 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';