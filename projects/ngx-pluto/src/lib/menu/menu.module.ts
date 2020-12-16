import { NgModule, ModuleWithProviders } from '@angular/core';
import { NpMenu } from './menu.component';
import { MenuService } from './menu.service';
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
  declarations: [NpMenu],
  exports: [NpMenu],
  providers: [MenuService]
})
export class NpMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NpMenuModule,
      providers: [MenuService]
    };
  }
}
