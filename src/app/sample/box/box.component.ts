import { Component, OnInit } from '@angular/core';
import { NpBoxOptions } from 'projects/ngx-pluto/src';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  options1: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '实收订单金额（元）',
    layout: 'leftRight',
    lCaption: '昨日',
    lContent: 100.05,
    rCaption: '今日',
    rContent: 298,
    rColor: '#4E88DD'
  };
  options2: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '完成订单数量（笔）',
    bg: 'green',
    layout: 'leftRight',
    lCaption: '昨日',
    lContent: 199.05,
    rCaption: '今日',
    rContent: 265.9,
    rColor: '#2CC5C6'
  };
  options3: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '完成付款人数（人）',
    bg: 'red',
    cCaption: '2019年10月03日 ~ 2019年10月09日',
    cContent: 0.02,
    cColor: '#F46B78'
  };
  options4: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '销售商品数量（个）',
    bg: 'orange',
    cCaption: '2019年10月03日 ~ 2019年10月09日',
    cContent: 8,
    cColor: '#FD8922'
  };

  options5: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '实收订单金额（元）',
    hoverColor: '100, 100, 100',
    bg: 'gray',
    layout: 'custom'
  };

  options6: NpBoxOptions = {
    faIcon: 'fas fa-file-invoice-dollar',
    title: '本月工资（美元）',
    hoverColor: '100, 100, 100',
    bg: '//image.ipay.so/upload/voucher/assets/images/activity/pin-order_amt.png',
    cCaption: '2019年10月01日 ~ 2019年10月31日',
    cContent: '$99999',
    cColor: '#F46B78',
    height: '300'
  };

  constructor() { }

  ngOnInit() {

  }

  onRefreshData() {
    this.options1.lContent = (Math.random() * 1000).toFixed(2);
    this.options1.rContent = (Math.random() * 1000).toFixed(2);

    this.options2.lContent = (Math.random() * 1000).toFixed(2);
    this.options2.rContent = (Math.random() * 1000).toFixed(2);

    this.options3.cCaption = '2020年10月03日 ~ 2020年10月09日';
    this.options3.cContent = (Math.random() * 1000).toFixed(2);

    this.options4.cCaption = '2020年10月03日 ~ 2020年10月09日';
    this.options4.cContent = (Math.random() * 1000).toFixed(2);
  }
}
