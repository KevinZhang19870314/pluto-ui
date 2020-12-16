import { Component, ViewEncapsulation, OnInit, OnChanges, Input, SimpleChanges, TemplateRef, ChangeDetectionStrategy, ContentChild } from "@angular/core";
import { NpPanelFooterDirective } from "./panel-footer.directive";
import { NpPanelHeaderDirective } from "./panel-header.directive";
import { NpPanelBodyDirective } from "./panel-body.directive";

/**
 * panel组件
 * 
 * <example-url>https://stackblitz.com/edit/angular-hmkf7x?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-panel`,
  templateUrl: 'panel.html',
  styleUrls: ['panel.scss'],
  host: {
    'class': 'np-panel-wrapper flex-wrap col-flex',
    // '[style.background-color]': 'bgColor',
    '[style.border-radius.px]': 'panelRadius'
  },
  encapsulation: ViewEncapsulation.None
})

export class NpPanel implements OnInit {
  /**
   * 面板主标题
   */
  @Input() title: string = '';
  /**
   * 面板副标题 - 常用于对主标题的解释描述等，在主标题右侧展示。
   */
  @Input() subTitle: string = '';
  /**
   * 面板背景色
   */
  @Input() bgColor: string = '#fff';
  /**
   * 面板圆角
   */
  @Input() panelRadius: number = 5;  // unit: px

  @ContentChild(NpPanelHeaderDirective) npPanelHeader: NpPanelHeaderDirective;
  @ContentChild(NpPanelBodyDirective) npPanelBody: NpPanelBodyDirective;
  @ContentChild(NpPanelFooterDirective) npPanelFooter: NpPanelFooterDirective;

  constructor() { }

  ngOnInit() {
  }
}