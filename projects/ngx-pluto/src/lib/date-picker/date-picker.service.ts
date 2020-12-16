import { Injectable, ElementRef } from '@angular/core';
import * as moment_ from 'moment'; const moment = moment_
import { OverlayPositionBuilder, ConnectedPosition, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { DatePickerLocale } from './public-api';
import { DATE_FORMAT, TIME_FORMAT } from './date-picker-const';

@Injectable({
    providedIn: 'root'
})
export class NpDatePickerService {

    public get locale(): DatePickerLocale {
        return moment.locale() as DatePickerLocale;
    }

    constructor(private overlayPositionBuilder: OverlayPositionBuilder,
        private overlay: Overlay) { }

    /**
     * 根据传入的moment时间及传入的年份生成年份范围数组YearData。
     * 例如：year = 2020， 年份范围value示例为
     * 
     * [
     * 
     *      2019, 2020, 2021, 
     * 
     *      2022, 2023, 2024, 
     * 
     *      2025, 2026, 2027, 
     * 
     *      2028, 2029, 2030
     * 
     * ]
     * @param date Moment时间
     * @param year 年份YYYY， 例：2020
     * @param selectedDate 当前选中的日期
     */
    buildYearsPanel(date: moment_.Moment, year: string, selectedDate: moment_.Moment): Array<YearData> {
        let years: Array<YearData> = [];

        let lastNumOfYear: number = +year.charAt(3);
        let start = lastNumOfYear;
        let end = 10 - lastNumOfYear;

        let copyDateStart = date.clone();
        while (start >= 0) {
            const cur = copyDateStart.add(-1, 'year');
            years.push({
                available: start > 0,
                value: cur.format('YYYY'),
                isSelected: selectedDate ? selectedDate.format('YYYY') === cur.format('YYYY') : false,
                date: cur.clone()
            });
            start--;
        }

        years.push({
            available: true,
            value: date.format('YYYY'),
            isSelected: selectedDate ? selectedDate.format('YYYY') === date.format('YYYY') : false,
            date: date.clone()
        });

        let copyDateEnd = date.clone();
        while (end <= 10 && end > 0) {
            const cur = copyDateEnd.add(1, 'year');
            years.push({
                available: end > 1,
                value: cur.format('YYYY'),
                isSelected: selectedDate ? selectedDate.format('YYYY') === cur.format('YYYY') : false,
                date: cur.clone()
            });
            end--;
        }

        return years.sort((a, b) => { return (+a.value - +b.value); });
    }

    /**
     * 构建当前年份的全部月份
     * @param selectedDate 当前选中的日期
     */
    buildMonthsPanel(date: moment_.Moment, selectedDate: moment_.Moment): Array<MonthData> {
        let m = moment.monthsShort();
        let months: Array<MonthData> = [];
        for (let i = 0; i < m.length; i++) {
            months.push({
                available: true,
                value: m[i],
                isSelected: selectedDate ? m[i] === selectedDate.format('MMM') : false,
                date: moment(date.format('YYYY') + m[i] + date.format('DD'), 'YYYYMMMDD')
            })
        }

        return months;
    }

    /**
     * 根据传入的日期构建当前显示日历面板（当前这个月的天数面板）。
     * 例如：传入日期为2020/08/20，则返回一个DayDataPerMonth数组，
     * 其中的value示例如下:
     * 
     * ['日', '一', '二', '三', '四', '五', '六', 
     * 
     *  '26', '27', '28', '29', '30', '31', '1', 
     * 
     *  '2',  '3',  '4',  '5',  '6',  '7',  '8',
     * 
     *  '9',  '10', '11', '12', '13', '14', '15',
     * 
     *  '16', '17', '18', '19', '20', '21', '22',
     * 
     *  '23', '24', '25', '26', '27', '28', '29',
     * 
     *  '30', '31',  '1',  '2',  '3',  '4',  '5']
     * @param date 构建日期面板的日期
     * @param selectedDate 当前选中的日期
     * @param isRangePicker 是否是时间区间选择
     * @param dates 当isRangePicker为true时，需要传入此时间区间字段，代表时间区间已选择的区间值
     */
    buildDaysPanel(date: moment_.Moment, selectedDate: moment_.Moment): Array<DayDataPerMonth> {
        const total = 49;
        let days: Array<DayDataPerMonth> = [];
        let copyDate = date.clone();
        let weekdaysMin = this.getWeekdaysMin();
        weekdaysMin.forEach(item => {
            days.push({ available: false, value: item, isSelected: false, isWeekDayMin: true, date: null });
        });

        let startOfMonth = copyDate.clone().startOf('month');
        startOfMonth = moment(startOfMonth.format(DATE_FORMAT) + ' ' + copyDate.format(TIME_FORMAT));
        // 获取当月第一天是周几，如2020/08/01是周六，则得到的是“六”
        let weekDayMin_startOfMonth = weekdaysMin[+startOfMonth.weekday() + 1];
        let index_weekDayMin_startOfMonth = weekdaysMin.indexOf(weekDayMin_startOfMonth);
        // 添加上月后几天用以补足当前面板
        while (index_weekDayMin_startOfMonth > 0) {
            days.push({
                available: false,
                value: startOfMonth.clone().add(-index_weekDayMin_startOfMonth, 'day').format('D'),
                isSelected: false,
                isWeekDayMin: false,
                date: startOfMonth.clone().add(-index_weekDayMin_startOfMonth, 'day').clone()
            });
            index_weekDayMin_startOfMonth--;
        }

        let lastOfMonth = copyDate.clone().endOf('month');
        lastOfMonth = moment(lastOfMonth.format(DATE_FORMAT) + ' ' + copyDate.format(TIME_FORMAT));
        // 获取当月最后天是周几，如2020/08/31是周一，则得到的是“一”
        // 添加当月到当前面板数组
        while (startOfMonth <= lastOfMonth) {
            days.push({
                available: true,
                value: startOfMonth.format('D'),
                isSelected: selectedDate ? startOfMonth.format(DATE_FORMAT) === selectedDate.format(DATE_FORMAT) : false,
                isWeekDayMin: false,
                date: startOfMonth.clone()
            });
            startOfMonth = startOfMonth.add(1, 'day');
        }

        // 添加下月前几天用以补足当前面板
        let i = 1;
        while (days.length < total) {
            days.push({
                available: false,
                value: lastOfMonth.clone().add(i, 'day').format('D'),
                isSelected: false,
                isWeekDayMin: false,
                date: lastOfMonth.clone().add(i, 'day').clone()
            });
            i++;
        }

        return days;
    }

    sortDates(dates: Array<moment_.Moment>, asc: boolean = true) {
        return dates.sort((a, b) => asc ? a.diff(b) : b.diff(a));
    }

    buildStartAndEndDates(sDate: moment_.Moment, eDate: moment_.Moment) {
        if (!sDate || !eDate) {
            return [];
        }

        if (moment(sDate) < moment(eDate)) {
            return [sDate, eDate];
        }

        return [eDate, sDate];
    }

    day(date: moment_.Moment) {
        if (date) {
            return moment(date.format(DATE_FORMAT + ' 00:00:00'), 'YYYY-MM-DD');
        }

        return moment();
    }

    private getDayStatus(currentDate: moment_.Moment, hoverDate: moment_.Moment, dates: Array<moment_.Moment> = []): DayStatusForRangePicker {
        if (!dates || dates.length === 0) {
            return 'normal';
        }

        const day = (date: moment_.Moment) => {
            if (date) {
                return moment(date.format(DATE_FORMAT + ' 00:00:00'), 'YYYY-MM-DD');
            }

            return moment();
        }

        let sortedDates = this.sortDates([hoverDate, ...dates]);
        if (currentDate < sortedDates[0] || currentDate > sortedDates[2]) {
            return 'normal' as DayStatusForRangePicker;
        }

        if (day(hoverDate).diff(dates[0]) < 0) {
            if (day(currentDate).diff(day(hoverDate)) < 0) {
                return 'normal';
            } else if (day(currentDate).diff(hoverDate) >= 0 && day(currentDate).diff(dates[0]) < 0) {
                return 'within-hover';
            } else if (day(currentDate).diff(dates[0]) >= 0 && day(currentDate).diff(dates[1]) <= 0) {
                return 'within-selected';
            } else if (day(currentDate).diff(dates[1]) > 0) {
                return 'normal';
            }
        }

        if (day(hoverDate).diff(dates[0]) >= 0 && day(hoverDate).diff(dates[1]) <= 0) {
            if (day(currentDate).diff(day(dates[0])) < 0) {
                return 'normal';
            } else if (day(currentDate).diff(dates[0]) >= 0 && day(currentDate).diff(hoverDate) < 0) {
                return 'within-selected-hover';
            } else if (day(currentDate).diff(hoverDate) >= 0 && day(currentDate).diff(dates[1]) <= 0) {
                return 'within-selected';
            } else if (day(currentDate).diff(dates[1]) > 0) {
                return 'normal';
            }
        }

        if (day(hoverDate).diff(dates[1]) > 0) {
            if (day(currentDate).diff(day(dates[0])) < 0) {
                return 'normal';
            } else if (day(currentDate).diff(dates[0]) >= 0 && day(currentDate).diff(dates[1]) < 0) {
                return 'within-selected';
            } else if (day(currentDate).diff(dates[1]) >= 0 && day(currentDate).diff(hoverDate) <= 0) {
                return 'within-hover';
            } else if (day(currentDate).diff(hoverDate) > 0) {
                return 'normal';
            }
        }

        return 'normal' as DayStatusForRangePicker;
    }

    /**
     * 构建时间区间选择当鼠标hover面板时的状态，同buildDaysPanel的功能，
     * 增加对象DayDataPerMonth中对字段isWithinDateRangeHover的值的区分。
     * 
     * @param date 构建日期面板的日期
     * @param selectedDate 当前选中的日期
     * @param hoverDate 当前hover的时间moment值
     * @param dates 需要传入此时间区间字段，代表时间区间已选择的区间值
     */
    buildDaysPanelForRangePicker(date: moment_.Moment, selectedDate: moment_.Moment,
        hoverDate: moment_.Moment, dates: Array<moment_.Moment> = []) {
        const total = 49;
        let days: Array<DayDataPerMonth> = [];
        let copyDate = date.clone();
        let weekdaysMin = this.getWeekdaysMin();
        weekdaysMin.forEach(item => {
            days.push({ available: false, value: item, isSelected: false, isWeekDayMin: true, date: null, hoverDateType: 'normal' });
        });

        let startOfMonth = copyDate.clone().startOf('month');
        startOfMonth = moment(startOfMonth.format(DATE_FORMAT) + ' ' + copyDate.format(TIME_FORMAT));
        // 获取当月第一天是周几，如2020/08/01是周六，则得到的是“六”
        let weekDayMin_startOfMonth = weekdaysMin[+startOfMonth.weekday() + 1];
        let index_weekDayMin_startOfMonth = weekdaysMin.indexOf(weekDayMin_startOfMonth);
        // 添加上月后几天用以补足当前面板
        while (index_weekDayMin_startOfMonth > 0) {
            let cDate = startOfMonth.clone().add(-index_weekDayMin_startOfMonth, 'day').clone();
            days.push({
                available: false,
                value: cDate.format('D'),
                isSelected: false,
                isWeekDayMin: false,
                date: cDate,
                hoverDateType: this.getDayStatus(cDate, hoverDate, dates)
            });
            index_weekDayMin_startOfMonth--;
        }

        let lastOfMonth = copyDate.clone().endOf('month');
        lastOfMonth = moment(lastOfMonth.format(DATE_FORMAT) + ' ' + copyDate.format(TIME_FORMAT));
        // 获取当月最后天是周几，如2020/08/31是周一，则得到的是“一”
        // 添加当月到当前面板数组
        while (startOfMonth <= lastOfMonth) {
            days.push({
                available: true,
                value: startOfMonth.format('D'),
                isSelected: selectedDate ? startOfMonth.format(DATE_FORMAT) === selectedDate.format(DATE_FORMAT) : false,
                isWeekDayMin: false,
                date: startOfMonth.clone(),
                hoverDateType: this.getDayStatus(startOfMonth.clone(), hoverDate, dates)
            });
            startOfMonth = startOfMonth.add(1, 'day');
        }

        // 添加下月前几天用以补足当前面板
        let i = 1;
        while (days.length < total) {
            let cDate = lastOfMonth.clone().add(i, 'day').clone();
            days.push({
                available: false,
                value: cDate.format('D'),
                isSelected: false,
                isWeekDayMin: false,
                date: cDate.clone(),
                hoverDateType: this.getDayStatus(cDate, hoverDate, dates)
            });
            i++;
        }

        return days;
    }

    getWeekdaysMin() {
        return moment.weekdaysMin();
    }

    getOverlayRef(elementRef: ElementRef): OverlayRef {
        const popupPositions: ConnectedPosition[] = [{
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top",
            offsetX: 0,
            offsetY: 1
        }, {
            originX: "start",
            originY: "top",
            overlayX: "start",
            overlayY: "bottom",
            offsetX: 0,
            offsetY: -1
        }];

        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(elementRef)
            .withPositions(popupPositions);


        return this.overlay.create({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.noop()
        });
    }

    /**获取calendar时间，例如今天，昨天，明天等 */
    calendar(date: moment_.Moment, locale: DatePickerLocale = 'zh-cn') {
        let calendarDate = '';
        switch (locale) {
            case 'zh-cn':
                calendarDate = date.calendar({
                    sameDay: '[今天]',
                    nextDay: '[明天]',
                    nextWeek: 'dddd',
                    lastDay: '[昨天]',
                    lastWeek: '[上] dddd',
                    sameElse: 'DD/MM/YYYY'
                });
                break;
            case 'en':
                calendarDate = date.calendar({
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'DD/MM/YYYY'
                });
                break;
            default:
                calendarDate = date.calendar({
                    sameDay: '[今天]',
                    nextDay: '[明天]',
                    nextWeek: 'dddd',
                    lastDay: '[昨天]',
                    lastWeek: '[上] dddd',
                    sameElse: 'DD/MM/YYYY'
                });
                break;
        }

        return calendarDate;
    }

    isValid(date: moment_.Moment | string) {
        return date && moment(date).isValid();
    }
}

export interface DateData {
    /**是否可选 */
    available: boolean;
    /**当前值 */
    value: string;
    /**当前是否选中 */
    isSelected: boolean;
    /**当前日期 */
    date: moment_.Moment;
}

export interface DayDataPerMonth extends DateData {
    /**是否是第一行的周 */
    isWeekDayMin: boolean;
    /**当datepickertype为date-range-picker的时候，鼠标hover后在候选时间区间的则为true，否则false */
    hoverDateType?: DayStatusForRangePicker;
}

/**
 * 区间时间选择在所有日期天数面板的状态及对应样式
 * 
 * normal - 正常日期天数 无额外样式
 * 
 * within-hover - 在hover的时间区间里面 有虚线边框
 * 
 * within-selected - 在已选的时间区间里面 有背景色
 * 
 * within-selected-hover - 在已选的时间区间里面被hover 加深背景色
 */
export type DayStatusForRangePicker = 'normal' | 'within-hover' | 'within-selected' | 'within-selected-hover';

export interface YearData extends DateData { }

export interface MonthData extends DateData { }