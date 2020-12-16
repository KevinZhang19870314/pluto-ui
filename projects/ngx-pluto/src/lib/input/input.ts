import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, HostListener, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from "@angular/forms";
import { Utils } from "../utils";

/**
 * 输入框
 * 
 * <example-url>https://stackblitz.com/edit/np-input-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-input`,
  templateUrl: 'input.html',
  styleUrls: ['input.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NpInput),
      multi: true,
    }]
})
export class NpInput implements OnInit, OnChanges, ControlValueAccessor, Validator {
  uuid = Utils.ID();

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
   */
  @Input() maxLen: number = -1;
  /**只允许填写数字 */
  @Input() numberOnly: boolean = false;

  private emitChange = (_: any) => { };

  @ViewChild('npInput') npInput: ElementRef<HTMLElement>;

  @Output() onBlur = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) { }
  }

  onChange(event: any) {
    this.emitChange(this.val);
  }

  onInputBlur(event: any) {
    this.emitChange(this.val);
    this.onBlur.next({ value: this.val, event: event });
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

  focus() {
    this.npInput.nativeElement.focus();
  }

  @HostListener('keyup', ['$event'])
  onKeyup(e: KeyboardEvent) {
    if (this.maxLen === -1) {
      return;
    }

    if (this.maxLen > -1) {
      this.calculateCurrentLen();
      this.val = this.val ? this.val.substring(0, this.maxLen) : '';
    }

    if (this.numberOnly) {
      this.val = this.val ? this.val.replace(this.chineseReg, '') : '';
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!this.isTriggerKeyEvents()) {
      return;
    }

    if (this.navigationKeys.indexOf(e.key) > -1 ||  // Allow: navigation keys: backspace, delete, arrows etc.
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

  private calculateCurrentLen() {
    this.currentLen = this.val ? this.val.toString().length : 0;
    this.currentLen = this.currentLen > this.maxLen ? this.maxLen : this.currentLen;
  }

  private isTriggerKeyEvents() {
    return this.maxLen !== -1 || this.numberOnly;
  }
}


