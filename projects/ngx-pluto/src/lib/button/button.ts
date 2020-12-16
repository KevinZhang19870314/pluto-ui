import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, ViewChild, ElementRef, forwardRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/**
 * 按钮组件 - 主色调按钮、副色调按钮、取消按钮、可设置宽度按钮、上传文件按钮等
 * 
 * <example-url>https://stackblitz.com/edit/np-button-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-button`,
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpButton),
      multi: true,
    },
  ]
})
export class NpButton implements OnInit, ControlValueAccessor {
  private onChange: Function;
  inputDom: HTMLInputElement;

  @ViewChild('npButton') npButton: ElementRef<HTMLElement>;
  /**按钮类型
   * 
   * primary - 主色调按钮，即Pluto色；secondary - 副色调按钮；cancel - 取消按钮；search - 搜索按钮
   */
  @Input() buttonType: 'primary' | 'secondary' | 'cancel' | 'search';
  /**
   * 按钮宽度大小 - large - 300px；default - 180px；small - 80px。
   */
  @Input() buttonSize: 'large' | 'default' | 'small';
  /**
   * 继承父宽度 - `<np-button buttonBlock>继承父宽度</np-button>`
   */
  @Input() buttonBlock: any;
  /**是否禁用按钮。 */
  @Input() isDisabled: boolean;

  // #region 上传文件相关
  /**按钮功能类型 - normal - 默认类型；upload - 即为上传文件类型按钮。
   */
  @Input() funcType: 'normal' | 'upload' = 'normal';
  /**上传文件类型， 如：[uploadFileType]="'jpg|png|jpeg'"。
   * 
   * 特别说明一下格式，因为采用正则匹配，所以传入格式为'xlsx|xls'，用|隔开。
   */
  @Input() uploadFileType = '';
  /**二进制文件。 */
  @Input() file;
  /**文件改变触发事件， 即双向绑定。 */
  @Output() fileChange = new EventEmitter<any>();
  /**上传文件出错消息事件。 */
  @Output() uploadErrorMessage = new EventEmitter<string>();
  // #endregion

  ngOnInit() {
    this.buttonType = this.buttonType || 'primary';
    this.buttonSize = this.buttonType === 'search' ? 'small' : this.buttonSize || 'default';
    const element = this.npButton.nativeElement;
    if (this.buttonType === 'search' && this.buttonSize === 'default') {
      this.buttonSize = 'small';
    }

    element.classList.add(`button-${this.buttonType}`);
    if (['large', 'default', 'small'].indexOf(this.buttonSize) > -1) {
      element.classList.add(`button-size-${this.buttonSize}`);
    } else {
      element.style.width = this.buttonSize;
    }

    if (this.buttonBlock === '') {
      const parentWidth = element.parentElement.parentElement.offsetWidth;
      element.style.width = `${parentWidth - 54}px`;
    }

    if (this.isDisabled) {
      element.classList.add('button-disabled');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const contentChange = changes['isDisabled'];
    if (contentChange) {
      const value = contentChange.currentValue;
      if (value) {
        this.npButton.nativeElement.classList.add('button-disabled');
      } else {
        this.npButton.nativeElement.classList.remove('button-disabled');
      }
    }
  }

  upload() {
    if (this.funcType === 'upload' && !this.isDisabled) {
      this.inputDom = document.createElement('input');
      this.inputDom.type = 'file';
      this.inputDom.onchange = (event: any) => {
        const file = event.currentTarget.files[0];
        const fileName = file.name;
        if (this.uploadFileType) {
          const reg = new RegExp(`\.(${this.uploadFileType.toLowerCase()})|.(${this.uploadFileType.toUpperCase()})$`);
          if (!reg.test(fileName)) {
            this.uploadErrorMessage.emit(`文件格式不对，支持${this.uploadFileType}`);
            return;
          }
        }

        const obj = {};
        obj['fileName'] = fileName;
        obj['file'] = file;
        if (this.onChange) {
          this.onChange(file);
        }

        this.fileChange.emit(file);
      }
      this.inputDom.click();
    }
  }

  writeValue(obj: any): void {
    // clear file input
    if (this.inputDom) {
      document.removeChild(this.inputDom);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}


