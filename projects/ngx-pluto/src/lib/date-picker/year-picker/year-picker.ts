import { Component, ViewEncapsulation, OnInit, Input, ViewChild, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter, ComponentRef } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NpInput } from "../../input";
import { NpDatePickerService, YearData } from "../date-picker.service";
import { NpDatePickerPopup } from "../components/date-picker-popup";

/**
 * Year picker组件
 */
@Component({
  selector: `np-year-picker`,
  templateUrl: 'year-picker.html',
  styleUrls: ['year-picker.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpYearPicker),
      multi: true,
    }
  ]
})

export class NpYearPicker implements OnInit, OnChanges, ControlValueAccessor {

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
  /**时间展示格式 */
  @Input() format: string = 'YYYY';

  @Output() onYearChanged = new EventEmitter<any>();
  @Output() onYearClicked = new EventEmitter<YearData>();

  @ViewChild('yearPickerInput') yearPickerInput: NpInput;

  datePickerPopupRef: ComponentRef<NpDatePickerPopup>
  private overlayRef: OverlayRef;
  isHover: boolean = false;

  private emitChange = (_: any) => { };

  /**日期输入框文本值，每当this.date改变时此值会同步改变*/
  value: string;

  constructor(private datePickerService: NpDatePickerService) { }

  ngOnInit() {
    this.overlayRef = this.datePickerService.getOverlayRef(this.yearPickerInput.npInput);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

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
    this.datePickerPopupRef.instance.datePickerType = 'year-picker';
    this.datePickerPopupRef.instance.isShowYearsPanel = true;
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
    this.onYearChanged.emit(this.date);
  }

  onClear() {
    if (this.isDisabled) {
      return;
    }

    this.date = null;
    this.syncValue();
    this.emitChange(this.date);
    this.onYearChanged.emit(this.date);
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
    if (this.overlayRef.hasAttached) {
      this.overlayRef.detach();
    }
  }

  private subscribeNotifyEvents() {
    this.datePickerPopupRef.instance.onYearClicked.subscribe((res: YearData) => {
      this.emitDataAndClosePopup(res.date);
    });
  }

  private emitDataAndClosePopup(date: moment_.Moment) {
    this.date = date;
    this.syncValue();
    this.emitChange(this.date);
    this.onYearChanged.emit(this.date);
    this.yearPickerInput.focus();
    this.closePopup();
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