import { Component, ViewEncapsulation, forwardRef, ContentChildren, QueryList, ChangeDetectorRef, Input, HostListener, AfterContentInit, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NpRadioButton } from './radio-button.component';

/**
 * 单选按钮组 - 此标签作为一个单选按钮分组使用，内部可包含多个单选按钮组件{@link NpRadioButton|RadioButton}。
 * 
 * <example-url>https://stackblitz.com/edit/np-radio-button-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-radio-group`,
  templateUrl: 'radio-group.component.html',
  styleUrls: ['radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpRadioGroup),
      multi: true,
    }]
})

export class NpRadioGroup implements AfterContentInit, ControlValueAccessor {
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

  constructor(
    private _changeDetector: ChangeDetectorRef
  ) {
  }

  private _selected: NpRadioButton | null = null;
  private _value;

  /**单选框分组标签 */
  @Input()
  label = '';
  /**单选框分组是否必填，如为true，则标签前有红色星号，false则没有。注：此属性不作为校验属性，仅展示星号与否。 */
  @Input()
  isRequired = false;
  @ContentChildren(forwardRef(() => NpRadioButton), { descendants: true })
  _radios: QueryList<NpRadioButton>;
  _controlValueAccessorChangeFn: (value: any) => void = () => { };
  onTouched: () => any = () => { };
  ngAfterContentInit(): void {

    this._radios.toArray().forEach((cp, index) => {
      cp.onSelectChanged.subscribe(result => {
        this.value = result;
        console.log('<<<>>>', result);
        this._controlValueAccessorChangeFn(result);
        this._updateSelectedRadioFromValue();
        // this._changeDetector.detectChanges();
      })
    })
    //TODO: 第一次reactive form 赋值问题
    setTimeout(() => {
      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }, 0);

    // this._selected = this._radios.find((cp, index) => cp.value === this.value);
    // this._selected.checked=true
    // this._selected.onChange();
  }


  /**
 * Sets the model value. Implemented as part of ControlValueAccessor.
 * @param value
 */
  writeValue(value: any) {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
}
