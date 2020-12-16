import { Component, OnInit } from '@angular/core';
import { DialogConfig } from 'projects/ngx-pluto/src/lib/dialog/dialog-config';
import { DialogRef } from 'projects/ngx-pluto/src/lib/dialog/dialog-ref';

@Component({
  selector: 'app-another-dialog',
  templateUrl: './another-dialog.html',
  styleUrls: ['./another-dialog.scss']
})
export class TAnotherDialogComponent implements OnInit {
  constructor(private dialogRef: DialogRef, public config: DialogConfig,) {

  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close('close dialog');
  }
}
