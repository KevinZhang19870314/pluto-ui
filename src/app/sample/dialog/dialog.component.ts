import { Component, OnInit } from '@angular/core';
import { DialogConfig } from 'projects/ngx-pluto/src/lib/dialog/dialog-config';
import { DialogRef } from 'projects/ngx-pluto/src/lib/dialog/dialog-ref';
import { DialogService } from 'projects/ngx-pluto/src/lib/dialog/dialog.service';
import { TAnotherDialogComponent } from './another-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss']
})
export class TDialogComponent implements OnInit {
  constructor(public config: DialogConfig, private dialogRef: DialogRef, private dialog: DialogService) {

  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close('close dialog');
  }

  onOpenAnother() {
    this.dialogRef.close('555');
    let dialogRef = this.dialog.open(TAnotherDialogComponent, {
      data: { message: 'Hello another dialog' }
    });
    dialogRef.afterClosed.subscribe(res => {
      console.log('Another dialog closed', res);
    });
  }
}
