import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * 单选按钮组件 - 作为单选按钮组{@link NpRadioGroup|RadioGroup}中的一个单选按钮使用
 */
@Component({
  selector: `np-radio-button`,
  templateUrl: 'radio-button.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpRadioButton),
      multi: true,
    }]
})

export class NpRadioButton implements OnInit {
  /**此单选按钮的值 */
  @Input() value;

  /**
   * 默认为圆形单选按钮
   * 
   * 'radio' - 若为此值，则单选按钮为圆形单选按钮
   * 
   * 'rectangle' - 若为此值，则单选按钮为长方形单选按钮
   */
  @Input() radioShape: any = 'radio';
  checked = false;
  /** 是否禁用 */
  @Input() isDisabled = false;

  /**当单选按钮选中状态改变时触发此事件，并emit当前选中的单选按钮的值 */
  @Output() onSelectChanged = new EventEmitter();

  ngOnInit() { }

  onChange() {
    if (!this.isDisabled) {
      this.onSelectChanged.next(this.value);
    }
  }
}

