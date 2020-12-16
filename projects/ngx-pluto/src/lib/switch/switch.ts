import { Component, ViewEncapsulation, Input, OnInit, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * 开关
 * 
 * <example-url>https://stackblitz.com/edit/np-switch-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-switch`,
  templateUrl: 'switch.html',
  styleUrls: ['switch.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpSwitch),
      multi: true,
    }]
})

export class NpSwitch implements OnInit, ControlValueAccessor {
  val: string | boolean;
  /**标签 */
  @Input() label: string;
  /**开关为打开状态时的值，默认为true */
  @Input() trueValue: any;
  /**开关为关闭状态时的值，默认为false */
  @Input() falseValue: any;
  /**是否禁用 */
  @Input() isDisabled = false;
  /**是否必填 - 必填则有红色*号在标签前面；否则没有 */
  @Input() isRequired = false;
  /**标签的方向，left在开关左方，right在开关右方 */
  @Input() direction: 'left' | 'right' = "left";
  /**开关状态发生改变时触发事件 */
  @Output() inputModelChange = new EventEmitter();
  get ischecked(): boolean {
    if (this.trueValue || this.falseValue) {
      if (this.val === this.trueValue) {
        return true;
      }
      if (this.val === this.falseValue) {
        return false;
      }
    } else {
      return this.val ? true : false;
    }
  }
  private emitChange: Function = (_: any) => { };

  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    // 转换下传入的值
  }

  onChange(e: any) {
    if (this.isDisabled) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    if (this.ischecked) {
      this.val = this.falseValue || false;
      this.emitChange(this.val);
      this.inputModelChange.emit(this.val);
      return;

    }
    if (!this.ischecked) {
      this.val = this.trueValue || true;
      this.emitChange(this.val);
      this.inputModelChange.emit(this.val);
      return;
    }
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.val = obj;
      this.emitChange(this.val);
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
}


