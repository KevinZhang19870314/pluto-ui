import { Component, ViewEncapsulation, OnInit, Input, ViewChild, Output, SimpleChanges, EventEmitter, ElementRef } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { ArrowType, NpDatePickerHeader } from "./date-picker-header";
import { DayDataPerMonth, MonthData, YearData, NpDatePickerService } from "../date-picker.service";
import { NotifyService } from "../../shared/services/notify.service";
import { TIME_FORMAT, DATE_FORMAT } from "../date-picker-const";
import { DatePickerFooterItem, NpDatePickerFooter } from "./date-picker-footer";
import { NpTimePickerPanel } from "./time-picker-panel";
import { trigger, transition, style, animate } from "@angular/animations";

/**
 * Date picker popup组件
 */
@Component({
  selector: `np-date-picker-popup`,
  templateUrl: 'date-picker-popup.html',
  styleUrls: ['date-picker-popup.scss'],
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

export class NpDatePickerPopup implements OnInit {
  datePickerType: DatePickerType = 'date-picker';
  isShowTime: boolean = false;

  @Input() date: moment_.Moment = null;

  @Output() onDayClicked = new EventEmitter<DayDataPerMonth>();
  @Output() onDayMouseover = new EventEmitter<DayDataPerMonth>();
  @Output() onMonthClicked = new EventEmitter<MonthData>();
  @Output() onYearClicked = new EventEmitter<YearData>();
  @Output() onTimeClicked = new EventEmitter<string>();
  @Output() onConfirmClicked = new EventEmitter<string>();
  @Output() onItemLabelClicked = new EventEmitter<DatePickerFooterItem>();
  @Input() footerItems: DatePickerFooterItem[] = [];
  @Input() confirmButtonText: string;

  @ViewChild('datePickerHeader') datePickerHeader: NpDatePickerHeader;
  @ViewChild('datePickerFooter') datePickerFooter: NpDatePickerFooter;
  @ViewChild('timePickerPanel') timePickerPanel: NpTimePickerPanel;
  @ViewChild('dayLabel') dayLabel: ElementRef<HTMLElement>;

  selectedDate: moment_.Moment = null;
  isShowDaysPanel: boolean = true;
  isShowMonthsPanel: boolean = false;
  isShowYearsPanel: boolean = false;

  days: Array<DayDataPerMonth> = [];
  months: Array<MonthData> = [];
  years: Array<YearData> = [];
  nowDay: moment_.Moment;
  /**传入到时间面板的当前时间，格式为‘HH:mm:ss’ */
  time: string;

  constructor(private datePickerService: NpDatePickerService,
    public elementRef: ElementRef) { }

  ngOnInit() {
    this.initMoment();
    if (this.datePickerType === 'date-picker') {
      this.showPanel('days');
    } else if (this.datePickerType === 'month-picker') {
      this.showPanel('months');
    } else if (this.datePickerType === 'year-picker') {
      this.showPanel('years');
    } else if (this.datePickerType === 'datetime-picker') {
      this.showPanel('days');
    }

    this.buildPanel();
  }

  ngOnChanges(changes: SimpleChanges) {
    const date: moment_.Moment = changes['date'].currentValue as moment_.Moment;
    this.selectedDate = date ? date.clone() : null;
  }

  onTimeLabelClicked(time: string) {
    this.time = time;
    this.onTimeClicked.emit(this.time);
  }

  onConfirmButtonClicked(time: string) {
    this.time = time;
    this.onConfirmClicked.emit(this.time);
  }

  onFooterItemLabelClicked(item: DatePickerFooterItem) {
    this.onItemLabelClicked.emit(item);
  }

  onDayLabelClicked(day: DayDataPerMonth) {
    if (day.isWeekDayMin) {
      return;
    }

    if (this.isShowTime) {
      day.date = moment(day.date.format(DATE_FORMAT) + ' ' + (this.time ? this.time : moment().format(TIME_FORMAT)));
    }

    this.showPanel('days');
    this.buildPanel(day.date, day.date);
    this.initTimePicker(day.date);
    this.onDayClicked.emit(day);
  }

  private preDay: DayDataPerMonth = null;
  onDayLabelMouseover(day: DayDataPerMonth) {

    if (this.preDay && this.preDay.date && day.date && this.preDay.date.format(DATE_FORMAT) !== day.date.format(DATE_FORMAT)) {
      this.onDayMouseover.emit(day);
    }

    this.preDay = { ...day };
  }

  onMonthLabelClicked(month: MonthData) {
    if (this.datePickerType === 'date-picker' || this.datePickerType === 'datetime-picker' || this.datePickerType === 'date-range-picker') {
      this.showPanel('days');
      this.buildPanel(month.date, this.selectedDate);
      return;
    }

    if (this.datePickerType === 'month-picker') {
      this.onMonthClicked.emit(month);
      return;
    }
  }

  onYearLabelClicked(year: YearData) {
    if (this.datePickerType === 'date-picker' || this.datePickerType === 'datetime-picker' || this.datePickerType === 'date-range-picker') {
      this.showPanel('days');
      this.buildPanel(year.date, this.selectedDate);
      return;
    }

    if (this.datePickerType === 'month-picker') {
      this.showPanel('months');
      this.buildPanel(year.date, this.selectedDate);
      return;
    }

    if (this.datePickerType === 'year-picker') {
      this.onYearClicked.emit(year);
      return;
    }
  }

  onYearInHeaderClicked(data: { date: moment_.Moment, year: string, ranges: Array<number> }) {
    this.years = this.datePickerService.buildYearsPanel(data.date, data.year, this.selectedDate);
    this.showPanel('years');
  }

  onMonthInHeaderClicked() {
    this.months = this.datePickerService.buildMonthsPanel(this.date, this.selectedDate);
    this.showPanel('months');
  }

  onArrowClicked(data: { arrowType: ArrowType, date: moment_.Moment }) {
    switch (data.arrowType) {
      case 'double-pre':
        if (this.isShowDaysPanel || this.isShowMonthsPanel) {
          this.date = this.date.add(-1, 'year').clone();
        } else if (this.isShowYearsPanel) {
          this.date = this.date.add(-10, 'year').clone();
        }

        break;
      case 'pre':
        if (this.isShowDaysPanel) {
          this.date = this.date.add(-1, 'month').clone();
        }

        break;
      case 'next':
        if (this.isShowDaysPanel) {
          this.date = this.date.add(1, 'month').clone();
        }

        break;
      case 'double-next':
        if (this.isShowDaysPanel || this.isShowMonthsPanel) {
          this.date = this.date.add(1, 'year').clone();
        } else if (this.isShowYearsPanel) {
          this.date = this.date.add(10, 'year').clone();
        }

        break;

      default:
        break;
    }

    this.buildPanel();
  }

  public buildPanel(date: moment_.Moment = this.date, selectedDate: moment_.Moment = null) {
    this.date = date && date.isValid() ? date.clone() : moment();
    this.selectedDate = selectedDate ? selectedDate.clone() : this.selectedDate;

    if (this.isShowDaysPanel) {
      this.days = this.datePickerService.buildDaysPanel(this.date, this.selectedDate);

      this.nowDay = moment();
      return;
    }

    if (this.isShowMonthsPanel) {
      this.months = this.datePickerService.buildMonthsPanel(this.date, this.selectedDate);
      return;
    }

    if (this.isShowYearsPanel) {
      this.years = this.datePickerService.buildYearsPanel(this.date, this.date.format('YYYY'), this.selectedDate);
      return;
    }
  }

  public buildPanelForRangePicker(hoverDate: moment_.Moment, dates: Array<moment_.Moment> = []) {

    if (this.isShowDaysPanel) {
      this.days = this.datePickerService.buildDaysPanelForRangePicker(this.date, this.selectedDate, hoverDate, dates);
      this.nowDay = moment();
    }
  }

  private initMoment() {
    if (this.date && this.date.isValid()) {
      this.selectedDate = this.date.clone();
      this.initTimePicker(this.selectedDate);
    } else {
      this.selectedDate = null;
      this.date = moment();
    }
  }

  private initTimePicker(date: moment_.Moment) {
    if (this.datePickerType === 'datetime-picker') {
      this.time = date.format(TIME_FORMAT);
      if (this.timePickerPanel) {
        this.timePickerPanel.scrollTo(this.time);
      } else {
        setTimeout(() => {
          this.timePickerPanel.scrollTo(this.time);
        }, 0);
      }

    }
  }

  private showPanel(type: 'days' | 'months' | 'years') {
    switch (type) {
      case 'days':
        this.isShowDaysPanel = true;
        this.isShowMonthsPanel = false;
        this.isShowYearsPanel = false;
        if (this.datePickerHeader) {
          this.datePickerHeader.isYearLabelRanged = false;
          this.datePickerHeader.isShowMonthLabel = true;
          this.datePickerHeader.isShowPreBtn = true;
        }
        break;
      case 'months':
        this.isShowDaysPanel = false;
        this.isShowMonthsPanel = true;
        this.isShowYearsPanel = false;
        if (this.datePickerHeader) {
          this.datePickerHeader.isYearLabelRanged = false;
          this.datePickerHeader.isShowMonthLabel = false;
          this.datePickerHeader.isShowPreBtn = false;
        }
        break;
      case 'years':
        this.isShowDaysPanel = false;
        this.isShowMonthsPanel = false;
        this.isShowYearsPanel = true;
        if (this.datePickerHeader) {
          this.datePickerHeader.isYearLabelRanged = true;
          this.datePickerHeader.isShowMonthLabel = false;
          this.datePickerHeader.isShowPreBtn = false;
        }
        break;
      default:
        this.isShowDaysPanel = true;
        this.isShowMonthsPanel = false;
        this.isShowYearsPanel = false;
        break;
    }
  }
}

export type DatePickerType = 'date-picker' | 'datetime-picker' | 'year-picker' | 'month-picker' | 'date-range-picker';