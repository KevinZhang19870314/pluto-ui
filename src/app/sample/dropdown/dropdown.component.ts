import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NpDropdownItem, NpDropdownSettings } from 'projects/ngx-pluto/src';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  items: Array<NpDropdownItem> = [];
  settings: NpDropdownSettings = { lblName: '门店单选', single: true, isShowSearchBox: false, isRequired: true };
  selectedItem: NpDropdownItem;

  items_m: Array<NpDropdownItem> = [];
  settings_m: NpDropdownSettings = { lblName: '城市多选', single: false, width: 320, badge: 3, isShowCheckedAll: true };
  selectedItem_m: Array<NpDropdownItem>;

  formGroup: FormGroup;
  items_m_form: Array<NpDropdownItem> = [];

  isDisabled = true;

  get f() {
    return this.formGroup.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //#region NgModel
    let results: Array<NpDropdownItem> = [];
    for (let i = 0; i < 10000; i++) {
      results.push({ id: '#' + i, label: '门店#' + i, hah: 'hah#' + i });
    }

    this.items = results;
    this.selectedItem = this.items[100];

    // Multiple select
    let results_m: Array<NpDropdownItem> = [];
    for (let i = 0; i < 10000; i++) {
      results_m.push({ id: '#' + i, label: '城市#' + i, hah: 'hah#' + i });
    }

    this.items_m = results_m;
    this.selectedItem_m = [JSON.parse(JSON.stringify(this.items_m[0])), this.items_m[2], this.items_m[1]];
    //#endregion

    //#region Reactive forms
    let results_m_form = [];
    for (let i = 0; i < 10000; i++) {
      results_m_form.push({ id: '#' + i, label: '城市#' + i, hah: 'hah#' + i });
    }

    this.items_m_form = [...results_m_form];
    this.formGroup = this.fb.group({
      single: [{ ...this.items[99] }, []],
      multiple: [[JSON.parse(JSON.stringify(this.items_m_form[1])), this.items_m_form[999]], []]
    });
    //#endregion

    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  onSelected($event) {
    console.log($event);
  }

  onSelected_m($event) {
    console.log('onSelected_m', $event);
  }
}
