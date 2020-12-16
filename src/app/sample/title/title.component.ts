import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }

  onRefresh() {
    alert('刷新数据成功！');
  }
}
