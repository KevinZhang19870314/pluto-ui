import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss']
})
export class TextareaComponent implements OnInit {

  inputVal: string = '';
  errorMessage: string;
  requiredMessage: string;
  maxMessage: string;
  public testForm: FormGroup;
  cbkChecked = true;

  selectedItem

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inputVal = '';
    this.errorMessage = '品牌名称不能为空';

    this.testForm = this.fb.group({
      logoName: ['', Validators.required],
      shopName: [{ value: '某门店名称', disabled: true }, Validators.maxLength(10)],
      cbkTest: [true],
      radioTest: [{}]
    })
  }

  onTooglecbkTest() {
    this.cbkChecked = this.testForm.get('cbkTest').value;
    this.testForm.patchValue({ cbkTest: !this.cbkChecked });
  }

  onFormValidCheck() {
    console.log('radioTest = ' + JSON.stringify(this.testForm.get('radioTest').value));
    console.log('cbkTest = ' + this.testForm.get('cbkTest').value);
    console.log('品牌名称 = ' + this.testForm.get('logoName').value);
    console.log('门店名称 = ' + this.testForm.get('shopName').value);
    if (!this.testForm.valid) {
      if (this.testForm.get('logoName') && !this.testForm.get('logoName').valid) {
        this.requiredMessage = '品牌名称不能为空';
      } else {
        this.requiredMessage = '';
      }

      if (this.testForm.get('shopName') && this.testForm.get('shopName').invalid) {
        this.maxMessage = '门店名称最多10个汉字';
      } else {
        this.maxMessage = '';
      }
    } else {
      this.requiredMessage = '';
      this.maxMessage = '';
    }
  }
}
