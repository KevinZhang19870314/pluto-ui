import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter, forwardRef, SimpleChanges, OnChanges, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

/**
 * 复选框
 * 
 * <example-url>https://stackblitz.com/edit/np-checkbox-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-checkbox`,
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpCheckbox),
      multi: true,
    }]
})

export class NpCheckbox implements OnInit, ControlValueAccessor {
  val: string | boolean;
  /**复选框选中后的值由默认布尔的true改为此值。 */
  @Input() trueValue: any;
  /**复选框选中后的值由默认布尔的false改为此值。 */
  @Input() falseValue: any;
  /**设置此变量后，复选框颜色变为灰色，类似禁用的颜色 */
  @Input() forbiddenColor: boolean;
  /**是否禁用复选框 */
  @Input() isDisabled = false;
  /**当复选框选中状态改变时，触发此事件 */
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
    this.forbiddenColor = this.forbiddenColor !== undefined ? true : false;
  }

  onChange(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (this.forbiddenColor || this.isDisabled) {
      return;
    }

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


