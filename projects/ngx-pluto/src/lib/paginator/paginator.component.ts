import { Component, ViewEncapsulation, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { NpDropdownItem, NpDropdownSettings } from "../dropdown/index";

/**
 * @ignore
 */
@Component({
  selector: `np-paginator`,
  templateUrl: 'paginator.html',
  styleUrls: ['paginator.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpPaginator implements OnInit, OnChanges {


  selectedItem: NpDropdownItem;


  @Input() total: number;
  @Input() pageCounts = [10, 20, 50, 100];
  @Input() size = 20;    // Default is 20 rows per page
  @Input() firstBtnText: string = '首页';
  @Input() preBtnText: string = '上一页';
  @Input() nextBtnText: string = '下一页';
  @Input() lastBtnText: string = '尾页';
  @Input() totalText: string = '共';
  @Input() itemsPerPageText: string = '条，每页显示条数';

  @Output() onPageChanged = new EventEmitter();
  @Output() onPageSizeChanged = new EventEmitter();

  pagerLength = 5;

  @Input() pageNumber: number = 1;
  totalPagerLength: number;
  pageCountsDropdownsettings: NpDropdownSettings = { single: true, isShowSearchBox: false, isRequired: true, width: 60, placeHolder: '' };

  bindingRowsPerPage: NpDropdownItem;
  bindingPagerList: Array<number> = [];
  bindingPageCounts: NpDropdownItem[] = [];

  constructor() { }

  ngOnInit() {
    this.refreshPaginatorInfo();
  }

  refreshPaginatorInfo() {
    if (this.total <= 0) {
      this.pageNumber = 1;
      this.totalPagerLength = 0;
      return;
    }

    this.bindingRowsPerPage = { id: this.size, label: this.size + '' };
    this.calculatePagerLength(this.size);
    this.initBindingData();
    this.buildBindingPagerList();
  }

  initBindingData() {
    this.bindingPagerList = Array(this.pagerLength).fill(null).map((x, i) => (i + 1));
    this.bindingPageCounts = this.pageCounts.map(m => { return { id: m, label: m + '' } as NpDropdownItem; });
  }

  // We already pass in the input params 'pagerLength', but we still
  // need to calculate the real pagerLength according to 'total' and 'size',
  // since if the total counts is smaller enough we do not need those more pager length
  calculatePagerLength(size: number) {
    this.totalPagerLength = this.total % size === 0 ? this.total / size : Math.floor(this.total / size) + 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.size && changes.size.currentValue) {
        this.bindingRowsPerPage = { id: changes.size.currentValue, label: changes.size.currentValue };
      }

      if (changes.total && changes.total.currentValue && !changes.total.firstChange) {
        this.refreshPaginatorInfo();
      }

      if (changes.pageNumber && !changes.pageNumber.firstChange && changes.pageNumber.currentValue) {
        // this.onNumberPagerClicked(+changes.pageNumber.currentValue);
        this.pageNumber = +changes.pageNumber.currentValue;
        this.buildBindingPagerList();
      }
    }
  }

  onPageCountsDropdownSelect(selectedItem: NpDropdownItem) {
    this.pageNumber = 1;
    this.size = +selectedItem.id;
    this.calculatePagerLength(+selectedItem.id);
    this.buildBindingPagerList();

    this.onPageSizeChanged.next(selectedItem.id);
  }

  // Build the pager list ,
  // eg: 1, 2, 3, 4, 5   2, 3, 4, 5, 6
  buildBindingPagerList() {
    let middleLen = Math.floor(this.pagerLength / 2);
    let leftListIdx = this.pagerLength % 2 === 0 ? (this.pagerLength / 2 - 1) : middleLen;
    let rightListIdx = this.pagerLength % 2 === 0 ? (this.pagerLength / 2) : middleLen;
    this.bindingPagerList = [];

    for (let i = this.pageNumber - leftListIdx; i < this.pageNumber + rightListIdx + 1; i++) {
      this.bindingPagerList.push(i);
    }

    // #region Fill in the invalid data for bindingPagerList
    let leftInvalidIdx = this.bindingPagerList.filter(f => f <= 0).length;
    let rightInvalidIdx = this.bindingPagerList.filter(f => f > this.totalPagerLength).length;

    this.bindingPagerList = this.bindingPagerList.filter(f => f > 0 && f <= this.totalPagerLength);
    if (leftInvalidIdx > 0) {
      let start = this.bindingPagerList[this.bindingPagerList.length - 1] + 1;
      let end = start + leftInvalidIdx;
      for (let i = start; i < end; i++) {
        if (i <= this.totalPagerLength) {
          this.bindingPagerList.push(i);
        }
      }
    }

    if (rightInvalidIdx > 0) {
      let start = this.bindingPagerList[0] - 1;
      let end = start - rightInvalidIdx;
      for (let i = start; i > end; i--) {
        if (i >= 1) {
          this.bindingPagerList.unshift(i);
        }
      }
    }

    // #endregion
  }

  onNumberPagerClicked(pageIndex: number) {
    this.pageNumber = pageIndex;
    this.onPageChanged.next(this.pageNumber);
    this.buildBindingPagerList();
  }

  onFirstBtnClicked() {
    if (this.pageNumber === 1) {
      return;
    }

    this.pageNumber = 1;
    this.onPageChanged.next(this.pageNumber);
    this.buildBindingPagerList();
  }

  onPreBtnClicked() {
    if (this.pageNumber === 1) {
      return;
    }

    this.pageNumber--;
    this.onPageChanged.next(this.pageNumber);
    this.buildBindingPagerList();
  }

  onNextBtnClicked() {
    if (this.pageNumber === this.totalPagerLength) {
      return;
    }

    this.pageNumber++;
    this.onPageChanged.next(this.pageNumber);
    this.buildBindingPagerList();
  }

  onLastBtnClicked() {
    if (this.pageNumber === this.totalPagerLength) {
      return;
    }

    this.pageNumber = this.totalPagerLength;
    this.onPageChanged.next(this.pageNumber);
    this.buildBindingPagerList();
  }
}