import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpSidebarContainer } from './sidebar-container.component';
import { NpSidebar } from './sidebar.component';
import { NpCloseSidebar } from './close.directive';

/**
 * @ignore
 */
@NgModule({
  declarations: [NpSidebarContainer, NpSidebar, NpCloseSidebar],
  imports: [CommonModule],
  exports: [NpSidebarContainer, NpSidebar, NpCloseSidebar]
})
export class NpSidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NpSidebarModule
    };
  }
}
