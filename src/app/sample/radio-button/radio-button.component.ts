import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  public testForm: FormGroup;

  favoriteSeason = 'Winter';
  favoriteSeason2 = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  seasonstwo: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
     radioButton: [this.favoriteSeason2]
    });
  }
}
