import { Component, ViewEncapsulation, OnInit, OnChanges, Input, SimpleChanges, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

/**
 * @ignore
 */
@Component({
  selector: `np-tooltip`,
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'np-tooltip-wrapper'
  },
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class NpTooltip implements OnInit, OnChanges {

  @Input() text = '';
  @Input() template: TemplateRef<any>;
  @Input() bgColor = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}