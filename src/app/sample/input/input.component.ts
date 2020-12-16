import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})
export class InputComponent implements OnInit {

  inputVal: string = '';
  inputValWithLenLimit = '';
  errorMessage: string;
  requiredMessage: string;
  maxMessage: string;
  public testForm: FormGroup;
  cbkChecked = true;

  selectedItem = {
    id: '3',
    text: '测试新np-checkbox3'
  };
  logoName = '测测';

  get f() { return this.testForm.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inputVal = '3';
    this.errorMessage = '品牌名称不能为空';

    this.testForm = this.fb.group({
      logoName: [this.logoName, Validators.required],
      height: [3, [Validators.required]],
      shopName: [{ value: '某门店名称', disabled: true }, Validators.maxLength(10)],
      cbkTest: [true],
      radioTest: [{}],
    });
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

      if (this.testForm.get('shopName') && !this.testForm.get('shopName').valid) {
        this.maxMessage = '门店名称最多10个汉字';
      } else {
        this.maxMessage = '';
      }
    } else {
      this.requiredMessage = '';
      this.maxMessage = '';
    }
  }

  onGetValue() {

  }

  onBlur($event: any) {
    console.log($event);
  }
}
