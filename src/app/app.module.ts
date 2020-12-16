import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/****************** Import from npm package ******************/
// import { NpButtonModule } from 'ngx-pluto';

/****************** Import from local ******************/
import {
  NpButtonModule,
  NpCheckboxModule,
  NpMenuModule,
  NpInputModule,
  NpSidebarModule,
  NpTreeModule,
  NpPaginatorModule,
  NpSharedModule,
  NpTabModule,
  NpTextareaModule,
  NpRadioButtonModule,
  NpStepperModule,
  NpTitleModule,
  NpSwitchModule,
  NpProgressBarModule,
  NpCircleBarModule,
  NpLoadingModule,
  NpPanelModule,
  NpBadgeModule,
  NpBoxModule,
  NpDraggablePicsModule,
  NpImgUploadModule,
  NpDropdownModule
} from '../../projects/ngx-pluto/src';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ButtonComponent } from './sample/button/button.component';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { HomeComponent } from './sample/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ThirdComponent } from './sample/third/third.component';
import { InputComponent } from './sample/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeComponent } from './sample/tree/tree.component';
import { SelectComponent } from './sample/select/select.component';
import { NpDialogModule } from 'projects/ngx-pluto/src/lib/dialog/dialog.module';
import { TDialogComponent } from './sample/dialog/dialog.component';
import { TAnotherDialogComponent } from './sample/dialog/another-dialog.component';
import { PaginatorComponent } from './sample/paginator/paginator.component';
import { TabComponent } from './sample/tab/tab.component';
import { NpTableModule } from 'projects/ngx-pluto/src/lib/table';
import { TableComponent } from './sample/table/table.component';
import { TextareaComponent } from './sample/textarea/textarea.component';
import { DialogPageComponent } from './sample/dialog/dialog-page.component';
import { DatepickerComponent } from './sample/datepicker/datepicker.component';
import { RadioButtonComponent } from './sample/radio-button/radio-button.component';
import { StepperComponent } from './sample/stepper/stepper.component';
import { TitleComponent } from './sample/title/title.component';
import { SwitchComponent } from './sample/switch/switch.component';
import { ProgressBarComponent } from './sample/progress-bar/progress-bar.component';
import { CircleBarComponent } from './sample/circle-bar/circle-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NpTooltipModule } from 'projects/ngx-pluto/src/lib/tooltip';
import { TooltipComponent } from './sample/tooltip/tooltip.component';
import { PanelComponent } from './sample/panel/panel.component';
import { JustForFunnyComponent } from './sample/justforfunny/justforfunny.component';
import { BadgeComponent } from './sample/badge/badge.component';
import { BoxComponent } from './sample/box/box.component';
import { KebabComponent } from './sample/kebab/kebab.component';
import { NpKebabModule } from 'projects/ngx-pluto/src/lib/kebab';
import { DraggablePicsComponent } from './sample/draggable-pics/draggable-pics.component';
import { ImgUploadComponent } from './sample/img-upload/img-upload.component';
import { NpCropperModule } from 'projects/ngx-pluto/src/lib/cropper';
import { CropperComponent } from './sample/cropper/cropper.component';
import { NpDateViaPickerModule, registerNpDatePickerLocale } from 'projects/ngx-pluto/src/lib/date-picker';
import { NewDatePickerComponent } from './sample/date-picker/date-picker.component';
import { DropdownComponent } from './sample/dropdown/dropdown.component';

registerNpDatePickerLocale('zh-cn');

const NGX_PLUTO_MODULE = [
  NpButtonModule,
  NpCheckboxModule,
  NpMenuModule,
  NpInputModule,
  NpSidebarModule.forRoot(),
  NpTreeModule,
  NpSharedModule,
  NpTabModule,
  NpTextareaModule,
  NpDialogModule,
  NpPaginatorModule,
  NpDialogModule,
  NpTableModule,
  NpRadioButtonModule,
  NpStepperModule,
  NpTitleModule,
  NpSwitchModule,
  NpProgressBarModule,
  NpCircleBarModule,
  NpLoadingModule,
  NpTooltipModule,
  NpPanelModule,
  NpBadgeModule,
  NpBoxModule,
  NpKebabModule,
  NpDraggablePicsModule,
  NpImgUploadModule,
  NpCropperModule,
  NpDateViaPickerModule,
  NpDropdownModule
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CheckboxComponent,
    HomeComponent,
    ThirdComponent,
    InputComponent,
    TreeComponent,
    SelectComponent,
    TDialogComponent,
    TAnotherDialogComponent,
    PaginatorComponent,
    TabComponent,
    TableComponent,
    TextareaComponent,
    DialogPageComponent,
    DatepickerComponent,
    RadioButtonComponent,
    StepperComponent,
    TitleComponent,
    SwitchComponent,
    ProgressBarComponent,
    CircleBarComponent,
    TooltipComponent,
    PanelComponent,
    JustForFunnyComponent,
    BadgeComponent,
    BoxComponent,
    KebabComponent,
    DraggablePicsComponent,
    ImgUploadComponent,
    CropperComponent,
    NewDatePickerComponent,
    DropdownComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ...NGX_PLUTO_MODULE,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TDialogComponent,
    TAnotherDialogComponent
  ]
})
export class AppModule { }
