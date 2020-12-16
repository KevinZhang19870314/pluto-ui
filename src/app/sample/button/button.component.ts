import { Component, OnInit } from '@angular/core';
import { TDialogComponent } from '../dialog/dialog.component';
import { LoadingService, DialogService } from 'projects/ngx-pluto/src';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  public testForm: FormGroup;
  file
  constructor(public dialog: DialogService,
    private loadingService: LoadingService,
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.loadingService);
    this.testForm = this.fb.group({
      uploadFile: [{}],
      uploadFiletwo: [{}]
    });
  }

  onOpenDialog() {
    let dialogRef = this.dialog.open(TDialogComponent, { data: { message: 'Hello dialog' }, userClass: 'dialog-large' });
    dialogRef.afterClosed.subscribe(res => {
      console.log('Dialog closed', res);
    });
  }
  beginLoading() {
    this.loadingService.begin();
    setTimeout(() => {
      this.endLoading();
    }, 3000);
  }
  endLoading() {
    this.loadingService.end();
  }
  show(event) {
    alert(event)
  }

  dateVal = { start: '2019-06-06 19:53:08', end: '2019-07-12 19:53:08' };
  onGetDate() {
    console.log('dateVal = ' + JSON.stringify(this.dateVal));
  }
}
