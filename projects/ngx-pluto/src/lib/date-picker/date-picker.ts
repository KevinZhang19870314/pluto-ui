import { Component, ViewEncapsulation, OnInit, Input, ViewChild, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter, ComponentRef, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { NpDatePickerService, DayDataPerMonth } from "./date-picker.service";
import * as moment_ from 'moment'; const moment = moment_
import { OverlayRef } from "@angular/cdk/overlay";
import { NpDatePickerPopup } from "./components/date-picker-popup";
import { ComponentPortal } from "@angular/cdk/portal";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "./date-picker-const";
import { NpInput } from "../input";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { DatePickerFooterItem } from "./components/date-picker-footer";

/**
 * Date picker组件
 */
@Component({
  selector: `np-date-picker`,
  templateUrl: 'date-picker.html',
  styleUrls: ['date-picker.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpDatePicker),
      multi: true,
    }
  ]
})

export class NpDatePicker implements OnInit, OnChanges, ControlValueAccessor {

  /**标签 */
  @Input() label: string;
  /**是否必填，true仅在标签前面添加红色*号， false不加*/
  @Input() isRequired: boolean;
  /**Placeholder */
  @Input() placeholder: string = '';
  /**校验错误时显示错误信息 */
  @Input() errorMessage: string;
  /**是否禁用 */
  @Input() isDisabled: boolean;

  /**已选时间 */
  @Input() date: moment_.Moment | string = null;
  /**日期时间展示格式，默认只展示日期 */
  @Input() format: string = DATE_FORMAT;
  /**是否展示时间，默认不展示 */
  @Input() isShowTime: boolean = false;
  /**显示在footer左侧的自定义时间标签数组，如“昨天”等 */
  @Input() footerItems: DatePickerFooterItem[] = [];
  /**当为datetime-picker时，底部面板最右侧展示的确认按钮名称 */
  @Input() confirmButtonText: string = '确认';

  @Output() onDateChanged = new EventEmitter<any>();

  @ViewChild('datePickerInput') datePickerInput: NpInput;
  datePickerPopupRef: ComponentRef<NpDatePickerPopup>;

  private overlayRef: OverlayRef;
  isHover: boolean = false;

  private emitChange = (_: any) => { };

  /**日期输入框文本值，每当this.date改变时此值会同步改变*/
  value: string;

  constructor(private datePickerService: NpDatePickerService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.overlayRef = this.datePickerService.getOverlayRef(this.datePickerInput.npInput);

    if (this.isShowTime) {
      this.format = DATE_TIME_FORMAT;
    }
  }

  ngOnChanges(changes: SimpleChanges): void { }

  onToggleDatePickerPopup() {
    if (this.isDisabled) {
      return;
    }

    if (this.overlayRef.hasAttached()) {
      this.closePopup();
      return;
    }

    this.datePickerPopupRef = this.overlayRef.attach(new ComponentPortal(NpDatePickerPopup));
    this.datePickerPopupRef.instance.date = moment(this.date);
    this.datePickerPopupRef.instance.datePickerType = this.isShowTime ? 'datetime-picker' : 'date-picker';
    this.datePickerPopupRef.instance.footerItems = this.footerItems;
    this.datePickerPopupRef.instance.isShowTime = this.isShowTime;
    this.datePickerPopupRef.instance.confirmButtonText = this.confirmButtonText;
    this.subscribeNotifyEvents();

    this.overlayRef.backdropClick().subscribe(() => {
      this.closePopup();
    });
  }

  onBlur(data: { value: any, event: any }) {
    if (this.datePickerService.isValid(data.value)) {
      this.date = moment(data.value, this.format).clone();
    } else {
      // 如果输入日期不合法，默认当前时间
      this.date = moment().clone();
    }

    this.syncValue();
    this.emitChange(this.date);
    this.onDateChanged.emit(this.date);
  }

  onClear() {
    if (this.isDisabled) {
      return;
    }

    this.date = null;
    this.syncValue();
    this.emitChange(this.date);
    this.onDateChanged.emit(this.date);
  }

  onMouseenter() {
    this.isHover = true;
  }

  onMouseleave() {
    this.isHover = false;
  }

  //#region Private methods

  /**每次this.date改变时，这个方法都必须要调用 */
  private syncValue() {
    if (this.date && this.datePickerService.isValid(this.date)) {
      this.value = moment(this.date, this.format).format(this.format);
    } else {
      this.value = '';
    }
  }

  private closePopup() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private subscribeNotifyEvents() {
    this.datePickerPopupRef.instance.onDayClicked.subscribe((res: DayDataPerMonth) => {
      this.emitDataAndClosePopup(res.date);
    });

    this.datePickerPopupRef.instance.onItemLabelClicked.subscribe((res: DatePickerFooterItem) => {
      if (res.value instanceof Function) {
        this.emitDataAndClosePopup(res.value());
      } else {
        this.emitDataAndClosePopup(moment(res.value));
      }

      this.closePopup();
    });

    if (this.isShowTime) {
      this.datePickerPopupRef.instance.onTimeClicked.subscribe((res: string) => {
        let date = moment(moment(this.date).format(DATE_FORMAT) + ' ' + res);
        this.emitDataAndClosePopup(date);
      });

      this.datePickerPopupRef.instance.onConfirmClicked.subscribe((res: string) => {
        let date = moment(moment(this.date).format(DATE_FORMAT) + ' ' + res);
        this.emitDataAndClosePopup(date);
        this.closePopup();
      });
    }
  }

  private emitDataAndClosePopup(date: moment_.Moment) {
    this.date = date;
    this.syncValue();
    this.emitChange(moment(this.date));
    this.onDateChanged.emit(moment(this.date));
    this.datePickerInput.focus();
    if (!this.isShowTime) {
      this.closePopup();
    }
  }
  //#endregion

  //#region Implement for ControlValueAccessor
  writeValue(obj: any): void {
    this.date = obj;
    this.syncValue();
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
  //#endregion
}