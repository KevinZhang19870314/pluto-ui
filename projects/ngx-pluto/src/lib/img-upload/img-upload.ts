import { Component, ViewEncapsulation, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, forwardRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Utils } from "../common/utils";

/**
 * 图片上传组件 - 支持NgModel和reactive forms
 * 
 * <example-url>https://stackblitz.com/edit/np-img-upload-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-img-upload`,
  templateUrl: 'img-upload.html',
  styleUrls: ['img-upload.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpImgUpload),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NpImgUpload),
      multi: true,
    }],
  encapsulation: ViewEncapsulation.None
})

export class NpImgUpload implements OnInit, ControlValueAccessor, Validator {
  private emitChange = (_: any) => { };

  /**标签 */
  @Input() label: string = '选择图片';

  /**是否禁用 */
  @Input() isDisabled: boolean;

  /**是否忽略宽高检查，true - 忽略宽高检查，false - 检查宽高  */
  @Input() ignoreWidthAndHeightCheck: boolean = false;

  /**是否必填 - 必填则有红色*号在标签前面；否则没有 */
  @Input() isRequired: boolean;

  /**上传图片按钮文字 */
  @Input() btnText: string = '点击上传';

  /**图片描述，如尺寸、格式、大小等 */
  @Input() imgDesc: string = '*图片描述，如尺寸、格式、大小等*';

  /**图片格式，默认jpg、png和jpeg */
  @Input() imgFormat: string = 'jpg|png|jpeg';

  /**图片大小，默认最大500kb */
  @Input() maxSize: number = 500;

  /**图片宽度px */
  @Input() width: number;

  /**图片高度px */
  @Input() height: number;

  /**错误信息 - 将以红色字体显示在上传按钮下方 */
  @Input() errorMessage: string;


  /**当重新选择图片时触发 */
  @Output() onImgFileChanged = new EventEmitter<any>();

  /**上传错误，如尺寸不对、格式不对，大小不对等 */
  @Output() onUploadError = new EventEmitter<string>();

  /**点击缩略图是触发 */
  @Output() onImgClicked = new EventEmitter<any>();

  currentImgFile: File = null;
  currentImgSrc: any = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  onCurrentImgFileChanged(file: File) {
    const filename = file.name;
    const reg = new RegExp(`\.(${this.imgFormat.toLowerCase()})|.(${this.imgFormat.toUpperCase()})$`);
    if (!reg.test(filename)) {
      this.errorMessage = '图片格式不对，支持' + this.imgFormat.split('|').join('、');
      this.onUploadError.next(this.errorMessage);
      this.emitChange({ file: null, src: null });
      return;
    }

    if (file.size > +this.maxSize * 1024) {
      this.errorMessage = '图片大于' + this.maxSize + 'kb，请重新选择';
      this.onUploadError.next(this.errorMessage);
      this.emitChange({ file: null, src: null });
      return;
    }

    Utils.checkImgWidthAndHeight(file, +this.width, +this.height).subscribe(res => {
      if (!res && !this.ignoreWidthAndHeightCheck) {
        this.errorMessage = '图片大小必须为' + this.width + '*' + this.height;
        this.onUploadError.next(this.errorMessage);
        this.emitChange({ file: null, src: null });
        return;
      }

      this.errorMessage = '';
      this.currentImgSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.currentImgFile = file;

      this.emitChange({ file: this.currentImgFile, src: this.currentImgSrc });
      this.onImgFileChanged.next({ file: this.currentImgFile, src: this.currentImgSrc });
      return true;
    });
  }

  onUploadImgFormatError(msg: string) {
    this.errorMessage = '图片格式不对，支持' + this.imgFormat.split('|').join('、');
    this.onUploadError.next(this.errorMessage);
    this.emitChange({ file: null, src: null });
  }

  onCurrentImgClick() {
    this.onImgClicked.next({file: this.currentImgFile, src: this.currentImgSrc});
  }

  writeValue(obj: any): void {
    if (obj) {
      this.currentImgFile = obj.file;
      this.currentImgSrc = obj.src;
    } else {
      this.currentImgFile = null;
      this.currentImgSrc = null;
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.isRequired) {
      if (control && control.value && !control.value.file && !control.value.src) {
        return { 'imgError': true };
      }

      if (control && !control.value) {
        return { 'imgError': true };
      }
    }

    return null;
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }
}