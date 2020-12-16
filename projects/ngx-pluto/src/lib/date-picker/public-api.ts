export * from './components/date-picker-header';
export * from './date-picker';
export * from './components/date-picker-popup';
export * from './date-picker.module';

import * as moment_ from 'moment'; const moment = moment_;

export type DatePickerLocale = 'zh-cn' | 'en' | 'ja' | 'th';
export function registerNpDatePickerLocale(locale: DatePickerLocale = 'zh-cn') {
    moment.locale(locale);
}
