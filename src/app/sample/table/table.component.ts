import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ColumnDef } from "projects/ngx-pluto/src/lib/table/table.component";
import { mockdata } from './mock-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  columns: Array<ColumnDef> = [{
    headerName: 'id',
    headerDisplayName: 'ID',
    width: '80px',
    sort: true
  },
  {
    headerName: 'name',
    headerDisplayName: '名称',
    width: '320px',
    sort: true
  },
  {
    headerName: 'age',
    headerDisplayName: '年龄',
    sort: true
  },
  {
    headerName: 'stature',
    headerDisplayName: '身高',
    sort: true
  },
  {
    headerName: 'desc',
    headerDisplayName: '描述'
  },
  {
    headerName: 'operator',
    headerDisplayName: '操作'
  }];
  datasource = [];
  total = mockdata.length;
  pageSize = 10;
  currentPageNumber = 1;

  emptyDatasource = [];

  selectedRows: any;
  rows: any;

  searchName: string;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.setPagedData(1);
    }, 500);
  }

  onPageChanged(currentPageNumber: number) {
    this.setPagedData(currentPageNumber);
  }

  onPageSizeChanged(currentPageSize: number) {
    this.pageSize = currentPageSize;
    this.setPagedData(1);
  }

  onRowsChecked(rows: Array<any>) {
    this.selectedRows = JSON.stringify(rows);
  }

  onRows(rows: Array<any>) {
    this.rows = JSON.stringify(rows);
  }

  onSearchName() {
    this.currentPageNumber = 1;
    this.setPagedData(this.currentPageNumber);
  }

  onServerSideSorted($event) {
    return new Promise((resolve, reject) => {
      this.setPagedData(10);
      console.log('Client side: ', $event);
      resolve();
    })
  }

  // Mock data
  private setPagedData(currentPageNumber: number) {
    let dt = [];
    if (this.searchName) {
      dt = mockdata.filter(f => f.name.indexOf(this.searchName) > -1);
    } else {
      dt = mockdata;
    }

    this.total = dt.length;
    this.datasource = dt.slice(this.pageSize * (currentPageNumber - 1), this.pageSize * currentPageNumber);
  }
}
