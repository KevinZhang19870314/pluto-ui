import { Component, OnInit } from '@angular/core';
import { TDialogComponent } from '../dialog/dialog.component';
import { LoadingService, DialogService } from 'projects/ngx-pluto/src';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  public dateForm: FormGroup;
  public dateFormRange: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dateForm = this.fb.group({
      singleDate: ['2019-06-21 09:54:01', [Validators.required]]
    });

    this.dateFormRange = this.fb.group({
      dateRangeVal: [{ start: '2019-06-21 09:54:01', end: '2019-07-19 09:54:01' }, [Validators.required]]
    });
  }

  dateRangeVal = { start: '2019-06-06 19:53:08', end: '2019-07-12 19:53:08' };
  resultRange = '';
  onGetDateRange() {
    console.log('dateRangeVal = ' + JSON.stringify(this.dateRangeVal));
    this.resultRange = JSON.stringify(this.dateRangeVal);
  }

  dateVal = '2019-06-06 19:53:08';
  result = '';
  onGetDate() {
    console.log('dateVal = ' + this.dateVal);
    this.result = this.dateVal;
  }

  get singleF() { return this.dateForm.controls; }
  singleDateResult = '';
  onGetReactiveFormDate() {
    this.singleDateResult = this.singleF.singleDate.value;
  }

  get rangeF() { return this.dateFormRange.controls; }
  rangeDateResult = '';
  onGetReactiveFormRangeDate() {
    this.rangeDateResult = JSON.stringify(this.rangeF.dateRangeVal.value);
  }
}
