import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { isNumber } from 'util';
const $ = require('jquery');

/**
 * 环形占比图
 * 
 * <example-url>https://stackblitz.com/edit/np-circle-bar-sample?embed=1&file=src/app/app.component.ts</example-url>
 */
@Component({
  selector: `np-circle-bar`,
  templateUrl: 'circle-bar.html',
  styleUrls: ['circle-bar.scss']
})
export class NpCircleBar implements OnInit {

  @ViewChild('circleBarCanvas') canvasRef: ElementRef;

  /**百分比值0 ~ 1， 例如0.25，则占比1/4。 */
  @Input() value: number = 0.0;
  /**环的直径 */
  @Input() size: number = 100.0;
  /**环形占比开始的角度，例如0代表3点钟方向开始占比，π代表9点钟方向，2π转了一圈又到了3点钟方向开始，以此类推。 */
  @Input() startAngle: number = 0;
  /**环的厚度 */
  @Input() thickness: string = 'auto';
  /**环形占比渐变色gradient，例如：{ gradient: ['#3aeabb', '#fdd250'] } */
  @Input() fill: any = { gradient: ['#3aeabb', '#fdd250'] };
  /**环形未占比填充颜色，例如：rgba(0, 0, 0, 0.1) */
  @Input() emptyFill: string = 'rgba(0, 0, 0, 0.1)';
  /**加载动画效果，例如：{ duration: 1200, easing: 'circleProgressEasing' }*/
  @Input() animation: object | boolean = { duration: 1200, easing: 'circleProgressEasing' };
  /**加载动画初始值 */
  @Input() animationStartValue: number = 0.0;
  /**加载动画是否逆时针 */
  @Input() reverse: boolean = false;
  /**环形图截面形状，butt | round | square，默认round即圆环截面 */
  @Input() lineCap: 'butt' | 'round' | 'square' = 'round';
  @Input() insertMode: 'append' | 'prepend' = 'prepend';

  @Output() circleInited = new EventEmitter();
  @Output() circleAnimationStart = new EventEmitter();
  @Output() circleAnimationProgress = new EventEmitter<any>();
  @Output() circleAnimationEnd = new EventEmitter<any>();

  el = null;
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  radius = 0.0;
  arcFill = null;
  lastFrameValue = 0.0;

  constructor() { }

  ngOnInit() {
    (<any>$).easing.circleProgressEasing = (x) => {
      if (x < 0.5) {
        x = 2 * x;
        return 0.5 * x * x * x;
      } else {
        x = 2 - 2 * x;
        return 1 - 0.5 * x * x * x;
      }
    };

    this.init();
  }

  public init() {
    this.radius = this.size / 2;
    this.initWidget();
    this.initFill();
    this.draw();

    this.circleInited.next();
  }

  private initWidget() {
    if (this.canvas === null) {
      this.canvas = this.canvasRef.nativeElement;
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.ctx = this.canvas.getContext('2d');

      if (window.devicePixelRatio > 1) {
        let scaleBy = window.devicePixelRatio;
        this.canvas.style.width = this.canvas.style.height = this.size + 'px';
        this.canvas.width = this.canvas.height = this.size * scaleBy;
        this.ctx.scale(scaleBy, scaleBy);
      }
    }
  }

  private initFill() {
    if (!this.fill) {
      throw Error('The fill is not specified!');
    }

    if (typeof this.fill === 'string') {
      this.fill = { color: this.fill };
    }

    if (this.fill.color) {
      this.arcFill = this.fill.color;
    }

    if (this.fill.gradient) {
      let gr = this.fill.gradient;

      if (gr.length === 1) {
        this.arcFill = gr[0];
      } else {
        let ga = this.fill.gradientAngle || 0;  // gradient direction angle; 0 by default
        let gd = this.fill.gradientDirection || [
          this.size / 2 * (1 - Math.cos(ga)), // x0
          this.size / 2 * (1 + Math.sin(ga)), // y0
          this.size / 2 * (1 + Math.cos(ga)), // x1
          this.size / 2 * (1 - Math.sin(ga))  // y1
        ];

        let lg = this.ctx.createLinearGradient.apply(this.ctx, gd);
        for (var i = 0; i < gr.length; i++) {
          var color = gr[i],
            pos = i / (gr.length - 1);

          if (Array.isArray(color)) {
            pos = color[1];
            color = color[0];
          }

          lg.addColorStop(pos, color);
        }

        this.arcFill = lg;
      }
    }

    if (this.fill.image) {
      let img = null;

      if (this.fill.image instanceof Image) {
        img = this.fill.image;
      } else {
        img = new Image();
        img.src = this.fill.image;
      }

      let setImageFill = () => {
        var bg = this.canvas;
        bg.width = this.size;
        bg.height = this.size;
        bg.getContext('2d').drawImage(img, 0, 0, this.size, this.size);
        this.arcFill = this.ctx.createPattern(bg, 'no-repeat');
        this.drawFrame(this.lastFrameValue);
      }

      if (img.complete) {
        setImageFill();
      }
      else {
        img.onload = setImageFill;
      }
    }
  }

  private draw() {
    if (this.animation) {
      this.drawAnimated(this.value);
    } else {
      this.drawFrame(this.value);
    }
  }

  private drawFrame(v: number) {
    this.lastFrameValue = v;
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.drawEmptyArc(v);
    this.drawArc(v);
  }

  private drawArc(v: number) {
    if (v === 0) {
      return;
    }

    var ctx = this.ctx,
      r = this.radius,
      t = this.getThickness(),
      a = this.startAngle;

    ctx.save();
    ctx.beginPath();

    if (!this.reverse) {
      ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
    } else {
      ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a);
    }

    ctx.lineWidth = t;
    ctx.lineCap = this.lineCap;
    ctx.strokeStyle = this.arcFill;
    ctx.stroke();
    ctx.restore();
  }

  private drawEmptyArc(v: number) {
    var ctx = this.ctx,
      r = this.radius,
      t = this.getThickness(),
      a = this.startAngle;

    if (v < 1) {
      ctx.save();
      ctx.beginPath();

      if (v <= 0) {
        ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
      } else {
        if (!this.reverse) {
          ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
        } else {
          ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v);
        }
      }

      ctx.lineWidth = t;
      ctx.strokeStyle = this.emptyFill;
      ctx.stroke();
      ctx.restore();
    }
  }

  private drawAnimated(v: number) {
    var self = this,
      el = this.el,
      canvas = $(this.canvas);

    // stop previous animation before new "start" event is triggered
    canvas.stop(true, false);
    this.circleAnimationStart.next();

    canvas
      .css({ animationProgress: 0 })
      .animate({ animationProgress: 1 }, $.extend({}, this.animation, {
        step: (animationProgress) => {
          var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
          self.drawFrame(stepValue);
          self.circleAnimationProgress.next({ animationProgress: animationProgress, stepValue: stepValue });
        }
      }))
      .promise()
      .always(() => {
        // trigger on both successful & failure animation end
        this.circleAnimationEnd.next();
      });
  }

  private getThickness() {
    return isNumber(this.thickness) ? this.thickness : this.size / 14;
  }

  private getValue() {
    return this.value;
  }

  setValue(newValue: number) {
    if (this.animation) {
      this.animationStartValue = this.lastFrameValue;
    }

    this.value = newValue;
    this.draw();
  }
}


