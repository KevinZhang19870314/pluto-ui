import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  checkboxList2 = [{
    dispalyValue: '测试新np-checkbox1',
    trueValue: 'trueValue1号',
    falseValue: 'faleValue1号',
    checked: true
  }, {
    dispalyValue: '测试新np-checkbox2',
    checked: false,
    trueValue: 'trueValue2号',
    falseValue: 'faleValue2号',
  }, {
    dispalyValue: '测试新np-checkbox3',
    checked: true,
    trueValue: 'trueValue3号',
    falseValue: 'faleValue3号',
  }]
  checkboxList = [{
    dispalyValue: '测试新np-checkbox1',
    trueValue: 'trueValue1号',
    falseValue: 'faleValue1号',
    checked: true
  }, {
    dispalyValue: '测试新np-checkbox2',
    checked: false,
    trueValue: 'trueValue2号',
    falseValue: 'faleValue2号',
  }, {
    dispalyValue: '测试新np-checkbox3',
    checked: true,
    trueValue: 'trueValue3号',
    falseValue: 'faleValue3号',
  }]
  radioValue = '测试新np-checkbox2'
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
