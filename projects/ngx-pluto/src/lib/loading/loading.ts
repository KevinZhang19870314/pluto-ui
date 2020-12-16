import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from "@angular/forms";

/**
 * @ignore
 */
@Component({
  selector: `np-loading`,
  templateUrl: 'loading.html',
  styleUrls: ['loading.scss']
})

export class NpLoading implements OnInit {

  @Input() r: number = 98;
  @Input() thickness: number = 10;
  @Input() colors: Array<string> = ['#37C4CA', '#5189DA', '#FB8933'];
  @Input() speed: number = 1;

  constructor() { }

  ngOnInit() {

  }
}


