import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, HostListener, ContentChildren, QueryList, AfterContentInit, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from "@angular/forms";
import { NpStep } from "./step";

/**
 * @ignore
 */
@Component({
  selector: `np-stepper`,
  templateUrl: 'stepper.html',
  styleUrls: ['stepper.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpStepperComponent implements OnInit, AfterContentInit {

  @ContentChildren(NpStep) steps: QueryList<NpStep>;

  private _selectedIndex = 0;
  @Input() get selectedIndex() { return this._selectedIndex; }

  set selectedIndex(index: number) {
    let idx = +index;
    if (idx < 0) {
      this._selectedIndex = 0;
      this.setStatus(idx);
      return;
    }

    if (this.steps && this.steps.length > 0 && idx > this.steps.length - 1) {
      this._selectedIndex = this.steps.length - 1;
      this.setStatus(idx);
      return;
    }

    this._selectedIndex = idx;
    this.setStatus(idx);
  }

  constructor(private elemRef: ElementRef) { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.selectedIndex = this._selectedIndex;
  }

  ngAfterViewInit(): void {
    this.adjustStepHeaderTitlePosition();
  }

  // Adjust first and last step header title position
  private adjustStepHeaderTitlePosition() {
    let progressContainer = this.elemRef.nativeElement.querySelector('.progress-container') as HTMLElement;
    let headerIcon = this.elemRef.nativeElement.querySelector('.progress-circle-template') as HTMLElement;
    let headerCircle = this.elemRef.nativeElement.querySelector('.progress-circle') as HTMLElement;
    let headerTitleFirst = this.elemRef.nativeElement.querySelector('.step-title-first') as HTMLElement;
    let headerTitleLast = this.elemRef.nativeElement.querySelector('.step-title-last') as HTMLElement;

    if (progressContainer && (headerIcon || headerCircle) && headerTitleFirst && headerTitleLast) {
      let progressContainerWidth = progressContainer.offsetWidth;
      let headerWidth = headerIcon ? headerIcon.offsetWidth : headerCircle.offsetWidth;
      headerTitleFirst.style.marginLeft = '-' + Math.abs(progressContainerWidth - headerWidth) + 'px';
      headerTitleLast.style.marginRight = '-' + Math.abs(progressContainerWidth - headerWidth) + 'px';
    }
  }

  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }

  previous(): void {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  reset() {
    this.selectedIndex = 0;
  }

  setStatus(idx) {
    if (this.steps) {
      this.steps.toArray().forEach((v, i) => {
        if (i < idx) {
          v.status = 'finish';
        }
        if (i === idx) {
          v.status = 'process';
        }
        if (i > idx) {
          v.status = 'wait';
        }
      })
    }
  }
}


