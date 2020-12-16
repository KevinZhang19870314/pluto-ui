import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DatePickerType } from "./date-picker-popup";
import * as moment_ from 'moment'; const moment = moment_
import { NpDatePickerService } from "../date-picker.service";

/**
 * @ignore
 */
@Component({
    selector: `np-date-picker-footer`,
    templateUrl: 'date-picker-footer.html',
    styleUrls: ['date-picker-footer.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NpDatePickerFooter implements OnInit {
    @Input() datePickerType: DatePickerType = 'date-picker';
    @Input() footerItems: DatePickerFooterItem[] = [];

    @Output() onItemLabelClicked = new EventEmitter<DatePickerFooterItem>();

    today: string = '今天';
    todayTitle = moment().format('LL');

    constructor(private datePickerService: NpDatePickerService) { }

    ngOnInit() {
        this.today = this.datePickerService.calendar(moment(), this.datePickerService.locale) || this.today;
        this.todayTitle = moment().format('LL');
    }

    onTodayLabelClicked() {
        this.onItemLabelClicked.emit({ label: this.today, value: moment() });
    }

    onItemClicked(item: DatePickerFooterItem) {
        this.onItemLabelClicked.emit(item);
    }
}

export interface DatePickerFooterItem {
    /**显示在footer的自定义标签 */
    label: string;
    /**标签值，可以是moment对象，可以被moment转换的字符串，可以是返回moment对象的函数 */
    value?: moment_.Moment | string | (() => moment_.Moment);
    /**标签值数组，可以是moment对象数组，可以被moment转换的字符串数组，可以是返回moment对象的函数数组 */
    values?: Array<moment_.Moment> | Array<string> | Array<() => moment_.Moment>;
}