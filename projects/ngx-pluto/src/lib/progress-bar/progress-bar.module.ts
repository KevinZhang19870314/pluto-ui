import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpProgressBar } from './progress-bar';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpProgressBar],
  exports: [NpProgressBar]
})
export class NpProgressBarModule { }
