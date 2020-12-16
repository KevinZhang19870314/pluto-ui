import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { NpCircleBar } from './circle-bar';

/**
 * @ignore
 */
@Component({
  selector: `np-percent-circle-bar`,
  templateUrl: 'percent-circle-bar.html',
  styleUrls: ['percent-circle-bar.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class NpPercentCircleBarComponent implements OnInit {

  @ViewChildren(NpCircleBar) private circleBars: QueryList<NpCircleBar>;

  @Input() startAngle: number = 0.0;
  @Input() thickness: number = 15;
  @Input() size: number = 156;
  @Input() data: PercentCircleBarData[];
  @Input() animationTime: number = 500;

  animation = { duration: this.animationTime, easing: 'circleProgressEasing' };
  bindingData: any[] = [];

  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildBindingData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.animationTime && changes.animationTime.currentValue) {
        this.animation.duration = this.animationTime;
      }

      if (changes.data && changes.data.currentValue) {
        this.data = changes.data.currentValue;
        this.buildBindingData();
        this.refresh();
      }
    }
  }

  refresh() {
    if (this.circleBars && this.circleBars.length > 0) {
      this.circleBars.forEach(circleBar => {
        circleBar.init();
      });
    }
  }

  private buildBindingData() {
    if (this.data && this.data.length > 0) {
      let len = this.data.length;
      let currentPercentage = 0;
      this.bindingData = [];
      for (let i = 0; i < len; i++) {
        const item = this.data[i];
        let bindingItem = {
          startAngle: 2 * Math.PI * currentPercentage,
          fill: { gradient: [item.color] },
          value: item.percentage
        };
        currentPercentage += item.percentage;
        this.bindingData.push(bindingItem);
      }
    }
  }
}

/**
 * @ignore
 */
export interface PercentCircleBarData {
  color: string;
  percentage: number;
}


