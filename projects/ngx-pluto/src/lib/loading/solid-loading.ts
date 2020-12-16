import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, HostListener, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from "@angular/forms";

/**
 * @ignore
 */
@Component({
  selector: `np-solid-loading`,
  templateUrl: 'solid-loading.html',
  styleUrls: ['solid-loading.scss']
})

export class NpSolidLoading implements OnInit {
  @Input() public label = 'loading...';
  @Input() public size = 156;
  @Input() public thickness = 16;
  @Input() public colors = ['#37C4CA', '#5189DA', '#FB8933'];

  @Output() public animatedDidEnd = new EventEmitter();

  private speed = 0.0;
  private currentAngle = 0;
  private speedUp = true;

  @ViewChild('canvasElement') canvasElement: ElementRef;

  constructor() {

  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.draw();
  }

  startAnimate() {
    this.speedUp = true;
    this.speed = 0.1;
    this.currentAngle = 0.0;
  }

  endAnimate() {
    this.speedUp = false;
  }

  _animatedDidEnd() {
    this.animatedDidEnd.emit();
  }

  draw() {

    const ctx = this.canvasElement.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.size, this.size);

    ctx.lineWidth = this.thickness;
    ctx.lineCap = 'round';

    let arcs = [];
    let angle = this.currentAngle;
    let emptySep = 0.1 * Math.PI;
    let sep = (2 * Math.PI - this.colors.length * emptySep) / this.colors.length;

    this.colors.forEach((item, idx) => {
      arcs.push({
        color: item,
        start: angle,
        to: angle + sep,
      });
      angle = angle + sep + emptySep;
    });

    arcs.forEach(item => {
      ctx.beginPath();
      ctx.strokeStyle = item.color;
      ctx.arc(this.size / 2.0, this.size / 2.0, this.size / 2.0 - this.thickness / 2.0, item.start, item.to);
      ctx.stroke();
    });

    if (this.speedUp) {
      if (this.speed < 0.2) {
        this.speed += 0.005;
        if (this.speed > 0.2) {
          this.speed = 0.2;
        }
      }
    } else {
      this.speed -= 0.005;
      if (this.speed <= 0) {
        this.speed = 0;
        this.currentAngle = 0;
        this._animatedDidEnd();
        return;
      }
    }
    this.currentAngle += this.speed;

    window.requestAnimationFrame(() => this.draw());
  }
}


