import { Component, OnInit } from '@angular/core';
import { KebabComponentData, KebabItem } from 'projects/ngx-pluto/src/lib/kebab';

@Component({
  selector: 'app-kebab',
  templateUrl: './kebab.component.html',
  styleUrls: ['./kebab.component.scss']
})
export class KebabComponent implements OnInit {

  kebabData1: KebabComponentData = {
    items: [
      { value: '新增订单', id: 0 },
      { value: '修改订单', type: 'text', id: 1 },
      { value: '删除订单', id: 2 },
      { value: '联系我们', type: 'text', id: 3 },
      { value: '', type: 'separator', color: 'gray' },
      { value: 'fas fa-question-circle', type: 'icon', color: '#F8AF12' }
    ],
    limit: 0
  };

  kebabData2: KebabComponentData = {
    items: [
      { value: '新增订单', id: 0 },
      { value: '修改订单', type: 'text', id: 1 },
      { value: '删除订单', id: 2 },
      { value: '联系我们', type: 'text', id: 3 },
      { value: '', type: 'separator', color: 'gray' },
      { value: 'fas fa-question-circle', type: 'icon', color: '#F8AF12' }
    ],
    limit: 6
  };

  kebabData3: KebabComponentData = {
    items: [
      { value: '新增订单', id: 0 },
      { value: '修改订单', type: 'text', id: 1 },
      { value: '删除订单', id: 2 },
      { value: '联系我们', type: 'text', id: 3 },
      { value: '', type: 'separator', color: 'gray' },
      { value: 'fas fa-question-circle', type: 'icon', color: '#F8AF12' }
    ],
    limit: 4
  };

  constructor() { }

  ngOnInit() {

  }

  onItemClicked(item: KebabItem) {
    console.log(JSON.stringify(item));
  }
}
