import { Component, ViewEncapsulation, OnInit, Input, ViewChild, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter, ComponentRef, ElementRef } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NpDateRangePickerPopup } from "../components/date-range-picker-popup";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../date-picker-const";
import { DatePickerFooterItem } from "../components/date-picker-footer";
import { NpInput } from "../../input";
import { NpDatePickerService, DayDataPerMonth } from "../date-picker.service";

/**
 * Date range picker组件
 */
@Component({
  selector: `np-date-range-picker`,
  templateUrl: 'date-range-picker.html',
  styleUrls: ['date-range-picker.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpDateRangePicker),
      multi: true,
    }
  ]
})

export class NpDateRangePicker implements OnInit, OnChanges, ControlValueAccessor {

  /**标签 */
  @Input() label: string;
  /**是否必填，true仅在标签前面添加红色*号， false不加*/
  @Input() isRequired: boolean;
  /**展示开始时间占位符 */
  @Input() startPlaceholder: string = '';
  /**展示结束时间占位符 */
  @Input() endPlaceholder: string = '';
  /**校验错误时显示错误信息 */
  @Input() errorMessage: string;
  /**是否禁用 */
  @Input() isDisabled: boolean;

  /**已选时间 */
  @Input() dates: Array<moment_.Moment | string> = [];
  /**日期时间展示格式，默认只展示日期 */
  @Input() format: string = DATE_FORMAT;
  /**是否展示时间，默认不展示 */
  @Input() isShowTime: boolean = false;
  /**显示在footer左侧的自定义时间标签数组，如“昨天”等 */
  @Input() footerItems: DatePickerFooterItem[] = [];

  @Output() onDateRangeChanged = new EventEmitter<any>();

  @ViewChild('dateRangeWrapper') dateRangeWrapper: ElementRef<HTMLElement>;
  @ViewChild('dateRangeStartPicker') dateRangeStartPicker: NpInput;
  @ViewChild('dateRangeEndPicker') dateRangeEndPicker: NpInput;

  daterangePickerPopupRef: ComponentRef<NpDateRangePickerPopup>;


  startDate: moment_.Moment | string;
  endDate: moment_.Moment | string;

  private overlayRef: OverlayRef;
  isHover: boolean = false;

  private emitChange = (_: any) => { };


  /**日期输入框文本值，每当this.startDate改变时此值会同步改变*/
  sValue: string;


  /**日期输入框文本值，每当this.endDate改变时此值会同步改变*/
  eValue: string;

  constructor(private datePickerService: NpDatePickerService) { }

  ngOnInit() {
    if (this.dates && this.dates.length === 2) {
      let dates = this.datePickerService.buildStartAndEndDates(moment(this.dates[0]).clone(), moment(this.dates[1]).clone());
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.syncSValue();
      this.syncEValue();
    }

    this.overlayRef = this.datePickerService.getOverlayRef(this.dateRangeStartPicker.npInput);

    if (this.isShowTime) {
      this.format = DATE_TIME_FORMAT;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onStartPickerClicked() {
    this.onToggleDatePickerPopup();
  }

  onEndPickerClicked() {
    this.onToggleDatePickerPopup();
  }

  onToggleDatePickerPopup() {
    if (this.isDisabled) {
      return;
    }

    if (this.overlayRef.hasAttached()) {
      this.closePopup();
      return;
    }

    this.daterangePickerPopupRef = this.overlayRef.attach(new ComponentPortal(NpDateRangePickerPopup));
    this.daterangePickerPopupRef.instance.datePickerType = 'date-range-picker';
    this.daterangePickerPopupRef.instance.footerItems = this.footerItems;
    this.daterangePickerPopupRef.instance.startDate = moment(this.startDate);
    this.daterangePickerPopupRef.instance.endDate = moment(this.endDate);
    this.subscribeNotifyEvents();

    this.overlayRef.backdropClick().subscribe(() => {
      this.closePopup();
    });

    if (this.dateRangeWrapper && this.dateRangeWrapper.nativeElement) {
      this.dateRangeWrapper.nativeElement.focus();
    }
  }

  onStartDateBlur(data: { value: any, event: any }) {
    if (this.datePickerService.isValid(data.value)) {
      this.startDate = moment(data.value, this.format).clone();
    } else {
      // 如果输入日期不合法，默认当前时间
      this.startDate = moment().clone();
    }

    let dates = this.datePickerService.buildStartAndEndDates(moment(this.startDate).clone(), moment(this.endDate).clone());
    this.startDate = dates[0];
    this.endDate = dates[1];
    this.syncSValue();
    this.syncEValue();
    this.emitChange([this.startDate, this.endDate]);
    this.onDateRangeChanged.emit([this.startDate, this.endDate]);
  }

  onEndDateBlur(data: { value: any, event: any }) {
    if (this.datePickerService.isValid(data.value)) {
      this.endDate = moment(data.value, this.format).clone();
    } else {
      // 如果输入日期不合法，默认当前时间
      this.endDate = moment().clone();
    }

    let dates = this.datePickerService.buildStartAndEndDates(moment(this.startDate).clone(), moment(this.endDate).clone());
    this.startDate = dates[0];
    this.endDate = dates[1];
    this.syncSValue();
    this.syncEValue();
    this.emitChange([this.startDate, this.endDate]);
    this.onDateRangeChanged.emit([this.startDate, this.endDate]);
  }

  onClear() {
    if (this.isDisabled) {
      return;
    }

    this.startDate = null;
    this.endDate = null;
    this.syncSValue();
    this.syncEValue();

    this.emitChange([]);
    this.onDateRangeChanged.emit([]);
  }

  onMouseenter() {
    this.isHover = true;
  }

  onMouseleave() {
    this.isHover = false;
  }

  //#region Private methods

  /**每次this.startDate改变时，这个方法都必须要调用 */
  private syncSValue() {
    if (this.startDate && this.datePickerService.isValid(this.startDate)) {
      this.sValue = moment(this.startDate, this.format).format(this.format);
    } else {
      this.sValue = '';
    }
  }

  /**每次this.endDate改变时，这个方法都必须要调用 */
  private syncEValue() {
    if (this.endDate && this.datePickerService.isValid(this.endDate)) {
      this.eValue = moment(this.endDate, this.format).format(this.format);
    } else {
      this.eValue = '';
    }
  }

  private closePopup() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private subscribeNotifyEvents() {
    this.daterangePickerPopupRef.instance.onStartDayClicked.subscribe((res: { day: DayDataPerMonth, dates: Array<any> }) => {
      if (this.datePickerService.isValid(this.endDate)) {
        this.emitDataAndClosePopup([res.day.date, moment(this.endDate).clone()]);
      } else {
        this.startDate = res.day.date;
        this.syncSValue();
      }
    });

    this.daterangePickerPopupRef.instance.onEndDayClicked.subscribe((res: { day: DayDataPerMonth, dates: Array<any> }) => {
      if (this.datePickerService.isValid(this.startDate)) {
        this.emitDataAndClosePopup([res.day.date, moment(this.startDate).clone()]);
      } else {
        this.endDate = res.day.date;
        this.syncEValue();
      }
    });

    this.daterangePickerPopupRef.instance.onItemLabelClicked.subscribe((res: DatePickerFooterItem) => {
      if (res && res.values && res.values.length === 2) {
        if (((res.values[0]) instanceof Function) && ((res.values[1]) instanceof Function)) {
          this.emitDataAndClosePopup([(<any>res.values[0])(), (<any>res.values[1])()]);
        } else {
          this.emitDataAndClosePopup([moment(<any>res.values[0]), moment(<any>res.values[1])]);
        }
      }
    });
  }

  private emitDataAndClosePopup(dates: Array<moment_.Moment>) {
    let sortedDates = this.datePickerService.sortDates(dates);
    this.startDate = sortedDates[0].clone();
    this.endDate = sortedDates[sortedDates.length - 1].clone();
    this.syncSValue();
    this.syncEValue();
    this.emitChange([this.startDate, this.endDate]);
    this.onDateRangeChanged.emit([this.startDate, this.endDate]);
    this.closePopup();
  }
  //#endregion

  //#region Implement for ControlValueAccessor
  writeValue(obj: any): void {
    if (obj && obj.length === 2 && this.datePickerService.isValid(obj[0]) && this.datePickerService.isValid(obj[1])) {
      let sortedDates = this.datePickerService.sortDates(obj);
      this.startDate = sortedDates[0].clone();
      this.endDate = sortedDates[sortedDates.length - 1].clone();
    } else {
      this.startDate = null;
      this.endDate = null;
    }

    this.syncSValue();
    this.syncEValue();
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
  //#endregion
}