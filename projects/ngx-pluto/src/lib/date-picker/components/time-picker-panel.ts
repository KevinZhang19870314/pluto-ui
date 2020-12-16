import { Component, ViewEncapsulation, OnInit, Input, ElementRef, ViewChild, SimpleChanges, Output, EventEmitter } from "@angular/core";
import * as moment_ from 'moment'; const moment = moment_
import { NpDatePickerService } from "../date-picker.service";
import { NotifyService } from "../../shared/services/notify.service";

/**
 * @ignore
 */
@Component({
    selector: `np-time-picker-panel`,
    templateUrl: 'time-picker-panel.html',
    styleUrls: ['time-picker-panel.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpTimePickerPanel implements OnInit {
    /**传入time，格式为‘HH:mm:ss，如23:59:59’ */
    @Input() time: string;
    @Input() confirmButtonText: string;

    @Output() onTimeClicked = new EventEmitter<string>();
    @Output() onConfirmClicked = new EventEmitter<string>();

    @ViewChild('hoursElementRef') hoursElementRef: ElementRef<HTMLElement>;
    @ViewChild('minutesElementRef') minutesElementRef: ElementRef<HTMLElement>;
    @ViewChild('secondsElementRef') secondsElementRef: ElementRef<HTMLElement>;

    hours: Array<string> = [];
    minutes: Array<string> = [];
    seconds: Array<string> = [];
    selectedHour: string = '';
    selectedMinute: string = '';
    selectedSecond: string = '';

    constructor(private datePickerService: NpDatePickerService,
        private notifyService: NotifyService) { }

    ngOnInit() {
        this.buildData();
    }

    ngOnChanges(changes: SimpleChanges) {
        const time: string = changes['time'].currentValue as string;
    }

    onHourClicked(hour: string) {
        this.selectedHour = hour;
        this.buildSelectedTime();
        this.onTimeClicked.emit(this.time);
    }

    onMinuteClicked(minute: string) {
        this.selectedMinute = minute;
        this.buildSelectedTime();
        this.onTimeClicked.emit(this.time);
    }

    onSecondClicked(second: string) {
        this.selectedSecond = second;
        this.buildSelectedTime();
        this.onTimeClicked.emit(this.time);
    }

    onConfirmButtonClicked() {
        this.onConfirmClicked.emit(this.time);
    }

    /**
     * 根据传入时间滚动到指定时间位置
     * @param time 当前传入时间，格式为@link TIME_FORMAT
     */
    scrollTo(time: string) {
        const itemHeight = 28;   // each item height is 28px
        this.selectedHour = time.split(':')[0];
        this.selectedMinute = time.split(':')[1];
        this.selectedSecond = time.split(':')[2];

        this.hoursElementRef.nativeElement.scrollTo({
            top: +this.selectedHour * itemHeight
        });

        this.minutesElementRef.nativeElement.scrollTo({
            top: +this.selectedMinute * itemHeight
        });

        this.secondsElementRef.nativeElement.scrollTo({
            top: +this.selectedSecond * itemHeight
        });
    }

    private buildData() {
        for (let i = 0; i < 24; i++) {
            this.hours.push((i + '').padStart(2, '0'));
        }

        for (let i = 0; i < 60; i++) {
            this.minutes.push((i + '').padStart(2, '0'));
        }

        for (let i = 0; i < 60; i++) {
            this.seconds.push((i + '').padStart(2, '0'));
        }
    }

    private buildSelectedTime() {
        this.time = this.selectedHour;
        if (this.selectedMinute) {
            this.time += ':' + this.selectedMinute;
        }

        if (this.selectedSecond) {
            this.time += ':' + this.selectedSecond;
        }

        this.scrollTo(this.time);
    }
}