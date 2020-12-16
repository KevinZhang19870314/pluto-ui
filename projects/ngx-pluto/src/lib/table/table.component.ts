import { Component, ViewEncapsulation, OnInit, Input, ContentChild, ContentChildren, QueryList, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { NpColumnDirective } from "./column.directive";
import { NpEmptyDirective } from "./empty.directive";
import { NpHeaderDirective } from './header.directive';
import { Utils } from "../common/utils";

/**
 * 可分页表格组件 - 支持分页、自定义列名、自定义列内容等。对于多语言，支持通过·@Input·属性自定义。
 *
 * <example-url>https://stackblitz.com/edit/np-table-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-table`,
  templateUrl: 'table.html',
  styleUrls: ['table.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpTable implements OnInit, OnChanges {

  /**定义列名称（即数据源datasource对象属性名称），列显示名称，列宽度（可选，默认每列自适应等宽） */
  @Input() columns: Array<ColumnDef>;
  /**表格组件数据源，数据源为一个对象数组，对象的属性名称必须与表格列名称相同，否则不会展示此列 */
  @Input() datasource: Array<any>;
  /**数据总条数 */
  @Input() total: number = 0;
  /**每页显示条数，默认20条 */
  @Input() pageSize: number = 20;             // Default is 20 rows per page
  /**是否在表头第一列展示多选框，默认不展示 */
  @Input() showCheckbox: boolean = false;     // Indicate whether show checkbox or not, default is not
  /**是否显示分页组件，默认显示 */
  @Input() showPager: boolean = true;

  /**是否服务器端排序，默认false，即客户端排序 */
  @Input() serverSideSort: boolean = false;

  /**首页按钮文字 */
  @Input() firstBtnText: string = '首页';
  /**上一页按钮文字 */
  @Input() preBtnText: string = '上一页';
  /**下一页按钮文字 */
  @Input() nextBtnText: string = '下一页';
  /**尾页按钮文字 */
  @Input() lastBtnText: string = '尾页';
  /**共 */
  @Input() totalText: string = '共';
  /**条，每页显示条数 */
  @Input() itemsPerPageText: string = '条，每页显示条数';
  /**没有数据按钮文字 */
  @Input() noDataLabel: string = "没有数据";
  /**当前页码 */
  @Input() pageNumber: number = 1;
  /**页码改变事件，即翻页事件 （双向绑定） */
  @Output() pageNumberChange = new EventEmitter<number>();

  /**页码改变事件，即翻页事件 */
  @Output() onPageChanged = new EventEmitter<number>();
  /**每页显示条数改变事件 */
  @Output() onPageSizeChanged = new EventEmitter<number>();
  /**
   * Will be deprecated, use onRows instead
   */
  @Output() onRowsChecked = new EventEmitter<any>();
  /**
   * Will be deprecated, use onRows instead
   * 
   * 为了向后兼容，故没有修改onRowsChecked逻辑，增加此output事件
   * 
   * 当前行uncheck时触发此事件
   */
  @Output() onRowsUnchecked = new EventEmitter<any>();
  /**当选择服务器端排序（即serverSideSort = true）时，根据当前点击列内容及排序，传给backend api返回服务器端排序数据赋值给datasource及total字段即可 */
  @Output() onServerSideSorted = new EventEmitter<{ col: ColumnDef, sortedBy: 'default' | 'asc' | 'desc' }>();
  /**
   * 当前处理的行row/rows，选中/非选中状态
   * 
   * 如点击全选按钮，则处理的是当前页的所有行rows
   */
  @Output() onRows = new EventEmitter<any>();

  @ContentChildren(NpColumnDirective) columnComponents: QueryList<NpColumnDirective>;
  @ContentChildren(NpHeaderDirective) headerComponents: QueryList<NpHeaderDirective>;
  @ContentChild(NpEmptyDirective) emptyContent: NpEmptyDirective;

  projectedTemplates: Array<{ name: string, template: any }> = [];
  headerTemplates: Array<{ name: string, template: any }> = [];
  internalColumns: Array<InternalColumnDef> = [];
  /**此字段后续会废弃 will be deprecated */
  selectedRows: Array<any> = [];
  datasourceSortedByDefault: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.datasourceSortedByDefault = [...this.datasource];

    if (this.showCheckbox) {
      this.internalColumns = [];
      this.internalColumns.push({
        headerName: 'chk',
        headerDisplayName: '',
        width: '50px',
        isCheckbox: true
      });
    }

    this.mergeToInternalColumns();

    this.onServerSideSorted.subscribe(res => {
      console.log('onServerSideSorted: ', res);
      this.buildServerSideSort(res.col);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && changes.columns.currentValue &&
      changes.columns.currentValue.length > 0 &&
      changes.columns.previousValue &&
      changes.columns.previousValue.length > 0 &&
      changes.columns.currentValue !== changes.columns.previousValue) {
      this.mergeToInternalColumns();
      this.projectTemplate();
    }

    if (changes.datasource && changes.datasource.currentValue && changes.datasource.currentValue.length > 0) {
      this.datasourceSortedByDefault = [...changes.datasource.currentValue];
      this.initUniqueIdForDatasource();
    }

    if (changes.total && changes.total.currentValue) {
      this.total = +changes.total.currentValue;
    }

    if (changes.pageNumber && !changes.pageNumber.firstChange && changes.pageNumber.currentValue) {
      const pageNumber = +changes.pageNumber.currentValue;
      this.pageNumber = pageNumber;
      this.pageNumberChange.emit(pageNumber);

      this.selectAll(false);
    }
  }

  ngAfterContentInit() {
    this.projectTemplate();
  }

  onTablePageChanged(currentPageNumber: number) {
    this.pageNumber = currentPageNumber;
    this.pageNumberChange.emit(this.pageNumber);

    this.onPageChanged.next(currentPageNumber);

    this.selectAll(false);
  }

  onTablePageSizeChanged(currentPageSize: number) {
    this.pageSize = currentPageSize;
    this.onPageSizeChanged.next(currentPageSize);

    this.selectAll(false);
  }

  onSelectAllChecked(isChecked: boolean) {
    this.selectAll(isChecked);

    let rows = [];
    if (this.datasource && this.datasource.length > 0) {
      this.datasource.forEach(row => {
        rows.push(row);
      });
    }

    this.onRows.emit(rows);
  }

  onRowSelectChecked(row: any) {
    const colChk = this.internalColumns.find(f => f.headerName === 'chk');
    if (row.checked) {
      if (!this.selectedRows.find(f => f.dt_id === row.dt_id)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(f => f.dt_id !== row.dt_id);
      this.onRowsUnchecked.next(row);
    }

    if (colChk) {
      colChk.checked = this.selectedRows.length === this.pageSize;
    }

    if (this.selectedRows.length === 0) {
      this.selectAll(false);
    }

    this.onRowsChecked.next(this.selectedRows);

    this.onRows.emit(row);
  }

  onSort(item: InternalColumnDef) {
    if (!item.sort) {
      return;
    }

    if (this.serverSideSort) {
      this.onServerSideSorted.emit({ col: item, sortedBy: item.sortedBy });
      return;
    }

    this.buildClientSideSort(item);
  }

  //#region Private methods
  private buildServerSideSort(item: InternalColumnDef) {
    this.setNextSortedBy(item);
    this.resetOtherSortedColumns(item);
  }

  private buildClientSideSort(item: InternalColumnDef) {
    this.setNextSortedBy(item);
    if (item.sortedBy === 'default') {
      this.datasource = [...this.datasourceSortedByDefault];
    } else {
      this.datasource.sort(Utils.compareValues(item.headerName, item.sortedBy));
    }

    this.resetOtherSortedColumns(item);
  }

  private setNextSortedBy(item: InternalColumnDef) {
    switch (item.sortedBy) {
      case 'default':
        item.sortedBy = 'asc';
        break;
      case 'asc':
        item.sortedBy = 'desc';
        break;
      case 'desc':
        item.sortedBy = 'default';
        break;
      default:
        break;
    }
  }

  private initUniqueIdForDatasource() {
    this.datasource.forEach(row => {
      row['dt_id'] = this.ID();
    });
  }

  private projectTemplate() {
    if (this.columnComponents) {
      this.columnComponents.forEach(item => {
        if (!this.projectedTemplates.find(f => f.name === item.name)) {
          this.projectedTemplates.push({ name: item.name, template: item.cellTemplate });
        }
      });

      this.internalColumns.forEach(column => {
        const projectTemplate = this.projectedTemplates.find(f => f.name === column.headerName);
        if (projectTemplate) {
          column['template'] = projectTemplate.template;
        }
      });
    }
    if (this.headerComponents) {
      this.headerComponents.forEach(item => {
        if (!this.headerTemplates.find(f => f.name === item.name)) {
          this.headerTemplates.push({ name: item.name, template: item.headerTemplate });
        }
      });

      this.internalColumns.forEach(column => {
        const projectTemplate = this.headerTemplates.find(f => f.name === column.headerName);
        if (projectTemplate) {
          column['headerTemplate'] = projectTemplate.template;
        }
      });
    }
  }

  private mergeToInternalColumns() {
    if (this.internalColumns.length === 0) {
      this.internalColumns = [...this.columns];
      this.setSortedByToDefault();
      return;
    }

    this.columns.forEach(replaceColumn => {
      let existColumn = this.internalColumns.find(f => f.headerName === replaceColumn.headerName);
      if (existColumn) {
        existColumn = { ...replaceColumn };
      } else {
        this.internalColumns.push({ ...replaceColumn });
      }
    });

    this.setSortedByToDefault();
  }

  private setSortedByToDefault() {
    for (let i = 0; i < this.internalColumns.length; i++) {
      if (this.internalColumns[i].sort) {
        this.internalColumns[i].sortedBy = 'default';
      }
    }
  }

  private ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  private selectAll(isSelect: boolean) {
    const colChk = this.internalColumns.find(f => f.headerName === 'chk');
    if (colChk) {
      colChk.checked = isSelect;

      this.selectedRows = [];
      if (this.datasource && this.datasource.length > 0) {
        this.datasource.forEach(row => {
          row.checked = isSelect;
          if (isSelect) {
            this.selectedRows.push(row);
          }
        });
      }

      this.onRowsChecked.next(this.selectedRows);
    }
  }

  private resetOtherSortedColumns(item: InternalColumnDef) {
    this.internalColumns.forEach(col => {
      if (col.headerName !== item.headerName && col.sort) {
        col.sortedBy = 'default';
      }
    });
  }
  //#endregion
}

export interface ColumnDef {
  /**列名称 */
  headerName: string;
  /**列显示名称 */
  headerDisplayName: string;
  /**列宽度 */
  width?: string;
  sort?: boolean;
}

/**
 * @ignore
 */
interface InternalColumnDef extends ColumnDef {
  isCheckbox?: boolean;
  checked?: boolean;
  sortedBy?: 'default' | 'asc' | 'desc';
}

