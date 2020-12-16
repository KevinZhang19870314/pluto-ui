import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpPaginator } from './paginator.component';
import { NpDropdownModule } from '../dropdown/index';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NpDropdownModule
  ],
  declarations: [NpPaginator],
  exports: [NpPaginator]
})
export class NpPaginatorModule { }
