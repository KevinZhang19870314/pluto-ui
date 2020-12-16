import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrls: ['./select.scss']
})
export class SelectComponent implements OnInit {

  testForm: FormGroup;

  itemList = [];
  selectedItems = [];
  selectedItem = [];
  settings = {};
  singleSettings = {};

  isDisabled = false;

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // 此处有使用BUG，
    // itemList和selectedItems必须在同一个方法里面赋值
    // 不能先selectedItems在oninit里面赋值，然后在调用异步方法获取itemList
    // 不然这样会报错
    this.itemList = [
      { "countryId": 1, "itemName": "胡月的门店" },
      { "countryId": 2, "itemName": "胡月的门店导入002" },
      { "countryId": 3, "itemName": "胡月的门店导入001" },
      { "countryId": 4, "itemName": "五塔店" },
      { "countryId": 5, "itemName": "宝山店" },
      { "countryId": 6, "itemName": "长青店" }
    ];

    this.selectedItems = [
      { "countryId": 1, "itemName": "胡月的门店" },
      { "countryId": 2, "itemName": "胡月的门店导入002" },
      { "countryId": 3, "itemName": "胡月的门店导入001" },
      { "countryId": 4, "itemName": "五塔店" }];

    this.selectedItem = [{ "countryId": 2, "itemName": "胡月的门店导入002" }];

    this.settings = {
      text: "请选择",
      selectAllText: '全选',
      unSelectAllText: '取消全选',
      classes: "myclass custom-class",
      primaryKey: "countryId",
      showCheckbox: true,
      badgeShowLimit: 5,
      enableSingleRemoveIcon: false,
      position: 'top'
    };
    this.singleSettings = {
      enableSearchFilter: true,
      text: "请选择",
      selectAllText: '全选',
      unSelectAllText: '取消全选',
      classes: "myclass custom-class",
      primaryKey: "countryId",
      badgeShowLimit: 5,
      singleSelection: true,
      enableSingleRemoveIcon: false,
      autoPosition: false,
      position: 'top'
    }

    this.testForm = this.fb.group({
      single: [[this.itemList[0]], []]
    })
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  onDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
