import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpPaginator } from './paginator.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NpPaginator],
  exports: [NpPaginator]
})
export class NpPaginatorModule { }
