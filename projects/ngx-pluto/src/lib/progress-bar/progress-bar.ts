import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { daffProgressIndicatorAnimation } from './progress-bar.animation';

/**
 * @ignore
 */
@Component({
  selector: `np-progress-bar`,
  templateUrl: 'progress-bar.html',
  styleUrls: ['progress-bar.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    daffProgressIndicatorAnimation.fill
  ]
})

export class NpProgressBar implements OnInit {

  @Input() colors: Array<string> = [];
  @Input() height: number = 15;
  @Input() gradient: boolean = true;
  @Input() type: 'progress' | 'percent' = 'progress';
  @Input() leftText: string = '';
  @Input() rightText: string = '';

  @Input() percentage = 0;
  get fillState(): any {
    return {
      value: 100 - this.percentage,
      params: {
        percentage: 100 - this.percentage
      }
    };
  }

  background: string = `linear-gradient(to right, #22BABB, #CCFDD7)`;

  constructor() { }

  ngOnInit() {
    this.buildBackgroundColors();
  }

  buildBackgroundColors() {
    if (this.colors && this.colors.length > 0) {
      if (this.colors.length === 1) {
        this.background = this.colors[0];
        return;
      }

      let gradientColors = '';
      let gradientPercent = Math.round(this.percentage / this.colors.length);
      if (this.type === 'progress') {
        this.colors.forEach(color => {
          if (this.gradient) {
            gradientColors += color + ', ';
          } else {
            gradientColors += color + ' ' + gradientPercent + '%, ';
          }
        });
      } else {
        if (!this.leftText && this.leftText != '0') {
          this.leftText = this.percentage + '';
        }
        if (!this.rightText && this.rightText != '0') {
          this.rightText = (100 - this.percentage) + '';
        }

        let left = this.percentage;
        this.percentage = 100;
        gradientColors = this.colors[0] + ' ' + left + '%, ' + this.colors[1] + ' 0%, ';
      }

      gradientColors = gradientColors.substring(0, gradientColors.length - 2);    // Remove tail's comma and space
      this.background = `linear-gradient(to right, ` + gradientColors + `)`;
    }
  }
}


