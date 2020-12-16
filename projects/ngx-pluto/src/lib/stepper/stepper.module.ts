import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpStep } from './step';
import { NpStepperComponent } from './stepper';
import { NpStepHeaderDirective } from './step-header.directive';
import { NpStepFinishDirective } from './step-finish.directive';
import { NpStepProcessDirective } from './step-process.directive';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpStepperComponent,
    NpStep,
    NpStepHeaderDirective,
    NpStepFinishDirective,
    NpStepProcessDirective],
  exports: [NpStepperComponent,
    NpStep,
    NpStepHeaderDirective,
    NpStepProcessDirective,
    NpStepFinishDirective]
})
export class NpStepperModule { }
