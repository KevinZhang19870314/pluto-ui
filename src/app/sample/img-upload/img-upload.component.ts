import { Component, OnInit } from '@angular/core';
import { TDialogComponent } from '../dialog/dialog.component';
import { LoadingService, DialogService } from 'projects/ngx-pluto/src';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit {

  imgObj: { file?: File, src?: string } = { file: null, src: '//image.ipay.so/upload/voucher/assets/images/activity/trick-face-big.png' };

  testForm: FormGroup;

  get f() { return this.testForm.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      imgObj: [{}, [Validators.required]]
    });
  }

  onImgFileChanged($event: { file: File, src: any }) {
    let x = $event;
  }

  clickImg(e){
    console.log("缩略图点击事件",e)
  }
}
