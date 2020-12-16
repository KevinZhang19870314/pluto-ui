import { NgModule } from '@angular/core';
import { NpRadioButton } from './radio-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpRadioGroup } from './radio-group.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpRadioButton, NpRadioGroup],
  exports: [NpRadioButton, NpRadioGroup]
})
export class NpRadioButtonModule { }
