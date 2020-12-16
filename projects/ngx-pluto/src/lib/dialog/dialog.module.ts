import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDialog } from './dialog.component';
import { InsertionDirective } from './insertion.directive';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NpDialog,
    InsertionDirective
  ],
  declarations: [NpDialog, InsertionDirective],
  entryComponents: [
    NpDialog
  ]
})
export class NpDialogModule { }
