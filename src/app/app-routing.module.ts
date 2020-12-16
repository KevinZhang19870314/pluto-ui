import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './sample/home/home.component';
import { ButtonComponent } from './sample/button/button.component';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { InputComponent } from './sample/input/input.component';
import { TreeComponent } from './sample/tree/tree.component';
import { SelectComponent } from './sample/select/select.component';
import { PaginatorComponent } from './sample/paginator/paginator.component';
import { TabComponent } from './sample/tab/tab.component';
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
import { TooltipComponent } from './sample/tooltip/tooltip.component';
import { PanelComponent } from './sample/panel/panel.component';
import { JustForFunnyComponent } from './sample/justforfunny/justforfunny.component';
import { BadgeComponent } from './sample/badge/badge.component';
import { BoxComponent } from './sample/box/box.component';
import { KebabComponent } from './sample/kebab/kebab.component';
import { DraggablePicsComponent } from './sample/draggable-pics/draggable-pics.component';
import { ImgUploadComponent } from './sample/img-upload/img-upload.component';
import { CropperComponent } from './sample/cropper/cropper.component';
import { NewDatePickerComponent } from './sample/date-picker/date-picker.component';
import { DropdownComponent } from './sample/dropdown/dropdown.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'input', component: InputComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'textarea', component: TextareaComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'select', component: SelectComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'paginator', component: PaginatorComponent },
  { path: 'tab', component: TabComponent },
  { path: 'table', component: TableComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'datepicker', component: DatepickerComponent },
  { path: 'date-picker', component: NewDatePickerComponent },
  { path: 'radio-button', component: RadioButtonComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'title', component: TitleComponent },
  { path: 'switch', component: SwitchComponent },
  { path: 'progress-bar', component: ProgressBarComponent },
  { path: 'circle-bar', component: CircleBarComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'justforfunny', component: JustForFunnyComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'box', component: BoxComponent },
  { path: 'kebab', component: KebabComponent },
  { path: 'draggable-pics', component: DraggablePicsComponent },
  { path: 'img-upload', component: ImgUploadComponent },
  { path: 'cropper', component: CropperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
