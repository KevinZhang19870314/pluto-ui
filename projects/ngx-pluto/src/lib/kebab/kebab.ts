import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NpTooltipDirective, NpTooltipPosition } from '../tooltip/index';
import { Utils } from '../utils';

/**
 * kebab组件
 * 
 * <example-url>https://stackblitz.com/edit/angular-vc3q8h?embed=1&file=src/app/app.component.html</example-url>
 */

@Component({
  selector: `np-kebab`,
  templateUrl: 'kebab.html',
  styleUrls: ['kebab.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpKebab implements OnInit {

  /**传入的需要进行展示的数组  */
  @Input() data: KebabComponentData;
  /**布局格式，默认flex布局 */
  @Input() display: string = 'flex';
  @Input() position: NpTooltipPosition = 'bottomRight';
  /**
   * 点击单个item接收符合KebabItem 格式的对象
   *  */
  @Output() onItemClicked = new EventEmitter<{ $event: any, item: KebabItem }>();

  @ViewChild(NpTooltipDirective) dropdownTooltip: NpTooltipDirective;
  itemsInKebab: Array<KebabItem> = [];
  itemsOutKebab: Array<KebabItem> = [];
  isDropdownVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.buildKebabItems();
  }

  onKebabItemClicked($event: any, item: KebabItem, itemInKebab: boolean = false) {
    this.onItemClicked.emit({ $event: $event, item: item });

    if (itemInKebab && this.dropdownTooltip) {
      this.dropdownTooltip.hide();
    }
  }

  private buildKebabItems() {
    if (!this.data || !this.data.items) {
      throw new Error('Invalid data');
    }

    this.data.items.forEach(item => {
      if (item.id === undefined || item.id === null) {
        item.id = Utils.ID();
      }
    });

    if (!this.data.limit) {
      this.itemsOutKebab = this.data.items || [];
      this.itemsInKebab = [];

      return;
    }

    if (this.data.limit > 0 && this.data.items.length > 0) {
      this.data.limit = (this.data.limit > this.data.items.length) ? this.data.items.length : this.data.limit;
      this.itemsOutKebab = this.data.items.slice(0, this.data.items.length - this.data.limit) || [];
      this.itemsInKebab = this.data.items.slice(this.itemsOutKebab.length, this.data.items.length) || [];

      return;
    }
  }
}

/**
 * @ignore
 */
export interface KebabComponentData {
  items: Array<KebabItem>;
  /**If no limit passed in or 0, which means all items out of kebab; 
   * if limit === items.length, which means all items in kebab;
   * otherwise, limit is the count for items in kebab.
   *  */
  limit?: number;
}

export interface KebabItem {
  /**页面展示文案，字符串类型，属于必传参数 */
  value: string;
  /**可自己传入不同的id，支持字符串和数字，如果不传入，则默认生成随机id */
  id?: string | number;
  /**支持传入`icon`, `text`, `separator`, 默认`text`*/
  type?: 'text' | 'icon' | 'separator';
  /** 支持传入颜色，非必传，不传使用默认色 */
  color?: string;
}


