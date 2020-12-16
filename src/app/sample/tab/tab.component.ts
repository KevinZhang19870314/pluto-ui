import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  selectedIndex = 1;
  tabList = [
    { displayName: '菜品信息', value: 'menu', visible: true },
    { displayName: '套餐信息', value: 'comnbo', visible: true },
    { displayName: '菜品分类', value: 'catorage', visible: true },
  ];
  tabListTwo = [
    { displayName: '菜品信息', value: 'menu' },
    { displayName: '套餐信息', value: 'comnbo' },
    { displayName: '菜品分类', value: 'catorage' },
  ];

  tabListThree = [
    { displayName: '菜品信息', value: 'menu' },
    { displayName: '套餐信息', value: 'comnbo' },
    { displayName: '菜品分类', value: 'catorage' },
    { displayName: '菜品规格', value: 'rules' }
  ];

  emptyDatasource = [];
  columns = [];
  selectedTabIndex: number = 1;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      // this.selectedIndex = 0;
      this.tabList[0].visible = false;
    }, 2000);
    setTimeout(() => {
      // this.selectedIndex = 0;
      this.tabList[0].visible = true;
    }, 5000);
  }

  onChangeSelectedIndex() {
    this.selectedTabIndex = 2;
  }

  indexChange(event) {
    console.log('<<<>>>', event);
    this.selectedTabIndex = event;
  }

  onGetSelectedIndex() {
    console.log('selected index = ' + this.selectedTabIndex);
  }

  toggleDisable = false;
  onToggleDisable() {
    this.toggleDisable = !this.toggleDisable;
  }

}
