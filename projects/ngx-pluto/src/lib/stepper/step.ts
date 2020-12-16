import { Component, ViewEncapsulation, OnInit, ViewChild, TemplateRef, Input, ContentChild, forwardRef } from "@angular/core";
import { NpStepHeaderDirective } from "./step-header.directive";
import { NpStepProcessDirective } from "./step-process.directive";
import { NpStepFinishDirective } from "./step-finish.directive";

/**
 * @ignore
 */
@Component({
  selector: `np-step`,
  templateUrl: 'step.html',
  styleUrls: ['step.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpStep implements OnInit {

  @ContentChild(NpStepHeaderDirective) headerContent: NpStepHeaderDirective;
  @ContentChild(NpStepProcessDirective) processContent: NpStepProcessDirective;
  @ContentChild(NpStepFinishDirective) finishContent: NpStepFinishDirective;

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  @Input() title: string = '';
  status: 'finish' | 'process' | 'wait' = 'wait';

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    let x = this.headerContent;
  }
}


