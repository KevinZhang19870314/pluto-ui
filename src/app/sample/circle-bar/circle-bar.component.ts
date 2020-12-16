import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PercentCircleBarData, NpPercentCircleBarComponent, NpSolidLoading } from 'projects/ngx-pluto/src';

@Component({
  selector: 'app-circle-bar',
  templateUrl: './circle-bar.component.html',
  styleUrls: ['./circle-bar.component.scss']
})
export class CircleBarComponent implements OnInit {

  fill = { gradient: ['#37C4CA'] };
  startAngle = 0;
  value = 0.25;

  fill1 = { gradient: [['#0681c4', .5], ['#4ac5f8', .5]], gradientAngle: Math.PI / 4 };
  startAngle1 = 3 / 5 * Math.PI;

  fill2 = { gradient: ['#ff1e41', '#4ac5f8'] };
  startAngle2 = 2 * Math.PI;

  fill3 = { gradient: ['#4ac5f8'] };
  startAngle3 = 0;

  data: PercentCircleBarData[] = [{
    color: '#37C4CA',
    percentage: 0.3
  }, {
    color: '#5189DA',
    percentage: 0.3
  }, {
    color: '#FB8933',
    percentage: 0.15
  }]

  showAfter3s = false;

  loadingColors = ['red', 'yellow', 'blue'];
  solidLoadingColors = ['#37C4CA', '#5189DA', '#FB8933'];

  @ViewChild('percentCircleBar') npPercentCircleBar: NpPercentCircleBarComponent;

  @ViewChild('npLoading') private npLoading: NpSolidLoading;

  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.showAfter3s = true;
    }, 3000);

    setTimeout(() => {
      this.npLoading.endAnimate();
    }, 5000);
  }

  onCheckClicked() {
    this.showAfter3s = false;
    setTimeout(() => {
      this.showAfter3s = true;
      this.data = [{
        color: '#37C4CA',
        percentage: 0.5
      }, {
        color: '#5189DA',
        percentage: 0.1
      }, {
        color: '#FB8933',
        percentage: 0.15
      }];
    }, 1000);
  }

  onRefresh() {
    if (this.npPercentCircleBar) {
      this.data = [{
        color: '#37C4CA',
        percentage: 0.1
      }, {
        color: '#5189DA',
        percentage: 0.1
      }, {
        color: '#FB8933',
        percentage: 0.15
      }];
    }
  }

  animatedDidEnd() {
    console.log('solid loading end');
  }
}
