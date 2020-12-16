import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDatePicker } from './date-picker';
import { NpDatePickerHeader } from './components/date-picker-header';
import { NpDatePickerPopup } from './components/date-picker-popup';
import { NpInputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NpDatePickerFooter } from './components/date-picker-footer';
import { NpMonthPicker } from './month-picker/month-picker';
import { NpYearPicker } from './year-picker/year-picker';
import { NpTimePickerPanel } from './components/time-picker-panel';
import { NpButtonModule } from '../button/index';
import { NpDateRangePickerPopup } from './components/date-range-picker-popup';
import { NpDateRangePicker } from './date-range-picker/date-range-picker';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayModule,
        NpInputModule,
        NpButtonModule
    ],
    declarations: [
        NpDatePicker,
        NpMonthPicker,
        NpYearPicker,
        NpDatePickerHeader,
        NpDatePickerFooter,
        NpDatePickerPopup,
        NpTimePickerPanel,
        NpDateRangePickerPopup,
        NpDateRangePicker
    ],
    exports: [
        NpDatePicker,
        NpMonthPicker,
        NpYearPicker,
        NpDatePickerHeader,
        NpDatePickerFooter,
        NpDatePickerPopup,
        NpTimePickerPanel,
        NpDateRangePickerPopup,
        NpDateRangePicker
    ],
    entryComponents: [
        NpDatePickerPopup,
        NpDateRangePickerPopup
    ]
})
export class NpDateViaPickerModule { }
