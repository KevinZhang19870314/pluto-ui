import {
  Component, AfterContentInit, ContentChildren, QueryList,
  Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, ViewEncapsulation
} from '@angular/core';
import { NpTab } from './tab.component';

/**
 * @ignore
 */
@Component({
  selector: 'np-tab-group',
  templateUrl: './tab-group.html',
  styleUrls: ['./tab-group.scss'],
  host: { "[class.chrome-like-wrapper]": "type === 'chrome-like'", },
  encapsulation: ViewEncapsulation.None
})
export class NpTabGroup implements AfterContentInit, OnChanges, OnDestroy {
  @Input() selectedIndex = 0;
  @Input() type: 'default' | 'chrome-like' = 'default';

  @Output() selectedIndexChange = new EventEmitter<number>();

  @ContentChildren(NpTab) tabs: QueryList<NpTab>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedIndex && !changes.selectedIndex.firstChange) {
      const selectedTabComp = this.tabs.find((v, i) => i === changes.selectedIndex.currentValue);
      this.selectTab(selectedTabComp);
    }
  }

  ngAfterContentInit() {
    const selectedTabComp = this.tabs.find((v, i) => i === this.selectedIndex);
    this.selectTab(selectedTabComp);
  }

  /**
   * 
   * @param tab 当前选中的tab
   * @param index 当前选中的tab的index，注：index目前只有在单击tab标签页的时候需要传入，其他情况下不需要
   */
  selectTab(tab: NpTab, index: number = -1) {
    if (tab.disabled) {
      return;
    }

    if (index !== -1) {
      this.selectedIndex = index;
    }

    // deactivate all tabs
    this.tabs.toArray().forEach(tabComponent => {
      tabComponent.active = false;
    });

    // activate the tab the user has clicked on.
    tab.active = true;

    // emit changeEvent && selectedIndex
    // fix bug，会把初始化时候selectedIndex为undefined传出去
    if (this.selectedIndex !== undefined && index > -1) {
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  isShowDivider(tabs: QueryList<NpTab>, tab: NpTab, index: number) {
    let tabArray = tabs.toArray();
    if (tab.active) {
      return false;
    }

    if (tabArray.length - 1 === index) {
      return false;
    }

    if (!tab.active && tabArray[index + 1] && tabArray[index + 1].active) {
      return false;
    }

    return true;
  }

  ngOnDestroy(): void {
  }
}
