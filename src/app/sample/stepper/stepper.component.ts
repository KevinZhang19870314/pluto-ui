import { Component, OnInit, ViewChild } from '@angular/core';
import { NpStepperComponent } from 'projects/ngx-pluto/src';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @ViewChild('npStepper') npStepper: NpStepperComponent;
  @ViewChild('npStepperTwo') npStepperTwo: NpStepperComponent;

  currentStepIndex = 0;

  constructor() { }

  ngOnInit() {

  }

  onStep1NextClicked() {
    this.npStepper.next();
    this.npStepperTwo.next();
  }

  onStep2NextClicked() {
    this.npStepper.next();
    this.npStepperTwo.next();
  }

  onStep2PreviousClicked() {
    this.npStepper.previous();
    this.npStepperTwo.previous();

  }

  onStep3NextClicked() {
    this.npStepper.next();
    this.npStepperTwo.next();
  }

  onStep3PreviousClicked() {
    this.npStepper.previous();
    this.npStepperTwo.previous();
  }

  onStep4NextClicked() {
    this.npStepper.next();
    this.npStepperTwo.next();
  }

  onStep4ResetClicked() {
    this.npStepper.reset();
    this.npStepperTwo.reset();
  }
}
