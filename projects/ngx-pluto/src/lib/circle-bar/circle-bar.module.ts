import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpCircleBar } from './circle-bar';
import { NpPercentCircleBarComponent } from './percent-circle-bar';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpCircleBar, NpPercentCircleBarComponent],
  exports: [NpCircleBar, NpPercentCircleBarComponent]
})
export class NpCircleBarModule { }
