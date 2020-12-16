import { NgModule } from '@angular/core';
import { NpSwitch } from './switch';
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
  declarations: [NpSwitch],
  exports: [NpSwitch]
})
export class NpSwitchModule { }
