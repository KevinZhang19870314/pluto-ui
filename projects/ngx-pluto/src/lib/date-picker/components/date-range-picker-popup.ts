import { Component, ViewEncapsulation, OnInit, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { DayDataPerMonth, NpDatePickerService } from "../date-picker.service";
import { DatePickerFooterItem } from "./date-picker-footer";
import { NpDatePickerPopup, DatePickerType } from "./date-picker-popup";
import { trigger, transition, style, animate } from "@angular/animations";

/**
 * Date range picker popup组件
 */
@Component({
  selector: `np-date-range-picker-popup`,
  templateUrl: 'date-range-picker-popup.html',
  styleUrls: ['date-range-picker-popup.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [trigger('date-picker-animations', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(300, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate(300, style({ opacity: 0 })),
    ]),
  ])]
})

export class NpDateRangePickerPopup implements OnInit {
  datePickerType: DatePickerType = 'date-range-picker';
  footerItems: DatePickerFooterItem[] = [];

  /**
   * 传入的第一个datepicker的时间，可以是moment实例，也可以是可转换为moment的字符串
   */
  @Input() startDate: any;
  /**
   * 传入的第二个datepicker的时间，可以是moment实例，也可以是可转换为moment的字符串
   */
  @Input() endDate: any;

  @Output() onStartDayClicked = new EventEmitter<{ day: DayDataPerMonth, dates: Array<moment_.Moment | string> }>();
  @Output() onEndDayClicked = new EventEmitter<{ day: DayDataPerMonth, dates: Array<moment_.Moment | string> }>();
  @Output() onItemLabelClicked = new EventEmitter<DatePickerFooterItem>();

  @ViewChild('startPicker') startPicker: NpDatePickerPopup;
  @ViewChild('endPicker') endPicker: NpDatePickerPopup;

  nowDate = moment();

  constructor(private datePickerService: NpDatePickerService) { }

  ngOnInit() {
    this.buildPicker();

    setTimeout(() => {
      this.buildDayPanelStyle(moment(this.startDate));
    }, 0);
  }

  onStartPickerDayClicked(dayData: DayDataPerMonth) {
    let dates = this.buildStartAndEndDates();
    this.onStartDayClicked.emit({ day: dayData, dates: dates });
  }

  onEndPickerDayClicked(dayData: DayDataPerMonth) {
    let dates = this.buildStartAndEndDates();
    this.onEndDayClicked.emit({ day: dayData, dates: dates });
  }

  onStartPickerDayMouseover(dayData: DayDataPerMonth) {
    this.buildDayPanelStyle(dayData.date);
  }

  onEndPickerDayMouseover(dayData: DayDataPerMonth) {
    this.buildDayPanelStyle(dayData.date);
  }

  onFooterItemLabelClicked(item: DatePickerFooterItem) {
    this.onItemLabelClicked.emit(item);
  }

  ngOnChanges() {

  }

  private buildDayPanelStyle(date: moment_.Moment) {
    let dates = this.buildStartAndEndDates();
    this.startPicker.buildPanelForRangePicker(date, dates);
    this.endPicker.buildPanelForRangePicker(date, dates);
  }

  private buildPicker() {
    if (this.startPicker) {
      this.startPicker.datePickerType = this.datePickerType;
    }

    if (this.endPicker) {
      this.endPicker.datePickerType = this.datePickerType;
    }
  }

  private buildStartAndEndDates() {
    if (!this.datePickerService.isValid(this.startDate) || !this.datePickerService.isValid(this.endDate)) {
      return [];
    }

    if (moment(this.startDate) < moment(this.endDate)) {
      return [this.startDate, this.endDate];
    }

    return [this.endDate, this.startDate];
  }
}

export type DateRangePickerType = 'date-range-picker' | 'datetime-range-picker';