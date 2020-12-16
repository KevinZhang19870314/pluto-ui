import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpDraggablePics } from './draggable-pics';
import { NpDragDropModule } from '../drag-drop/index';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        NpDragDropModule
    ],
    declarations: [NpDraggablePics],
    exports: [NpDraggablePics],
    entryComponents: []
})
export class NpDraggablePicsModule { }
