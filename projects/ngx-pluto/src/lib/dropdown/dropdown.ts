import { Component, OnInit, Input, TemplateRef, ViewContainerRef, Output, EventEmitter, ContentChild, forwardRef, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, ViewChild } from '@angular/core';
// import { OverlayService } from '../common';
import { NpDropdownItemDirective } from './dropdown-item.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { OverlayService } from '../common/overlay.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

/**
 * 下拉选择组件 - 支持单选和多选功能
 * 
 * <example-url>https://stackblitz.com/edit/np-dropdown-sample?embed=1&file=src/app/app.component.html</example-url>
 * 
 */
@Component({
  selector: `np-dropdown`,
  templateUrl: 'dropdown.html',
  styleUrls: ['dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.disabled]': 'disabled === "true" || disabled === true'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpDropdown),
      multi: true,
    }]
})
export class NpDropdown implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  /**是否禁用状态 */
  @Input() disabled: any = false;

  /**下拉组件的基础设置，如是否单选等 */
  @Input() settings: NpDropdownSettings;

  /**全部下拉选项 */
  @Input() items: Array<NpDropdownItem> = [];

  /**已选项 - 单选为一个对象， 多选则为一组数组 */
  @Input() selectedItem: NpDropdownItem | Array<NpDropdownItem>;

  /**选择时触发 */
  @Output() onSelected = new EventEmitter<NpDropdownItem | Array<NpDropdownItem>>();
  /**取消选择时触发 */
  @Output() onDeselected = new EventEmitter<NpDropdownItem | Array<NpDropdownItem>>();
  /**全选时触发 */
  @Output() onSelectedAll = new EventEmitter<NpDropdownItem | Array<NpDropdownItem>>();
  /**取消全选时触发 */
  @Output() onDeselectedAll = new EventEmitter<NpDropdownItem | Array<NpDropdownItem>>();

  @ContentChild(NpDropdownItemDirective) selectItemRef: NpDropdownItemDirective;

  @ViewChild('virtualScrollViewport') viewPort: CdkVirtualScrollViewport;

  private originItems: Array<NpDropdownItem> = [];
  /**查询Token */
  searchToken: string;

  //#region Getter
  /**单选下拉框 */
  get selectedLabel() {
    this.checkItemExists();

    if (this.settings.single) {
      return this.selectedItem ? (this.selectedItem as NpDropdownItem).label : this.settings.placeHolder;
    }

    return this.settings.placeHolder;
  }

  /**多选下拉框 */
  selectedItems: Array<NpDropdownItem> = [];
  selectedBadgeItems: Array<NpDropdownItem> = [];
  noneBadgeCount: number = 0;

  private buildMultipleSelect() {
    if (this.settings.single) {
      return;
    }

    //#region selectedItems
    this.checkItemExists();
    let selectedItems = this.selectedItem as Array<NpDropdownItem>;
    if (selectedItems && selectedItems.length > 0) {
      this.selectedItems = [...selectedItems];
    } else {
      this.selectedItems = [{ id: -1, label: this.settings.placeHolder }];
    }
    //#endregion

    //#region selectedBadgeItems
    let items = [...this.selectedItems];
    items.splice(this.settings.badge);
    this.selectedBadgeItems = items;
    //#endregion

    this.noneBadgeCount = this.selectedItems.length - this.settings.badge;

    this.cdf.detectChanges();
  }

  get isDropdownOpen() {
    return this.overlayService.isAttached();
  }

  get isItemSelected() {
    if (this.settings.single) {
      return this.selectedLabel !== this.settings.placeHolder;
    }

    // Multiple dropdown
    if (this.selectedItems && this.selectedItems.length > 0) {
      return this.selectedItems[0].label !== this.settings.placeHolder;
    }

    return false;
  }

  _isCheckedAll: boolean = false;
  get isCheckedAll() {
    return this.items.length === this.selectedItem.length;
  }

  set isCheckedAll(val: boolean) {
    this._isCheckedAll = val;
  }
  //#endregion

  constructor(private viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService,
    private cdf: ChangeDetectorRef,
    private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    let items = changes['items'];
    if (items && items.currentValue && items.currentValue.length >= 0) {
      this.originItems = [...items.currentValue];
    }
  }

  onSelectAll(checked: boolean) {
    this.items.forEach(item => {
      item.checked = checked;
    });

    this.selectedItem = checked ? [...this.items] : [];
    this.buildMultipleSelect();
    this.onSelectedAll.emit(this.selectedItem);
    this.emitChange(this.selectedItem);
  }

  onSelect(item: NpDropdownItem) {
    if (this.settings.single) {
      this.selectedItem = item;
      this.onSelected.emit(item);
      this.emitChange(item);
      this.cdf.detectChanges();

      this.overlayService.close({ item: item });
      return;
    }

    //#region Multiple dropdown
    if (!this.selectedItem || !this.selectedItem.length) {
      this.selectedItem = [];
    }

    if (item.checked) {
      this.selectedItem.push(item);
    } else {
      this.selectedItem = this.selectedItem.filter((f: NpDropdownItem) => f.id !== item.id);
    }

    this.buildMultipleSelect();
    this.onSelected.emit(item);
    this.emitChange(this.selectedItem);
    //#endregion
  }

  onSearch(val: any) {
    if (!val) {
      this.clearSearch();
      return;
    }

    this.items = this.originItems.filter(f => f.label.indexOf(val) > -1);
  }

  isActive(item: NpDropdownItem) {
    if (!this.selectedItem) {
      return false;
    }

    if (this.settings.single) {
      return item.id === (this.selectedItem as NpDropdownItem).id;
    }

    // Multiple dropdown
    return this.selectedItem.find(f => f.id === item.id);
  }

  onOpenDropdown($event: MouseEvent, dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    $event.stopPropagation();

    if (this.disabled) {
      return;
    }

    if (this.isDropdownOpen) {
      this.overlayService.close(null);
      return;
    }

    this.overlayService.openDropdown(origin, dropdownTpl, this.viewContainerRef, null).subscribe(() => {
      // close
    });

    this.buildItemsCheckedStatus();
    setTimeout(() => {
      this.scrollToSelectedItem();
    }, 100);

    // Tricky... Can't get inner element in np-input control, so we need set
    // style async after open dropdown
    setTimeout(() => {
      if (!this.overlayService.overlayRef || !this.overlayService.overlayRef.overlayElement) {
        return;
      }

      let npInputWrapper = this.overlayService.overlayRef.overlayElement.getElementsByClassName('np-input-wrapper');
      let inputContainer = this.overlayService.overlayRef.overlayElement.getElementsByClassName('input-container');
      let npInput = this.overlayService.overlayRef.overlayElement.getElementsByClassName('np-input');
      if (npInputWrapper && npInputWrapper.length > 0) {
        this.renderer2.setStyle(npInputWrapper[0], 'width', '100%');
      }

      if (inputContainer && inputContainer.length > 0) {
        this.renderer2.setStyle(inputContainer[0], 'width', '100%');
      }

      if (npInput && npInput.length > 0) {
        this.renderer2.setStyle(npInput[0], 'width', this.settings.width + 'px');
        this.renderer2.setStyle(npInput[0], 'padding-left', '30px');
        this.renderer2.setStyle(npInput[0], 'border-top', 'none');
        this.renderer2.setStyle(npInput[0], 'border-left', 'none');
        this.renderer2.setStyle(npInput[0], 'border-right', 'none');
        this.renderer2.setStyle(npInput[0], 'box-shadow', 'none');
      }
    }, 0);
  }

  onRemoveItems($event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.selectedItem = this.settings.single ? null : [];
    this.clearSearch();
    this.items.forEach(item => {
      item.checked = false;
    });

    this.buildMultipleSelect();
    this.onDeselectedAll.emit(this.items);
    this.emitChange(this.selectedItem);
    $event.stopPropagation();
  }

  onRemoveItem($event: MouseEvent, item: NpDropdownItem) {
    if (this.disabled) {
      return;
    }

    this.selectedItem = this.selectedItem.filter((f: NpDropdownItem) => f.id !== item.id);
    this.clearSearch();

    item.checked = false;

    this.buildMultipleSelect();
    this.onDeselected.emit(item);
    this.emitChange(this.selectedItem);
    $event.stopPropagation();
  }

  //#region Implementation for ControlValueAccessor
  writeValue(obj: any): void {
    // 如果是多选下拉框，传入的selectedItem是null，为了防止报错直接return，必须传入空数组[]
    if (obj === null && !this.settings.single) {
      return;
    }

    this.selectedItem = obj;
    if (this.settings.single) {
      this.cdf.detectChanges();
    } else {
      this.selectedItem.forEach(item => {
        if (item.checked === undefined) {
          item.checked = true;
        }
      });
      this.buildMultipleSelect();
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
  //#endregion

  //#region Private methods
  private init() {
    this.originItems = [...this.items];
    let initSettings: NpDropdownSettings = {
      single: true,
      placeHolder: '请选择',
      width: 220,
      badge: 99999,
      isShowSearchBox: true,
      noData: '没有数据！',
      autoScrollTo: true
    };

    this.settings = Object.assign(initSettings, this.settings);
  }

  private checkItemExists() {
    if (this.settings.single) {
      if (this.selectedItem && !this.originItems.find(f => f.id === (this.selectedItem as NpDropdownItem).id)) {
        this.selectedItem = null;
      }
    } else {
      // Multiple dropdown
      if (this.selectedItem && this.selectedItem.length > 0) {
        let selectedItems = [];
        this.selectedItem.forEach((item: NpDropdownItem) => {
          if (this.originItems.find(f => f.id === item.id)) {
            selectedItems.push(item);
          }
        });

        this.selectedItem = [];
        this.selectedItem = selectedItems;
      }
    }
  }

  /**
   * 清除查询并展示所有符合条件的items
   */
  private clearSearch() {
    this.searchToken = '';
    this.items = [...this.originItems];

    this.buildItemsCheckedStatus();
  }

  private buildItemsCheckedStatus() {
    if (this.settings.single) {
      return;
    }

    this.items.forEach(item => {
      let selectedItem = this.selectedItem.find(f => f.id === item.id);
      item.checked = selectedItem ? true : false;
    });
  }

  private scrollToSelectedItem() {
    if (!this.settings.autoScrollTo) {
      return;
    }

    let item = this.settings.single ? (this.selectedItem as NpDropdownItem) : (this.selectedItem && this.selectedItem[0]);
    if (item) {
      const selectedIndex = this.originItems.findIndex(f => f.id === item.id);
      this.viewPort.scrollToIndex(selectedIndex, 'smooth');
    }
  }
  //#endregion
}

export interface NpDropdownSettings {
  /**Left side label name */
  lblName?: string;

  /**Set if it is single dropdown, default is true - single dropdown */
  single?: boolean;

  /**Check if it is required. if not, show remove icon, otherwise hide the remove icon */
  isRequired?: boolean;

  /**Placeholder for dropdown */
  placeHolder?: string;

  /**Set the width of dropdown, default is 220, unit px */
  width?: number;

  /**Display badge count, default is 99999 */
  badge?: number;

  /**是否展示全选按钮 */
  isShowCheckedAll?: boolean;

  /**是否默认全选 */
  isCheckedAll?: boolean;

  /**没有数据时展示的文案，默认为‘没有数据！’ */
  noData?: string;

  /**是否显示搜索框，默认展示 */
  isShowSearchBox?: boolean;

  /**当下拉框有已选项，单选时，打开下拉框会自动滚动到已选项；当为多选时，打开下拉框会自动滚动到已选项的第一项；默认打开为true */
  autoScrollTo?: boolean;
}

export interface NpDropdownItem {
  id: string | number;
  label: string;
  [key: string]: any;
}


