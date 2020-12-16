import { NgModule } from '@angular/core';
import { NpTitle } from './title';
import { CommonModule } from '@angular/common';
import { TitleTemplateDirective } from './title-template.directive';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NpTitle, TitleTemplateDirective],
    exports: [NpTitle, TitleTemplateDirective]
})
export class NpTitleModule { }
