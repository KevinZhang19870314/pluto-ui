import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  ischecked = false;
  ischecked2 = 'yes';
  testForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      check: [true],
    });
  }

}
