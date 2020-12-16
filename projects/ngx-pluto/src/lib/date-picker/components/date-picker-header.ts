import { Component, ViewEncapsulation, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, SimpleChanges } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { NpDatePickerService, YearData } from "../date-picker.service";

/**
 * @ignore
 */
@Component({
  selector: `np-date-picker-header`,
  templateUrl: 'date-picker-header.html',
  styleUrls: ['date-picker-header.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpDatePickerHeader implements OnInit {

  @Input() date: moment_.Moment = moment();

  @Output() onYearClicked = new EventEmitter<{ date: moment_.Moment, year: string, ranges: Array<YearData> }>();
  @Output() onMonthClicked = new EventEmitter<{ date: moment_.Moment, month: string }>();
  @Output() onArrowClicked = new EventEmitter<{ arrowType: ArrowType, date: moment_.Moment }>();

  year: string;
  month: string;
  isYearLabelRanged: boolean = false;
  isShowMonthLabel: boolean = true;
  isShowPreBtn: boolean = true;

  constructor(private datePickerService: NpDatePickerService) { }

  ngOnInit() {
    this.resetYearAndMonth();
  }

  ngOnChanges(changes: SimpleChanges) {
    const date: moment_.Moment = changes['date'].currentValue as moment_.Moment;

    if (date) {
      this.resetYearAndMonth();
    }
  }

  onYearLabelClicked() {
    if (this.isYearLabelRanged) {
      return;
    }

    this.isYearLabelRanged = true;
    this.isShowMonthLabel = false;
    this.isShowPreBtn = false;
    let ranges = this.datePickerService.buildYearsPanel(this.date, this.year, this.date.clone());
    this.year = ranges[1].value + '-' + ranges[ranges.length - 2].value;
    this.onYearClicked.emit({ date: this.date, year: this.year, ranges: ranges });
  }

  onMonthLabelClicked() {
    this.isShowMonthLabel = false;
    this.isShowPreBtn = false;
    this.month = this.date.format('MMMM');
    this.onMonthClicked.emit({ date: this.date, month: this.month });
  }

  onArrowBtnClicked(arrowType: ArrowType) {
    this.onArrowClicked.emit({ arrowType: arrowType, date: this.date });
  }

  private resetYearAndMonth() {
    if (this.isYearLabelRanged) {
      let ranges = this.datePickerService.buildYearsPanel(this.date, this.date.format('YYYY'), this.date.clone());
      this.year = ranges[1].value + '-' + ranges[ranges.length - 2].value;
    } else {
      this.year = this.date.format('YYYY');
    }

    this.month = this.date.format('MMMM');
  }
}

export type ArrowType = 'double-pre' | 'pre' | 'next' | 'double-next';