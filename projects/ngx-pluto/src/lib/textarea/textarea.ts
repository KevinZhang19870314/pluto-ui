import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from "@angular/forms";

/**
 * 多行文本输入框
 * 
 * <example-url>https://stackblitz.com/edit/np-textarea-example?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-textarea`,
  templateUrl: 'textarea.html',
  styleUrls: ['textarea.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpTextarea),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NpTextarea),
      multi: true,
    }]
})

export class NpTextarea implements OnInit, OnChanges, ControlValueAccessor, Validator {


  val: string;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  currentLen: number = 0;
  chineseReg = /[^\x00-\xff]/g;

  /**标签 */
  @Input() label: string;
  /**是否必填 - 必填则有红色*号在标签前面；否则没有 */
  @Input() isRequired: boolean;
  /**占位符 */
  @Input() placeholder: string = '';
  /**错误信息 - 将以红色字体显示在输入框下方 */
  @Input() errorMessage: string;
  /**是否禁用 */
  @Input() isDisabled: boolean;

  /**
   * 最大长度
   * 
   * Default -1 indicate that the length of input is not limited
   * The max of maxLen is 999
   */
  @Input() maxLen: number = -1;
  /**只允许填写数字 */
  @Input() numberOnly: boolean = false;
  private emitChange = (_: any) => { };

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {

    }
  }

  onChange(event: any) {
    let newValue = event.target.value;
    this.emitChange(newValue);


  }

  writeValue(obj: any): void {
    if (obj || obj === '') {
      this.val = obj;
      if (this.maxLen > -1) {
        this.calculateCurrentLen();
      }
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors {
    // TODO: customize validation
    return null;
  }

  @HostListener('keyup', ['$event'])
  onKeyup(e: KeyboardEvent) {
    if (this.maxLen === -1) {
      return;
    }

    if (this.maxLen > -1) {
      this.calculateCurrentLen();

      // Hack: when typing chinese character, input control will not prevent the character typing
      let chineseCharLen = this.val ? (this.val.match(this.chineseReg) || []) : [];
      if (chineseCharLen.length > 0) {
        this.val = this.val.substring(0, this.maxLen);
      }
    }

    if (this.numberOnly) {
      this.val = this.val ? this.val.replace(this.chineseReg, '') : '';
    }
  }

  private isTriggerKeyEvents() {
    return this.maxLen !== -1 || this.numberOnly;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!this.isTriggerKeyEvents()) {
      return;
    }

    if (
      this.navigationKeys.indexOf(e.key) > -1 ||  // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) ||    // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) ||    // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) ||    // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) ||    // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) ||    // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) ||    // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) ||    // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true)       // Allow: Cmd+X (Mac)
    ) {
      return;
    }

    if (this.maxLen > -1) {
      let hightlightText = window.getSelection() + '';
      if (this.val && this.val.length >= this.maxLen && hightlightText === '') {
        e.preventDefault();
      }
    }

    if (this.numberOnly) {
      if (isNaN(Number(e.key))) {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (!this.isTriggerKeyEvents()) {
      return;
    }

    event.preventDefault();

    let currentVal = this.val;
    if (this.maxLen > -1 || this.numberOnly) {
      let clipboardData = event.clipboardData.getData('text/plain');

      if (this.numberOnly) {
        let pastedInput: string = clipboardData.replace(/\D/g, ''); // get a number-only string
        this.val = currentVal + pastedInput;
      }

      if (this.maxLen > -1) {
        let pastedInput: string = clipboardData.substring(0, this.maxLen);
        this.val = currentVal + pastedInput;
      }
    }
  }
  private calculateCurrentLen() {
    this.currentLen = this.val ? this.val.length : 0;
    this.currentLen = this.currentLen > this.maxLen ? this.maxLen : this.currentLen;
  }
}


