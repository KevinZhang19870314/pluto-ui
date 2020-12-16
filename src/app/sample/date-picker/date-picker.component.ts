import { Component, OnInit } from '@angular/core';
import * as moment_ from 'moment'; const moment = moment_;
import { DatePickerFooterItem } from 'projects/ngx-pluto/src/lib/date-picker/components/date-picker-footer';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class NewDatePickerComponent implements OnInit {
  testForm: FormGroup;

  date: moment_.Moment = moment();
  datetime: moment_.Moment = moment();
  month: moment_.Moment = moment();
  year: moment_.Moment = moment();
  footerItems: DatePickerFooterItem[] = [{ label: '前天', value: moment().add(-2, 'day') }, { label: '昨天', value: moment().add(-1, 'day') }];
  dtFooterItems: DatePickerFooterItem[] = [{ label: '此刻', value: () => { return moment(); } }];
  footerItemsForRange: DatePickerFooterItem[] = [
    { label: '近7天', values: [moment().add(-7, 'day'), moment()] },
    { label: '近30天', values: [moment().add(-30, 'day'), moment()] }];
  dates = [moment(), moment().add(1, 'month').add(1, 'day')];
  isRequired = true;

  isMonthPickerDisabled = false;
  isYearPickerDisabled = false;
  isRangePickerDisabled = false;

  get f() {
    return this.testForm.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      date: [moment('2020-08-01'), []],
      datetime: [moment(), []],
      month: ['', []],
      year: ['', []],
      dates: [[moment(), moment().add(100, 'day')], []]
    });
  }

  test() {
    this.date = this.date.add(1, 'day').clone();
  }

  onDateChanged($event) {
    console.log('onDateChanged = ', $event ? $event.format('YYYY-MM-DD') : '');
  }

  onDatetimeChanged($event) {
    console.log('onDatetimeChanged = ', $event ? $event.format('YYYY-MM-DD HH:mm:ss') : '');
  }

  onMonthChanged($event) {
    console.log('onMonthChanged = ', $event ? $event.format('YYYY-MM') : '');
  }

  onYearChanged($event) {
    console.log('onYearChanged = ', $event ? $event.format('YYYY') : '');
  }

  onToggleMonthPicker() {
    this.isMonthPickerDisabled = !this.isMonthPickerDisabled;
  }

  onToggleYearPicker() {
    this.isYearPickerDisabled = !this.isYearPickerDisabled;
  }

  onToggleRangePicker() {
    this.isRangePickerDisabled = !this.isRangePickerDisabled;
  }
}
