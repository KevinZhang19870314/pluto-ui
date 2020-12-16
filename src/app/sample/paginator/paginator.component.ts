import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.html',
  styleUrls: ['./paginator.scss']
})
export class PaginatorComponent implements OnInit {
  pageInfo = {
    size: 20,
    total: 0,
  }
  total = 0;

  currentPageNumber = 1;

  constructor() { }

  ngOnInit() {
    this.total = 44;
  }

  onPageChanged(currentPageNumber: number) {
    console.log('currentPageNumber = ' + currentPageNumber);

  }

  onPageSizeChanged(currentPageSize: number) {
    console.log('currentPageSize = ' + currentPageSize);
  }
  
  mock(number) {
    this.total = number;
  }
}
