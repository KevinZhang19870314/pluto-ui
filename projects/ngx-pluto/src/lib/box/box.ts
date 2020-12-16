import { Component, ViewEncapsulation, OnInit, Input, ElementRef, ViewChild } from "@angular/core";

/**
 * 盒子组件 - 常用于展示汇总数据等的面板
 * 
 * <example-url>https://stackblitz.com/edit/np-box-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-box`,
  templateUrl: 'box.html',
  styleUrls: ['box.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpBox implements OnInit {

  /**输入参数选项 */
  @Input() options: NpBoxOptions;

  @ViewChild('npBoxHeader') private npBoxHeader: ElementRef<HTMLElement>;

  private defaultBgColors = ['blue', 'green', 'red', 'orange'];
  showCustomHoverColor = false;

  constructor() { }

  ngOnInit() {
    this.initOptions();
    this.buildCustomBg();
  }

  private initOptions() {
    if (this.options) {
      if (!this.options.bg) {
        this.options.bg = 'blue';
      }

      if (!this.options.layout) {
        this.options.layout = 'center';
      }
    }
  }

  private buildCustomBg() {
    if (this.options.bg && this.defaultBgColors.indexOf(this.options.bg) === -1 && this.npBoxHeader.nativeElement) {
      if (this.options.bg.indexOf('//') > -1 || this.options.bg.indexOf('http') > -1) {
        this.npBoxHeader.nativeElement.style.backgroundImage = 'url(' + this.options.bg + ')';
        this.npBoxHeader.nativeElement.style.backgroundPosition = '0% 0%';
        this.npBoxHeader.nativeElement.style.backgroundRepeat = 'no-repeat';
        this.npBoxHeader.nativeElement.style.backgroundSize = '100% 100%';
      } else {
        this.npBoxHeader.nativeElement.style.backgroundColor = this.options.bg;
      }
    }
  }

  /**
   * 构建NpBoxOptions中设置的鼠标hover颜色hoverColor
   * @param isHover 鼠标是否hover
   */
  buildCustomHoverColor(isHover: boolean) {
    if (this.options.bg && this.options.hoverColor && this.defaultBgColors.indexOf(this.options.bg) === -1) {
      this.showCustomHoverColor = isHover;
    }
  }
}

/**
 * @ignore
 */
export interface NpBoxOptions {
  /**
  * 'blue' | 'green' | 'red' | 'orange'  默认提供四种头部背景颜色
  * 另外也可以直接传背景图片url或者其他颜色
  * default = 'blue'
  */
  bg?: string;
  /**头部的标题文字 */
  title: string;
  /**头部标题icon */
  faIcon: string;
  /**
   * 当传入的不是默认的四种颜色值之一的时候需要提供hover的阴影颜色，只支持传入rgb颜色值，eg. '100, 100, 100'
   */
  hoverColor?: string;
  /**
   * box内容布局：左右布局 | 居中布局 | 自定义布局
   * default = 'center'
   */
  layout?: 'leftRight' | 'center' | 'custom';
  /**内容部分的高度像素， 如传入'300'则为300px */
  height?: string;
  /**如果内容部分为左右布局，则此参数为左边标题 */
  lCaption?: string;
  /**如果内容部分为左右布局，则此参数为左边内容 */
  lContent?: any;
  /**如果内容部分为左右布局，则此参数为左边内容文字颜色 */
  lColor?: string;
  /**如果内容部分为左右布局，则此参数为右边标题 */
  rCaption?: string;
  /**如果内容部分为左右布局，则此参数为右边内容 */
  rContent?: any;
  /**如果内容部分为左右布局，则此参数为右边内容文字颜色 */
  rColor?: string;
  /**如果内容部分为居中布局，则此参数为居中内容标题 */
  cCaption?: string;
  /**如果内容部分为居中布局，则此参数为居中内容 */
  cContent?: any;
  /**如果内容部分为居中布局，则此参数为居中内容文字颜色 */
  cColor?: string;
}