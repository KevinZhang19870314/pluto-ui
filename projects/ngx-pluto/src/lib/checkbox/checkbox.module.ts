import { NgModule } from '@angular/core';
import { NpCheckbox } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpCheckbox],
  exports: [NpCheckbox]
})
export class NpCheckboxModule { }
