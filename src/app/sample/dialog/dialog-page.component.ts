import { Component, OnInit } from '@angular/core';
import { TDialogComponent } from '../dialog/dialog.component';
import { DialogService } from 'projects/ngx-pluto/src';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {
  constructor(public dialog: DialogService) { }

  ngOnInit() {

  }

  onOpenDialog() {
    let dialogRef = this.dialog.open(TDialogComponent, { data: { message: 'Hello dialog' }, userClass: 'dialog-large' });
    dialogRef.afterClosed.subscribe(res => {
      console.log('Dialog closed', res);
    });
  }
}
